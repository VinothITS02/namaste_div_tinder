const express = require("express");
const connectionRequestRouter = express.Router();
const { UserAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");


connectionRequestRouter.post("/send/:status/:toUserId", UserAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        const allowedStatus = ["ignored", "interested"];
        const { fromUserIds } = req.user._id;
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status type" })
        }
        // checking if there is already touserId exist
        let toUserFind = await User.findById(toUserId);

        // checking if from userid send request to yourself
        if (toUserFind._id.equals(fromUserId)) {
            return res.status(200).json({ message: "You Can't send request yourself" });
        }

        //if touserId not is not exist 
        if (!toUserFind) {
            return res.status(200).send("To User is not found");
        };
        //check if from user send to same from user
        const connectionExsiting = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });
        if (connectionExsiting) {
            return res.status(200).send("User connection request already exist")
        }
        const data = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });
        await data.save();
        res.json({
            message: "Connection request send successfyly",
            data
        })
    }
    catch (err) {
        res.status(400).send("Error " + err.message)
    }
});

//review the reqeust 
connectionRequestRouter.post("/review/:status/:requestId", UserAuth, async (req, res) => {
    try { 
    const loggedInUser = req.user;
    const toUserId = loggedInUser._id
    const status = req.params.status;
    //check status is allowed
    const allowedStatus = ["accepted","rejected"];
    if(!allowedStatus.includes(status)) return  res.status(400).json({message:"Status not allowed"});
    //connection check 
    const connectionRequest = await ConnectionRequest.findOne({
        _id:req.params.requestId,
        toUserId:toUserId,
        status:"interested"
    });
    if(!connectionRequest) {
        return res.status(404).json({message:"connection not found"});
    }
    connectionRequest.status = status;
     const data = await connectionRequest.save();
     return res.status(200).json({message:"Connection request accepted successfuly",data})
    }
    catch (err) {
        res.status(400).send("Error " + err.message)
    }
})



module.exports = connectionRequestRouter;