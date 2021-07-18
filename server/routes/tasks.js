module.exports = function(app){

    const Task = require("../models/task-schema");
    const User = require("../models/user-schema");
    const Home = require("../models/home-schema");

    app.get("/getTasks", (req, res) => {
        User.findById(req.session.user._id, (err, user) => {
            console.log("Getting tasks for user")
            Task.find({ _id: { $in: user.tasks } }, (err, foundTasks) => {
                if (foundTasks) { res.send(foundTasks) }
            });
        })
    })

    app.post("/addTask", (req, res) => {
    const taskToAdd = {
        task: req.body.task,
        completed: req.body.completed
    }
    User.findById(req.session.user._id, (err, foundUser) => {
        const newTask = new Task(taskToAdd);
        newTask.save();
        foundUser.tasks.push(newTask);
        foundUser.save();
        console.log("Adding task: " + taskToAdd.task);
        res.send(taskToAdd);
    }) 
    })

    app.post("/removeTask", (req, res) => {
    const completedTask = req.body;
    User.findById(req.session.user._id, (err, foundUser) => {
        foundUser.tasks = foundUser.tasks.filter(item => {
        item._id !== completedTask._id
        });
        foundUser.save();
    }).then(
        Task.findByIdAndRemove(completedTask._id, (err, removed) => {
            res.send({message: "Task removed successfully"});
        })
    )
    })

    app.get("/getTaskData", (req, res) => {
        Home.findOne({"users": mongoose.Types.ObjectId(req.session.user._id)}, (err, home) => {
            if (!home) {
                console.log("Home not found for user");
            } else {
                
            }
        });
    })

}