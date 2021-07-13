module.exports = function(app){

    var mongoose = require('mongoose');
    const Home = require("../models/home-schema");

    app.post("/addGrocery", (req, res) => {
        Home.findOneAndUpdate({"users": mongoose.Types.ObjectId(req.session.user._id)}, { "$push": { "groceries": req.body } }, (err, home) => {
            if (!home) {
                console.log("Home not found for user");
            } else {
                console.log("Adding grocery: " + req.body.name);
                console.log(req.body);
                res.send(req.body);
            }
        });
    });
}