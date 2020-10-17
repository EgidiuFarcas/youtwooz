import UserModel from '../models/UserModel.js';

export default async function (req, res, next){
    if(!req.userID) return res.status(401).send('Access Denied');
    let user = await UserModel.findByID(req.userID);
    if(!user) return res.status(400).send("User not found");
    if(user.role !== process.env.ADMIN_ROLE_ID) return res.status(401).send('Access Denied');
    req.user = user;
    next();
}