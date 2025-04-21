const mongoose = require("mongoose");

const connectDB = async () => {
   await mongoose.connect("mongodb+srv://divTinder:uqljN90eJ6X1L4Xd@divtinder.re7hxnq.mongodb.net/divTinder")
};
module.exports = connectDB
