const {Schema, model} = require("mongoose");
const {DateTime} = require("luxon");

const Item = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: String, required: true },
    price: { type: Number, required: false },
})

module.exports = model("item", Item);