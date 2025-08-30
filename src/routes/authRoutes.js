const express = require("express");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const expiresIn = '1h';

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
    console.log("Starting the login function=========>")
    try {
        let { emailId, password } = req.body;
        let findUser = await User.findOne({ emailId });
        if (!findUser) res.status(400).send("Invalid Credentials")
        let passowrdCheck = await findUser.validatePassword(password);
        if (!passowrdCheck) {
            res.status(400).json({
                message:"Invalid Credentials!!!"
            })
            return;
        }
        let jwtToken = await jwt.sign({ _id: findUser._id }, "DEV@Tinder@123", { expiresIn });
        res.cookie("token", jwtToken);
        res.send(findUser);
        console.log("Ending the login function with successfully connected=========>")
    }
    catch (err) {
        console.log(err)
        res.status(400).send("Invalid User")
    }
});

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expiresIn: new Date(Date.now)
    });
    res.send("Logout successfuly")
});



module.exports = authRouter;