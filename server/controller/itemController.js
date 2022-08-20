const Item = require("../models/Item");
const User = require("../models/User");
const Collection = require("../models/Collection");


class ItemController{
    async createItem(req,res){
        try{
            const {name, description, price, owner, collection} = req.body;
            const item = new Item({
                name: name,
                description: description,
                price: price,
                owner: owner,
                collection: collection
            });
            await item.save();
            res.status(200).json({message: `Item ${name} created`});
        }
        catch(err){
            console.log(err);
        }
    }
    async uploadPhoto(req,res){

    }
    async getItem(req,res){

    }
    async getAllItems(req,res){

    }
    async getUsersItems(req,res){

    }
}