const Card = require("../models/card.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

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

    // secure way to get all cards for a user, without passing ID around
    findAllCardsByUser: (req, res) => {
        if (req.jwtpayload.email !== req.params.email) {
            User.findOne({ email: req.params.email })
                .then((userNotLoggedIn) => {
                    Card.find({ createdBy: userNotLoggedIn._id })
                        .then((allCardsFromUser) => {
                            console.log(allCardsFromUser);
                            res.json(allCardsFromUser);
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(400).json(err);
                        });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                });
        } else {
            Card.find({ createdBy: req.jwtpayload.id })
                .then((allCardsFromLoggedInUser) => {
                    console.log(allCardsFromLoggedInUser);
                    res.json(allCardsFromLoggedInUser);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                });
        }
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
        const newCardObject = new Card(req.body);

        // more verbose alternative without setting jwtpayload to payload in jwt.config.js
        // const decodedJWT = jwt.decode(req.cookies.usertoken, {
        //     complete: true,
        // });

        // console.log(decodedJWT.payload);

        // newCardObject.createdBy = decodedJWT.payload.id;

        newCardObject.createdBy = req.jwtpayload.id;

        newCardObject
            .save()
            .then((newlyCreatedCard) => {
                console.log(newlyCreatedCard);

                // push comment into comments field of user that created it
                User.findOneAndUpdate(
                    { _id: newlyCreatedCard.createdBy },
                    {
                        $addToSet: { cards: newlyCreatedCard._id },
                    },
                    {
                        new: true,
                        useFindAndModify: true,
                    }
                )
                    .populate(
                        "cards",
                        "firstName lastName interests customFields _id"
                    )
                    .then((userToUpdate) => {
                        console.log(userToUpdate);
                        res.json(newlyCreatedCard);
                    })
                    .catch((err) => {
                        console.log("Create failed");
                        console.log("Push to user failed.");
                        res.status(400).json(err);
                    });
            })
            .catch((err) => {
                console.log("Create failed");
                console.log("Initial creation failed.");
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
