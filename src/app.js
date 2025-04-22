const express = require('express');
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
    let user = new User({
        //  firstName: "Vinothkumar",
        lastName: "P",
        emailId: "pvinothkumar93@gmail.com",
        phoneNumber: "9884548985"
    });
    await user.save();
    res.send("Data Saved Successfuly to signup collection")
});



connectDB().then(() => {
    console.log("DB connected Successfully!!")
    app.listen(3000, () => {
        console.log("Server is running successfuly listing on port:3000")
    });
})
    .catch((err) => {
        console.log("DB not connected. Please try again")
    })


