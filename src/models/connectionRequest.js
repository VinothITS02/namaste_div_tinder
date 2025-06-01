const mongoose = require("mongoose");

const connectionReqeustSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // refreence to the User Models to get based on id we are getting user details
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect type`
        }
    }
}, {
    timestamps: true
});

// connectionReqeustSchema.pre("save",function(next){
//  const connectionRequ = this;
//  if(connectionRequ.fromUserId.equals(connectionRequ.toUserId)) {
//     throw new Error("You can't send connection request yourself")
//  }
//  next()
// })

const ConnectionRequest = mongoose.model("ConnectionRequest", connectionReqeustSchema);
module.exports = ConnectionRequest;



