var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemsSchema = new Schema({
    imgURL: String,
    title: String,
    linkURL: String,
    type: String,
    tags: Array,
    user: String,
    votes: Array
});


var Item = mongoose.model('items', itemsSchema);

module.exports = Item;
