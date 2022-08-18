const User = require("../models/User");
const Collection = require("../models/Collection");

class collectionRouter{
    async create(req, res){
        const {title, owner, description} = req.body;
        const collection = new Collection({
            title: title,
            owner: owner,
            description: description
        })
        await collection.save();
        res.status(200).json({message: `Collection ${title} created by ${owner}`});
    }
    async getCollection(){

    }
    async getAllCollections(){

    }
    async updateCollection(){

    }
    async deleteCollection(){

    }
}

module.exports = new collectionRouter();