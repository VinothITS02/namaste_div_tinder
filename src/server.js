const express = require('express');
const connectDB = require("./config/database");
const cookie = require("cookie-parser");
// router imports 
const authRouter = require("./routes/authRoutes");
const profileRouter = require("./routes/profileRoutes");
const connectionRequestRouter = require("./routes/connectionRequestRoutes");
const userRouter = require("./routes/userRoutes");
const cors = require("cors")
const { port = 5000 } = require("./config/configEnv");

const app = express();
app.use(express.json());
app.use(cookie());


app.get("/", (req, res) => {
    res.send("API is running 🚀");
});

app.use("/", authRouter);
app.use("/profile", profileRouter);
app.use("/connectionRequest", connectionRequestRouter);
app.use("/user", userRouter);

connectDB().then(() => {
    console.log("DB connected Successfully!!")
    app.listen(port, () => {
        console.log(`Server is running successfuly listing on port:${port}`)
    });
})
    .catch((err) => {
        console.log("DB not connected. Please try again")
    })


