module.exports = function(app){

    var mongoose = require('mongoose');
    const User = require("../models/user-schema");
    const Home = require("../models/home-schema");
    const Task = require("../models/task-schema");

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
        var userID = req.session.user._id;
        User.findById(userID, (err, user) => {
            User.findOne({email: roommateEmail}, (err, roommate) => {
                Home.findOneAndUpdate({"users": mongoose.Types.ObjectId(userID)}, { "$push": { "users": roommate } }, (err, home) => {
                    if (!home) {
                        console.log("Home not found for user");
                    } else {
                        user.roommates.push(roommate);
                        user.save();
                        roommate.roommates.push(user);
                        roommate.save();
                        console.log("Adding roommate: " + roommate.fName);
                    }
                });
                Home.findOneAndDelete({"users": mongoose.Types.ObjectId(roommate._id)});
                res.send(roommate);
            })
        }) 
    })

    app.post("/sendTask", (req, res) => {
        User.findById(req.body.recipient._id, (err, user) => {
            taskToSend = req.body;
            const newTask = new Task(taskToSend);
            newTask.save();
            user.tasks.push(newTask);
            user.save();
            console.log("Sending task: " + taskToSend.task);
            res.send(taskToSend);
        }) 
    })

}