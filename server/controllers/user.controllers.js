const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    register: (req, res) => {
        // setting up a new instance of the user model using the request body
        const user = new User(req.body);

        user.save().then((newUser) => {
            console.log(newUser);
            console.log("Successfully Registered");
            res.json({
                successMessage: "Thank you for registering",
                user: newUser,
            })}).catch((err) => {
                console.log("Registration unsuccessful");
                res.status(400).json(err);
            });
    },

    login: (req, res) => {
        User.findOne({ email: req.body.email })
            .then((userRecord) => {
                // check whether result is null
                if (userRecord === null) {
                    res.status(400).json({ message: "Invalid Login Attempt" });
                } else {
                    // if email is found
                    bcrypt
                        .compare(req.body.password, userRecord.password)
                        .then((isPasswordValid) => {
                            if (isPasswordValid) {
                                console.log("Password is valid");
                                // send json web token with cookie
                                res.cookie(
                                    "usertoken",
                                    jwt.sign(
                                        {
                                            // data we want to save
                                            id: userRecord._id,
                                            email: userRecord.email,
                                            username: userRecord.username,
                                        },
                                        process.env.JWT_SECRET
                                    ),
                                    {
                                        httpOnly: true,
                                        expires: new Date(Date.now() + 9000000),
                                    }
                                ).json({
                                    message: "Successfully",
                                    userLoggedIn: userRecord.username,
                                    userId: userRecord._id,
                                });
                            } else {
                                res.status(400).json({
                                    message: "Email and/or password invalid.",
                                });
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(400).json({
                                message: "Invalid Attempt",
                            });
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({ message: "Invalid Attempt" });
            });
    },

    logout: (req, res) => {
        console.log("logging out");
        res.clearCookie("usertoken");
        res.json({
            message: "You have successfully logged out.",
        });
    },

    getOneUser: (req, res) => {
        User.findOne({ _id: req.params.id })
            .then((oneUser) => {
                console.log(oneUser);
                res.json(oneUser);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
};
