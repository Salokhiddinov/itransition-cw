const Collection = require("../models/Collection");
const User = require("../models/User").default;

class collectionRouter {
  async create(req, res) {
    try {
      //   const id = req.params.userID;
      const { userID, title, description } = req.body;
      const username = req.params.username;
      const collection = new Collection({
        userID: userID,
        title: title,
        username: username,
        description: description,
      });

      await collection.save();
      res
        .status(200)
        .json({ message: `Collection ${title} created by ${username}` });
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

  async getUserCollections(req, res) {
    try {
      const username = req.params.username;
      console.log("username is" + username);
      
      //   const userID = req.params.userID;
      //   const result = await Collection.find({userID: userID});
    //   res.status(202).json(result);
    } catch (err) {
      res.json({ message: err });
    }
  }

  async updateCollection(req, res) {
    try {
      const { title, description } = req.body;
      await Collection.findOneAndUpdate(
        { _id: req.params.id },
        { title: title, description: description }
      );
      res.status(202).json({ message: `Collection ${title} updated` });
    } catch (err) {
      console.log(err);
    }
  }

  async deleteCollection(req, res) {
    try {
      await Collection.findOneAndDelete({ _id: req.params.id });
      res.status(204).json({ message: `Collection deleted` });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new collectionRouter();
