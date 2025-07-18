const mongoose = require("mongoose");

const { Schema } = mongoose;

const validator = require("validator");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      requried: true,
      minLength: 4,
      maxLength: 20,
    },
    lastName: {
      type: String,
      max: 30,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error("Invalid Email" + value);
        }
      }
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 20,
      validate(value){
        if(!validator.isStrongPassword(value)){
          throw new Error("Enter a strong password" + value);
        }
      }
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Invalid Gender");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://www.freepik.com/free-photos-vectors/placeholder",
      validate(value){
        if(!validator.isURL(value)){
          throw new Error("Invalid URL" + value);
        }
      }
    },
    about: {
      type: String,
      default: "This is a deafult about section",
      maxlength: 250,
    },
    skills: {
      type: [String],
      //add validator to limit the number of skills to 8
      validate(value) {
        if (value.length > 8) {
          throw new Error("Maximum of 8 skills can be added");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
