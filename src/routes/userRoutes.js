const express = require("express");
const userRouter = express.Router();
const { UserAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_GET_FIELDS = `firstName lastName gender age sjobTitle`

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
});

//get all connection for binding in feed api
userRouter.get("/feed", UserAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const page = req.query.page || 1;
        let limit = req.query.limit || 2;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;
        // get all connection request 
        const connections = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        })
            .select("fromUserId toUserId");
        const hideUserFormID = new Set();
        connections.forEach((items) => {
            hideUserFormID.add(items.fromUserId.toString());
            hideUserFormID.add(items.toUserId.toString());
        });
        const UserDetails = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUserFormID) } },
                { _id: { $ne: loggedInUser._id } }
            ]
        })
            .select(USER_GET_FIELDS)
            .skip(skip)
            .limit(limit)
        res.status(200).json({ data: UserDetails })

    } catch (error) {
        res.status(400).send("ERROR" + error.message)
    }
})

module.exports = userRouter;