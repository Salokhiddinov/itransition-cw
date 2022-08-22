const Collection = require("../models/Collection");
const User = require("../models/User");

class collectionRouter {
  async create(req, res) {
    try {
      const username = req.params.username;
      const { title, description } = req.body;
      const user = await User.findOne({ username: username });
      console.log(user);
      const collection = new Collection({
        userID: user._id,
        title: title,
        username: username,
        description: description,
      });
      console.log(collection);

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

  async getUsersCollections(req, res) {
    try {
      const result = await Collection.find({ username: req.params.username });
      res.status(202).json(result);
    } catch (err) {
      console.log(err);
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
