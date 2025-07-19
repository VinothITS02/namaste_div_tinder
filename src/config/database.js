const mongoose = require("mongoose");
const proces = require("process");
const donEnv = require('dotenv').config();

const dbURL = proces.env.databaseURL;

const connectDB = async () => {
   try {
      console.log("dbURL", dbURL)
      await mongoose.connect(`${dbURL}`, {
         useNewUrlParser: true,
         useUnifiedTopology: true
      });
   }
   catch (err) {
      console.log("err", err);
      throw new Error("Server is not Connting pls check")
   }
};
module.exports = connectDB
