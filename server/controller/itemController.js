const Item = require("../models/Item");
const User = require("../models/User").default;
const Collection = require("../models/Collection");

class ItemController {
  async createItem(req, res) {
    try {
      const r = req.body;
      console.log(r);

      console.log(req.params);
      const username = req.params.username;
      const collectionID = req.params.collectionID;
      const item = new Item({
        username: username,
        collectionID: collectionID,
        name: r.name,
        description: r.description,
        image: r.image,
        tags: r.tags,
        price: r.price,
        year: r.year,
        from: r.from,
      });
      await item.save().then(() => {
        res.status(202).json(`Item ${r.name} by ${username} is created`);
      });
    } catch (err) {
      console.log(err);
    }
  }
  async getItemsFromCollection(req, res) {
    try {
      const collectionID = req.params.collectionID;
      const result = await Item.find({ collectionID: collectionID });
      res.status(202).json(result);
    } catch (err) {
      console.log(err);
    }
  }
  async getAllItems(req, res) {
    try {
      console.log("get all items");
      const result = await Item.find({});
      res.status(202).json(result);
    } catch (err) {
      console.log(err);
    }
  }
  async likeItem(req, res) {
    try {
      const { username, itemID } = req.body;
      const item = await Item.findOne({ _id: itemID });
      item.likes.push(username);
      await item.save();
      res.status(202).json(item);
    } catch (err) {
      console.log(err);
    }
  }
  async unlikeItem(req, res) {
    try {
      const { username, itemID } = req.body;
      const item = await Item.findOne({ _id: itemID });
      item.likes.pull(username);
      await item.save();
      res.status(202).json(item);
    } catch (err) {
      console.log(err);
    }
  }
  async deleteItem(req, res) {
    try {
      const item = await Item.findById(req.params.id);
      await item.remove();
      res.status(202).json(item);
    } catch (err) {
      console.log(err);
    }
  }
  async getItem(req, res) {}
  async getAllItems(req, res) {}
  async getUsersItems(req, res) {}
}

module.exports = new ItemController();
