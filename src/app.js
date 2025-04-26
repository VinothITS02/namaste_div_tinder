const express = require('express');
const connectDB = require("./config/database");
const bcrypt = require("bcrypt");
const User = require("./models/user");

const app = express();
app.use(express.json());


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
        let passowrdCheck = await bcrypt.compare(password, findUser.password);
        if (!passowrdCheck) res.status(400).send("Invalid User");
        res.send("Logedin Successfuly!");
    }
    catch (err) {
        res.status(400).send("Invalid User")
    }
});

app.get("/user", async (req, res) => {
    try {
        let users = await User.find({});
        res.send(users);
    }
    catch (err) {
        res.status(400).send("Something went wrong!")
    }
});

app.patch("/user/:userId", async (req, res) => {
    try {
        let userId = req.params.userId;
        let AllowedUpdate = ["firstName", "lastName", "photoURL", "skills", "gender"];
        let isAllowedUpdate = Object.keys(req.body).every(item => {
            return AllowedUpdate.includes(item)
        });
        if (!isAllowedUpdate) {
            throw new Error("Update Failed")
        }
        let body = req.body;
        await User.findByIdAndUpdate({ _id: userId }, body);
        res.send("Updated Succesfully");
    }
    catch (err) {
        res.status(400).send("Update Failed", err.message)
    }
});

app.delete("/user", async (req, res) => {
    try {
        let userId = req.body.userId;
        await User.findByIdAndDelete({ _id: userId });
        res.send("User Deleted Successfully!");
    }
    catch (err) {
        res.status(400).send("Something went wrong!")
    }
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


