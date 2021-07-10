module.exports = function(app){

    var mongoose = require('mongoose');
    const Home = require("../models/home-schema");
    const Grocery = require("../models/grocery-schema");

    app.post("/addGrocery", (req, res) => {
        const newGrocery = new Grocery(req.body);
        newGrocery.save();
        Home.findOneAndUpdate({"users": mongoose.Types.ObjectId(req.session.user._id)}, { "$push": { "groceries": newGrocery } }, (err, home) => {
            if (!home) {
                console.log("Home not found for user");
            } else {
                console.log("Adding grocery: " + req.body.name);
                res.send(newGrocery);
            }
        });
    })
}