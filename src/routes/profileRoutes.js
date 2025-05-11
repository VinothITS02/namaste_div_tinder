const express = require("express");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();
const { UserAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const User = require("../models/user");


profileRouter.get("/view", UserAuth, async (req, res) => {
    try {
        res.send(req.user)
    }
    catch (err) {
        res.status(400).send("Error " + err.message)
    }
});

profileRouter.patch("/edit", UserAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req.body)) {
            throw new Error("Invalid Edit Request");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);

        const updateProfile = await User.findByIdAndUpdate(loggedInUser._id, loggedInUser, {
            returnDocument: "after"
        });
        res.send(updateProfile);
    }
    catch (err) {
        res.status(400).send("Error " + err.message)
    }
});

profileRouter.post("/forgotPassword", UserAuth, async (req, res) => {
    try {
        let newPassword = req.body.password;
        const loggedInUser = req.user;
        let passwordBcrypt = await bcrypt.hash(newPassword, 10);
        loggedInUser.password = passwordBcrypt
        const updateProfile = await User.findByIdAndUpdate(loggedInUser._id, loggedInUser, {
            returnDocument: "after"
        });
        res.send(updateProfile);
    }

    catch (err) {
        res.status(400).send("Error " + err.message)
    }
});



module.exports = profileRouter;