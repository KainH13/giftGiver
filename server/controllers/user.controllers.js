const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: (req, res) => {
    // setting up a new instance of the user model using the request body
    const user = new User(req.body);

    user
      .save()
      .then((newUser) => {
        console.log(newUser);
        console.log("Successfully Registered");
        res.json({
          successMessage: "Thank you for registering",
          user: newUser,
        });
      })
      .catch((err) => {
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
                res
                  .cookie(
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
                  )
                  .json({
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

  getAllUsers: (req, res) => {
    User.find()
      .populate("comments", "name body likes _id")
      // returns all Users sorted alphabetically by type
      .collation({ locale: "en", strength: 2 })
      .sort({ firstName: 1 })
      .then((allUsers) => {
        console.log(allUsers);
        res.json(allUsers);
      })
      .catch((err) => {
        console.log("Find All failed");
        res.status(400).json(err);
      });
  },

  getOneUser: (req, res) => {
    User.findOne({ _id: req.params.id })
      .populate("cards", "firstName lastName interests customFields _id")
      .populate("comments", "name body likes _id")
      .then((oneUser) => {
        console.log(oneUser);
        res.json(oneUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getLoggedInUser: (req, res) => {
    User.findOne({ _id: req.jwtpayload.id })
      .populate("cards", "firstName lastName interests customFields _id")
      .populate("comments", "name body likes _id")
      .populate(
        "friends",
        "firstName lastName email interests customFields _id"
      )
      .then((user) => {
        console.log("logged in user: ", user);
        res.json(user);
      })
      .catch((err) => {
        console.log("Error in getLoggedInUser");
        res.status(400).json(err);
      });
  },

  updateUser: (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updatedUser) => {
        console.log(updatedUser);
        res.json(updatedUser);
      })
      .catch((err) => {
        console.log("Update Failed");
        res.status(400).json(err);
      });
  },

  deleteUser: (req, res) => {
    User.deleteOne({ _id: req.params.id })
      .then((result) => {
        console.log(result);
        res.json(result);
      })
      .catch((err) => {
        console.log("Delete failed");
        res.status(400).json(err);
      });
  },

  searchUsers: (req, res) => {
    User.fuzzySearch(req.params.searchTerm)
      .then((results) => {
        // this prunes results to just firstName, lastName, and email per user before sending to the front end
        let output = [];
        for (let i = 0; i < results.length; i++) {
          let user = {
            _id: results[i]._id,
            firstName: results[i].firstName,
            lastName: results[i].lastName,
            email: results[i].email,
          };
          console.log(user);
          output.push(user);
        }
        console.log("Search Results: ", output);
        res.json(output);
      })
      .catch((err) => {
        console.log("Search Failed");
        res.status(400).json(err);
      });
  },
};
