const Card = require("../models/card.model");
const User = require("../models/user.model");

module.exports = {
    findAllCards: (req, res) => {
        Card.find()
            // returns all Cards sorted alphabetically by type
            .collation({ locale: "en", strength: 2 })
            .sort({ firstName: 1 })
            .then((allCards) => {
                console.log(allCards);
                res.json(allCards);
            })
            .catch((err) => {
                console.log("Find All failed");
                res.status(400).json(err);
            });
    },

    findOneCard: (req, res) => {
        Card.findOne({ _id: req.params.id })
            .then((oneCard) => {
                console.log(oneCard);
                res.json(oneCard);
            })
            .catch((err) => {
                console.log("Find One failed");
                res.status(400).json(err);
            });
    },

    createCard: (req, res) => {
        Card.create(req.body)
            .then((newlyCreatedCard) => {
                console.log(newlyCreatedCard);

                // push card into cards field of user that created it
                User.findOneAndUpdate(
                    req.body.createdBy,
                    {
                        $addToSet: { cards: newlyCreatedCard._id },
                    },
                    {
                        new: true,
                        useFindAndModify: true,
                    }
                )
                    .populate("cards", "firstName lastName interests customFields _id")
                    .then((userToUpdate) => {
                        console.log(userToUpdate);
                        res.json(newlyCreatedCard);
                    })
                    .catch((err) => {
                        console.log("Create failed");
                        res.status(400).json(err);
                    });
            })
            .catch((err) => {
                console.log("Create failed");
                res.status(400).json(err);
            });
    },

    updateCard: (req, res) => {
        Card.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        })
            .then((updatedCard) => {
                console.log(updatedCard);
                res.json(updatedCard);
            })
            .catch((err) => {
                console.log("Update failed");
                res.status(400).json(err);
            });
    },

    deleteCard: (req, res) => {
        Card.deleteOne({ _id: req.params.id })
            .then((result) => {
                console.log(result);
                res.json(result);
            })
            .catch((err) => {
                console.log("Delete failed");
                res.status(400).json(err);
            });
    },
};
