const mongoose = require("mongoose");
const validator = require("validator")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Please enter the strong passwod")
            }
        }
    },
    phoneNumber: {
        type: String
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender is not valid")
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    photoURL: {
        type: String,
        default: "https://english.mathrubhumi.com/image/contentid/policy:1.9388658:1709883248/New%20Project%20-%202024-03-08T113323.655.jpg?$p=4340580&f=16x10&w=852&q=0.8"
    },
    skills: {
        type: [String]
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User