const User = require("../models/user.model");

module.exports = {
    register: (req, res) => {
        User.create(req.body)
            .then((user) => {
                console.log(user);
                res.json(user);
            })
            .catch((err) => {
                console.log("User creation failed.");
                res.status(400).json(err);
            });
    },
};
