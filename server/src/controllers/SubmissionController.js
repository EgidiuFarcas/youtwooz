import Entities from 'html-entities';
import fs from "fs";
import SubmissionModel from '../models/SubmissionModel.js';
import { stepOneValidation, stepTwoValidation, stepThreeValidation, setImageValidation } from '../validators/submissionValidation.js';

const entities = new Entities.AllHtmlEntities();

class SubmissionController {

    static async stepOne(req, res){
        req.body.submitterID = req.userID;
        let {error} = stepOneValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let name = entities.encodeNonUTF(req.body.name);

        let sub = await SubmissionModel.create(name,
            req.body.hasBox, req.body.type, req.body.submitterID);
        if(!sub) return res.status(400).send("Something went wrong.");
        if(sub.type === -1){
            await SubmissionModel.delete(sub._id);
            return res.status(400).send("Wrong Submission Type.");
        }
        return res.send(sub._id);
    }

    static async stepTwo(req, res) {
        let {error} = stepTwoValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        
        let description = entities.encodeNonUTF(req.body.description);

        let sub = await SubmissionModel.setDescription(req.body.submissionID, description);
        if(!sub) return res.status(400).send("Something went wrong");
        return res.send(sub._id);
    }

    static async stepThree(req, res){
        let {error} = stepThreeValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        if(req.body.artist2D) req.body.artist2D = entities.encodeNonUTF(req.body.artist2D);
        if(req.body.artist3D) req.body.artist3D = entities.encodeNonUTF(req.body.artist3D);
        if(req.body.height) req.body.height = entities.encodeNonUTF(req.body.height);

        let sub = await SubmissionModel.setInfo(req.body.submissionID, {
            categoryID: req.body.categoryID,
            priceID: req.body.priceID,
            height: req.body.height,
            artist2D: req.body.artist2D,
            artist3D: req.body.artist3D
        });
        if(!sub) return res.status(400).send("Something went wrong");
        return res.send(sub);
    }

    static async setImage(req, res) {
        let {error} = setImageValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let tempPath = req.file.path;
        let originalName = String(req.file.originalname);
        let extension = originalName.split('.');
        extension = extension[extension.length -1];
        let fullPath = "/" + tempPath + '.' + extension;
        try{
            fs.rename(tempPath, '.' + fullPath, (err) => console.log(err));
        }catch(err) {
            res.status(400).send(err);
            return;
        }

        let sub = await SubmissionModel.get(req.body.submissionID);
        switch(req.body.imageType){
            case "2D":
                if(sub.image2D !== null && sub.image2D !== undefined){
                    fs.unlinkSync('.' + sub.image2D);
                }
                sub.image2D = fullPath;
                break;
            case "3D":
                if(sub.image3D !== null && sub.image3D !== undefined){
                    fs.unlinkSync('.' + sub.image3D);
                }
                sub.image3D = fullPath;
                break;
            case "Box":
                if(sub.imageBox !== null && sub.imageBox !== undefined){
                    fs.unlinkSync('.' + sub.imageBox);
                }
                sub.imageBox = fullPath;
                break;
            default:
                fs.unlinkSync('.' + fullPath);
                return res.status(400).send("Wrong Image Type");
        }
        try{
            await sub.save();
        }catch(err){
            return res.status(400).send(err);
        }
        res.send(fullPath);
    }

}

export default SubmissionController;