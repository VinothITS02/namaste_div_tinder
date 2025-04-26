const mongoose = require("mongoose");

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
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber: {
        type: String
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male","female","others"].includes(value)) {
                throw new Error("Gender is not valid")
            }
        }
    },
    age :{
        type:Number,
        min:18
    },
    photoURL:{
        type:String
    },
    skills:{
        type:[String]
    }
},{
    timestamps:true
});

const User = mongoose.model("User", userSchema);
module.exports = User