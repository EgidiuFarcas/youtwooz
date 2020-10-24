import Submission from '../database/Submission.js';
import Like from '../database/Like.js';

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

    static async search(query){
        query = query.toLowerCase();
        let subs = await Submission.find().populate('categoryID');
        subs = subs.filter(sub => {
            if(sub.categoryID !== undefined){
                return sub.name.toLowerCase().includes(query) || sub.categoryID.name.toLowerCase().includes(query)
            }else return sub.name.toLowerCase().includes(query)
        });
        return subs;
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
    
    static async findAmount(conditions, from, to, sort){
        let subs =  await Submission.find(conditions).sort(sort);
        return subs.slice(from, to);
    }

    static async findAmountByLikes(conditions, from, to, sort){
        let subs = await Submission.find(conditions);
        let likes = [];
        for(let i = 0; i < subs.length; i++){
            likes[i] = await Like.countDocuments({itemID: subs[i]._id});
        }
        for(let i = 0; i < likes.length; i++){
            for(let j = 0; j < likes.length; j++){
                if(sort === 'desc'){
                    if(likes[i] > likes[j]){
                        let t = likes[j];
                        likes[j] = likes[i];
                        likes[i] = t;
                        t = subs[j];
                        subs[j] = subs[i];
                        subs[i] = t;
                    }
                }
                if(sort === 'asc'){
                    if(likes[i] < likes[j]){
                        let t = likes[j];
                        likes[j] = likes[i];
                        likes[i] = t;
                        t = subs[j];
                        subs[j] = subs[i];
                        subs[i] = t;
                    }
                }
            }
        }
        return subs.slice(from, to);
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