module.exports = function(app){

    var mongoose = require('mongoose');
    const Home = require("../models/home-schema");

    app.post("/addGrocery", (req, res) => {
        Home.findOne({"users": mongoose.Types.ObjectId(req.session.user._id)}, (err, home) => {
            if (!home) {
                console.log("Home not found for user");
            } else {
                console.log("Adding grocery: " + req.body.name);
                home.groceries.push(req.body);
                home.save();
                res.send(home.groceries);
            }
        });
    });

    app.post("/removeGrocery", (req, res) => {
        Home.findOne({"users": mongoose.Types.ObjectId(req.session.user._id)}, (err, home) => {
            if (!home) {
                console.log("Home not found for user");
            } else {
                console.log("Removing grocery: " + req.body.name);
                home.groceries = home.groceries.filter(item => item.name !== req.body.name); 
                home.save();
                res.send(home.groceries);
            }
        });
    });
}