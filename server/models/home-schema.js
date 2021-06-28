const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const homeSchema = new mongoose.Schema ({
    users: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    groceries: [String]
});

homeSchema.plugin(passportLocalMongoose);
homeSchema.plugin(findOrCreate);

module.exports = mongoose.model('Home', homeSchema)