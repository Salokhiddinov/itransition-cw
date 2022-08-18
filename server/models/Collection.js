const {Schema, model} = require('mongoose')
const {DateTime} = require("luxon")

const Collection = new Schema({
    title: {type: String, required: true},
    owner: {type: String, required: true},
    description: {type: String, default:"No description"},
    createdAt: {type: Date, default: DateTime.now},
})

module.exports = model("collection", Collection)