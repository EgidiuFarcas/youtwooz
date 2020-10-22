import Comment from '../database/Comment.js';

export default class CommentModel {

    static async create(userID, itemID, text){
        let commentModel = new Comment({
            userID: userID,
            itemID: itemID,
            text: text
        });
        return await commentModel.save();
    }

    static async getAll(){
        return await Comment.find();
    }

    static async findForItem(itemID){
        return await Comment.find({itemID: itemID});
    }

    static async existsValue(userID, itemID){
        let commentModel = await Comment.findOne({userID: userID, itemID: itemID});
        if(!commentModel) return false;
        return commentModel;
    }

    static async existsID(id){
        let commentModel = await Comment.findOne({_id: id});
        if(!commentModel) return false;
        return commentModel;
    }

    static async delete(id){
        return await Comment.findOneAndDelete({_id: id});
    }

    static async deleteValue(userID, itemID){
        return await Comment.findOneAndDelete({userID: userID, itemID: itemID});
    }

}