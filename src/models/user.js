const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require:true
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    gender: {
        type: String
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User