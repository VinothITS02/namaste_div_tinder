const express = require('express');
const connectDB = require("./config/database");
const cookie = require("cookie-parser");
// router imports 
const authRouter = require("./routes/authRoutes");
const profileRouter = require("./routes/profileRoutes");
const connectionRequestRouter = require("./routes/connectionRequestRoutes");
const userRouter = require("./routes/userRoutes");
const cors = require("cors")

const app = express();
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }))
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
    app.listen(3000, () => {
        console.log("Server is running successfuly listing on port:3000")
    });
})
    .catch((err) => {
        console.log("DB not connected. Please try again")
    })


