const mongoose = require("mongoose");
const proces = require("process");
const donEnv = require('dotenv').config();

const dbURL = proces.env.databaseURL;

const connectDB = async () => {
   try {
      await mongoose.connect(`${dbURL}`);
   }
   catch (err) {
      console.log("err", err)
   }
};
module.exports = connectDB
