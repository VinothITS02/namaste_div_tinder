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
