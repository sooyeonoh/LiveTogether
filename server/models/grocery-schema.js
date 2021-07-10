const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const grocerySchema = new mongoose.Schema ({
    id: Number,
    name: String,
    aisle: String,
    cost: Number,
    count: Number,
    img: String,
    username: Number
});

grocerySchema.plugin(passportLocalMongoose);
grocerySchema.plugin(findOrCreate);

module.exports = mongoose.model('Grocery', grocerySchema)