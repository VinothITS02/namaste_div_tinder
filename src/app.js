const express = require('express');
const connectDB = require("./config/database");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { UserAuth } = require("./middlewares/auth")

const app = express();
app.use(express.json());
app.use(cookie());
const expiresIn = '1h';


app.post("/signup", async (req, res) => {
    try {
        let { password } = req.body;
        let passwordBcrypt = await bcrypt.hash(password, 10);
        req.body.password = passwordBcrypt;
        let user = new User(req.body);
        await user.save();
        res.send("Data Saved Successfuly to signup collection");
    }
    catch (err) {
        res.status(400).send(err.message)
    }
});

app.post("/login", async (req, res) => {
    try {
        let { emailId, password } = req.body;
        let findUser = await User.findOne({ emailId });
        if (!findUser) res.status(400).send("Invalid User")
        let passowrdCheck = await findUser.validatePassword(password);
        if (!passowrdCheck) res.status(400).send("Invalid User");
        let jwtToken = await jwt.sign({ _id: findUser._id }, "DEV@Tinder@123", { expiresIn });
        res.cookie("token", jwtToken);
        res.send("Logedin Successfuly!");
    }
    catch (err) {
        console.log(err)
        res.status(400).send("Invalid User")
    }
});

app.get("/profile", UserAuth, async (req, res) => {
    try {
        res.send(req.user)
    }
    catch (err) {
        res.status(400).send("Error " + err.message)
    }
});

app.post("/sendConnectionRequest", UserAuth, async (req, res) => {
    try {
        res.send("Connection sent")
    }
    catch (err) {
        res.status(400).send("ERROR " + err.message)
    }
})



connectDB().then(() => {
    console.log("DB connected Successfully!!")
    app.listen(3000, () => {
        console.log("Server is running successfuly listing on port:3000")
    });
})
    .catch((err) => {
        console.log("DB not connected. Please try again")
    })


