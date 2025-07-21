const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const { User } = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid Status type: " + status });
      }

      const checkUser = await User.findById(toUserId);
      if (!checkUser) {
        return res.status(404).json({ message: "User not found!!!" });
      }

      // IF there is an existing connection request
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(400).json({
          message:
            "You have already sent a connection request to " +
            checkUser.firstName,
        });
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      if (status === "interested") {
        res.json({
          message:
            req.user.firstName + " is " + status + " in " + checkUser.firstName,
          data,
        });
      } else {
        res.json({
          message:
            req.user.firstName + " has " + status + " " + checkUser.firstName,
          data,
        });
      }
    } catch (error) {
      res.status(400).send("ERROR: " + error.message);
    }
  }
);

module.exports = requestRouter;
