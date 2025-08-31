const mongoose = require("mongoose");
const { dataBaseURL } = require("./configEnv");

const connectDB = async () => {
   try {
      await mongoose.connect(`${dataBaseURL}`, {
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
