const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
      minlength: [2, "First name must be at least 2 characters long."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
      minlength: [2, "Last name must be at least 2 characters long."],
    },
    email: {
      type: String,
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email.",
      },
      required: [true, "Email is required."],
      unique: true,
    },
    password: {
      type: String,
      validate: {
        validator: (val) =>
          /^(?=.*[A-Z])(?=.*[!@#$%^&*\(\)\.])(?=.*[0-9])(?=.*[a-z]).{8,}$/.test(val),
        message:
          "Password must be at least 8 characters long and contain at least one lowercase character, uppercase character, number, and special character (!@#$&*).",
      },
      required: [true, "Password is required."],
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    interests: {
      type: String,
      default: "",
    },
    customFields: {
      type: Array,
    },
    cards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

// enables unique: true to output an error message like any other mongoose validator
UserSchema.plugin(uniqueValidator, {
  message:
    "An account with that email already exists, please use a unique email address to register.",
});

// enables fuzzy searching for users
UserSchema.plugin(mongoose_fuzzy_searching, {
  fields: ["firstName", "lastName"],
});

// virtual attribute to store password confirmation temporarily
UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

// validation that runs before others to check if passwords match
UserSchema.pre("validate", function (next) {
  console.log("Validating Password:");
  console.log(`Password: ${this.password}`);
  console.log(`confirmPassword: ${this.confirmPassword}`);
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Passwords do not match.");
    console.log("Passwords do not match.");
  }
  next();
});

// encrypting password for storage with bcrypt
UserSchema.pre("save", function (next) {
  console.log("in pre save");
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
