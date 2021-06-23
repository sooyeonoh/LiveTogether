module.exports = function(app){

    const User = require("../models/user-schema");

    app.get("/getRoommates", (req, res) => {
        User.findById(req.session.user._id, (err, user) => {
            console.log("Getting roommates for user")
            User.find({ _id: { $in: user.roommates } }, (err, foundRoommates) => {
                if (foundRoommates) { res.send(foundRoommates) }
                else { console.log("Requested roommate does not exist") }
            });
        })
    })

    app.post("/addRoommate", (req, res) => {
        const roommateEmail = req.body.email;
        User.findById(req.session.user._id, (err, foundUser) => {
            User.findOne({email: roommateEmail}, (err, foundRoommate) => {
                foundUser.roommates.push(foundRoommate);
                foundUser.save();
                foundRoommate.roommates.push(foundUser);
                foundRoommate.save();
                console.log("Adding roommate: " + foundRoommate.fName);
                res.send(foundRoommate);
            })
        }) 
    })

}