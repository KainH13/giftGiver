const Comment = require("../models/comment.model");

module.exports = {
    findAllComments: (req, res) => {
        Comment.find()
            .then((allComments) => {
                console.log(allComments);
                res.json(allComments);
            })
            .catch((err) => {
                console.log("Find All failed");
                res.status(400).json(err);
            });
    },

    findOneComment: (req, res) => {
        Comment.findOne({ _id: req.params.id })
            .then((oneComment) => {
                console.log(oneComment);
                res.json(oneComment);
            })
            .catch((err) => {
                console.log("Find One failed");
                res.status(400).json(err);
            });
    },

    createComment: (req, res) => {
        Comment.create(req.body)
            .then((newlyCreatedComment) => {
                console.log(newlyCreatedComment);
                res.json(newlyCreatedComment);
            })
            .catch((err) => {
                console.log("Create failed");
                res.status(400).json(err);
            });
    },

    updateComment: (req, res) => {
        Comment.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        })
            .then((updatedComment) => {
                console.log(updatedComment);
                res.json(updatedComment);
            })
            .catch((err) => {
                console.log("Update failed");
                res.status(400).json(err);
            });
    },

    deleteComment: (req, res) => {
        Comment.deleteOne({ _id: req.params.id })
            .then((result) => {
                console.log(result);
                res.json(result);
            })
            .catch((err) => {
                console.log("Delete failed");
                res.status(400).json(err);
            });
    },
}