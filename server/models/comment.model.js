const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        body: {
            type: String,
        },
        likes: {
            type: Number,
            default: 0,
        },
        createdFor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
