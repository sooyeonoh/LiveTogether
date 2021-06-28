module.exports = function(app){

    const User = require("../models/user-schema");
    const Home = require("../models/home-schema");
    const passport = require('passport');

    app.get("/auth/google", 
    passport.authenticate("google", { scope: ["profile", "email"] })
    );

    app.get("/auth/google/dashboard", 
    passport.authenticate("google", { failureRedirect: "/signup" }),
    (req, res) => {
        console.log("User authenticated from Google");
        res.redirect("/auth/google/dashboard/id/" + user._id);
    });

    app.get("/auth/google/dashboard/:id", (req, res) => {
        const userID = req.params.id;
        console.log('Searching for ID:', userID);
        User.findById(userID, function (err, user) {
        if (err) {
            console.log(err);
        } else if (!user) {
            console.log("User " + userID + " not found.");
        } else {
            res.send(user);
        }
        })
    });

    app.post("/signin", (req, res, next) => {
        passport.authenticate('local', function(err, user, info) {
            if (err) { 
                return next(err); 
            } else if (!user) { 
                return res.send("Your email or password is incorrect."); 
            }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                else {
                    req.session.user = req.user;
                    return res.send(user);
                }
            });
        })(req, res, next);
    });

    app.get('/signout', (req, res) => {
        req.session = null;
        req.logout();
        res.send({ message: "Logging out" });
    })

    app.post("/signup", (req, res) => {
    const newUser = new User({ fName: req.body.fName, lName: req.body.lName, email: req.body.email, username: req.body.email, password: req.body.password, roommates:[], tasks: [] });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            const newHome = new Home({users: [newUser], groceries: [] })
            newHome.save();
            user.home = newHome;
            user.save();
            passport.authenticate("local", (err, user, info) => {
                if (err) { 
                    return next(err); 
                }
                req.logIn(user, function(err) {
                    if (err) { return next(err); }
                    else {
                        req.session.user = req.user;
                        console.log("User authenticated from /signup");
                        res.send(user);
                    }
                });
            })
        }
    })
    });

}