import Category from '../database/Category.js';

export default class CategoryModel {

    static async create(name){
        let refreshToken = new Category({
            name: name,
        });
        return await refreshToken.save();
    }

    static async exists(name){
        let refreshToken = await Category.findOne({name: name});
        if(!refreshToken) return false;
        return true;
    }

    static async delete(id){
        return await Category.findOneAndDelete({_id: id});
    }

}