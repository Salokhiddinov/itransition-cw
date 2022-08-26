const Item = require("../models/Item");
const User = require("../models/User").default;
const Collection = require("../models/Collection");

class ItemController {
  async createItem(req, res) {
    try {
      const r = req.body;
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
        res
          .status(202)
          .json(`Item ${r.name} by ${username} is created`);
      });
    } catch (err) {
      console.log(err);
    }
  }
  async getItem(req, res) {}
  async getAllItems(req, res) {}
  async getUsersItems(req, res) {}
}

module.exports = new ItemController();
