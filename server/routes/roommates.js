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
        User.findById(req.session.user._id, (err, user) => {
            User.findOne({email: roommateEmail}, (err, roommate) => {
                user.roommates.push(roommate);
                user.save();
                roommate.roommates.push(user);
                roommate.save();
                console.log("Adding roommate: " + roommate.fName);
                Home.findOneAndUpdate({users:{$elemMatch:{_id: userID}}}, { "$push": { "users": roommate } }, (err, home) => {
                    if (!home) {
                        console.log("Home not found for user");
                    }
                });
                Home.findOneAndDelete({users:{$elemMatch:{_id: roommate._id}}});
                res.send(roommate);
            })
        }) 
    })

}