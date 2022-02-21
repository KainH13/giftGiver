const Comment = require("../models/comment.model");
const User = require("../models/user.model");

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

        // push comment into comments field of user that created it
        User.findOneAndUpdate(
          { _id: req.body.createdFor },
          {
            $addToSet: { comments: newlyCreatedComment._id },
          },
          {
            new: true,
            useFindAndModify: true,
          }
        )
          .then((userToUpdate) => {
            console.log(userToUpdate);
            res.json(newlyCreatedComment);
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

  updateComment: (req, res) => {
    Comment.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("createdFor", "firstName lastName")
      .then((likeAdded) => {
        console.log("comment liked successfully");
        res.json(likeAdded);
      })
      .catch((err) => {
        console.log(err);
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
};
