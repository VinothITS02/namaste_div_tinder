const mongoose = require("mongoose");
const proces = require("process");
const donEnv = require('dotenv').config();

const dbURL = proces.env.databaseURL;

const connectDB = async () => {
   try {
      await mongoose.connect(`${dbURL}`);
   }
   catch (err) {
      //console.log("err", err);
      throw new Error("Server is not Connting pls check")
   }
};
module.exports = connectDB
