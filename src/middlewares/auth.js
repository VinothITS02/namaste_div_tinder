const jwt = require("jsonwebtoken");
const User = require("../models/user");

const UserAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) throw new Error("Token Invalid!!!!!");
        const decodeObj = await jwt.verify(token, "DEV@Tinder@123");
        const { _id } = decodeObj;
        const findUser = await User.findById(_id);
        if (!findUser) throw new Error("User Not Found!");
        req.user = findUser;
        next();
    }
    catch (err) {
        res.status(400).send("ERROR " + err.message);
    }
};

module.exports = {
    UserAuth
}