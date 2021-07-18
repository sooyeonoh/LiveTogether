const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const taskSchema = new mongoose.Schema ({
    task: String,
    isComplete: Boolean
});

taskSchema.plugin(passportLocalMongoose);
taskSchema.plugin(findOrCreate);

module.exports = mongoose.model('Task', taskSchema)