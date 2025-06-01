const express = require("express");
const userRouter = express.Router();
const { UserAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_GET_FIELDS = `firstName lastName gender age photoURL skills jobTitle`

// Get all pending(Interested) connection for this logged in User
userRouter.get("/request/received", UserAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const data = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", "firstName lastName review age jobTitle");
        res.status(200).json({
            message: "Connection interested  data fetched successfuly!!",
            data: data
        })
    }
    catch (err) {
        res.status(400).send(`ERROR` + err.message)
    }

});

// get my connection 
userRouter.get("/myConnections", UserAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        //get my connection which accepted by me and accepted by others both are my friend if 
        //status is accepted
        const getMyConnections = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id, status: "accepted" },
                { toUserId: loggedInUser._id, status: "accepted" },
            ]
        })
            .populate("fromUserId", USER_GET_FIELDS)
            .populate("toUserId", USER_GET_FIELDS);
        const data = getMyConnections.map(rows => {
            if (JSON.stringify(rows.fromUserId._id) === JSON.stringify(loggedInUser._id)) return rows.toUserId;
            return rows.fromUserId;
        })
        res.status(200).send({
            message: "My Connection data fected successfully!",
            data
        })

    }
    catch (error) {
        res.status(400).send("ERROR" + error.message)
    }
})

module.exports = userRouter;