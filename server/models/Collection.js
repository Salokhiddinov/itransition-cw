const { Schema, model } = require("mongoose");
const { DateTime } = require("luxon");

const Collection = new Schema({
  title: { type: String, required: true },
  owner: { type: String, required: true },
  description: { type: String, default: "No description" },
  createdAt: { type: Object, default: DateTime.now().c },
  items: { type: Array, default: [] },
});

module.exports = model("collection", Collection);
