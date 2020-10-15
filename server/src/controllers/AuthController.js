import bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel.js';
import { loginValidation, registerValidation } from '../validators/validation.js';
import jwt from 'jsonwebtoken';
import RefreshTokenModel from '../models/RefreshTokenModel.js';
import Mail from '../utils/Mailer.js';
import User from '../database/User.js';

class AuthController {
    static async login(req, res) {
        //Validate Data
        let { error } = loginValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        //Try to get user by email
        let user = await UserModel.findByEmail(req.body.email);
        if(!user) return res.status(400).send("Wrong email or password.");
        
        //Check if the account is verified
        if(user.verified === false) return res.status(400).send("Account is not verified.");

        //Check if password is correct
        let validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).send("Wrong email or password.");
        //Custom user info object
        let tokenUser = {
            id: user._id,
            name: user.name,
            email: user.email
        };
        //Create and assign JWT and refresh token
        let token = this.generateJWT(tokenUser);
        let refreshToken = jwt.sign(tokenUser, process.env.REFRESH_TOKEN_SECRET);
        await RefreshTokenModel.create(refreshToken);
        res.header('auth-token', token).send({access_token: token, refresh_token: refreshToken});
    }

    static async register(req, res) {
        //Validate Data
        let { error } = registerValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        //Hash the password
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(req.body.password, salt);

        //Save user to DB
        try{
            let data = {
                name: req.body.username,
                email: req.body.email,
                password: hashedPassword
            }
            let savedUser = await UserModel.create(data);
            
            Mail(savedUser.email, savedUser._id, savedUser.verifyToken, "localhost:8080");

            res.send({userID: savedUser._id });
        }catch(err){
            res.status(422).send(err);
        }
    }

    static async verifyAccount(req, res){
        let userID = req.body.userID;
        if(userID === "" || userID === null) return res.status(400).send('Invalid UserID');
        let user = await UserModel.findByID(userID);
        if(!user) return res.status(400).send('Invalid UserID');
        let verifyToken = req.body.verifyToken;
        if(verifyToken === null) return res.status(400).send('Invalid Verification Token');
        if(verifyToken === user.verifyToken) {
            user.verified = true;
            //user.verifyToken = '';
            try{
                await user.save();
            }catch(err){
                res.status(400).send(err);
            }
            res.status(200).send('Verification Complete.');
        } else return res.status(400).send('Invalid Verification Token');
    }

    static async regenToken(req, res) {
        let refreshToken = req.body.token;
        if(refreshToken === null) return res.status(400).send('Invalid Token');
        if(!RefreshTokenModel.exists(refreshToken)) return res.status(400).send('Invalid Token');
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if(err) return res.sendStatus(403);
            return res.send({access_token: this.generateJWT(user)});
        });
    }

    static async logout(req, res){
        let refreshToken = req.body.token;
        if(refreshToken === null) return res.status(400).send('Invalid Token');
        if(!RefreshTokenModel.exists(refreshToken)) return res.status(400).send('Invalid Token');
        await RefreshTokenModel.delete(refreshToken);
        res.sendStatus(200);
    }

    static generateJWT(user){
        return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '15s'});
    }
}

export default AuthController;