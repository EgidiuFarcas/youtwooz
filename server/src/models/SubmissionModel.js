import Submission from '../database/Submission.js';

class SubmissionModel {

    static async create(name, hasBox, type, submitterID) {
        let sub = new Submission({
            submitterID: submitterID,
            name: name,
            hasBox: hasBox,
            type: this.convertTypeTextToNumber(type)
        });
        return await sub.save();
    }

    static async setDescription(id, description){
        let sub = await Submission.findById(id);
        sub.description = description;
        return await sub.save();
    }

    static async setInfo(id, infoObj){
        return await Submission.updateOne({_id: id}, {$set: infoObj});
    }

    static async get(id){
        return await Submission.findById(id);
    }

    static async find(conditions){
        return await Submission.find(conditions);
    }
    
    static async findAmount(conditions, amount){
        return await Submission.find(conditions).sort('-date').limit(amount);
    }

    static async delete(id){
        return await Submission.findByIdAndDelete(id);
    }

    static convertTypeTextToNumber(typeText){
        switch(typeText){
            case "2D": return 0;
            case "3D": return 1;
            case "2D+3D": return 2;
            default: return -1;
        }
    }

}

export default SubmissionModel;