const User = require("../models/User");
const Collection = require("../models/Collection");

class collectionRouter {
  async create(req, res) {
    try {
      const { title, owner, description } = req.body;
      const collection = new Collection({
        title: title,
        owner: owner,
        description: description,
      });
      await collection.save();
      res
        .status(200)
        .json({ message: `Collection ${title} created by ${owner}` });
    } catch (err) {
      console.log(err);
    }
  }

  async getCollection(req, res) {
    try {
      const result = await Collection.findOne({ _id: req.params.id });
      res.status(202).json(result);
    } catch (err) {
      console.log(err);
    }
  }

  async getAllCollections(req, res) {
    try {
        const result = await Collection.find({});
        res.status(202).json(result);
      } catch (err) {
        console.log(err);
      }
  }

  async getUsersCollection() {}
  async updateCollection() {}
  async deleteCollection() {}
}

module.exports = new collectionRouter();
