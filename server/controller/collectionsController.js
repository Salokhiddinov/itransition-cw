const Collection = require("../models/Collection");
const User = require("../models/User");

class collectionRouter {
  async create(req, res) {
    try {
      const { username, title, description } = req.body;
      const user = await User.findOne({ username: username });
      const collection = new Collection({
        user_id: user._id,
        username: username,
        title: title,
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
      const id = req.params.id;
      const result = await Collection.find();
      const userCollections = result.filter((collection) => {
        return collection.user_id === id;
      });
      res.status(200).json(userCollections);
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
