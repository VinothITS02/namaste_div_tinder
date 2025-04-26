const express = require('express');
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
app.use(express.json());


app.post("/signup", async (req, res) => {
    try {
        let user = new User(req.body);
        await user.save();
        res.send("Data Saved Successfuly to signup collection");
    }
    catch (err) {
        res.status(400).send(err.message)
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
        let body = req.body;
        console.log(userId)
        console.log(body)
        await User.findByIdAndUpdate({ _id: userId }, body);
        res.send("Updated Succesfully");
    }
    catch (err) {
        res.status(400).send("Something went wrong!")
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


