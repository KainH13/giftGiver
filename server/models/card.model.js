const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required."],
            minlength: [2, "First name must be at least 2 characters long."],
            unique: true, // throws 'duplicate key error' code 11000 if name already exists in the db
        },
        lastName: {
            type: String,
            required: [true, "Last name is required."],
            minlength: [2, "Last name must be at least 2 characters long."],
        },
        interests: {
            type: String,
        },
        customFields: {
            type: Array,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;
