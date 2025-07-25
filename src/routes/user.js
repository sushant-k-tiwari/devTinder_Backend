const express = require("express");
const { userAuth } = require("../../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const { User } = require("../models/user");
const userRouter = express.Router();

const SAFE_USER_DATA = "firstName lastName photoUrl age gender about skills";

//GET all the pending connection requests for logged in user
userRouter.get("/user/requests", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", SAFE_USER_DATA);
    // }).populate("fromUserId", ["firstName", "lastName"]);

    res.json({
      message: "Pending Connection Requests",
      data: connectionRequests,
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

// GET connections to see all the accepted connections user has
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const loggedInUserId = user._id;

    const connections = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUserId, status: "accepted" },
        { toUserId: loggedInUserId, status: "accepted" },
      ],
    })
      .populate("fromUserId", SAFE_USER_DATA)
      .populate("toUserId", SAFE_USER_DATA);

    const data = connections.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUserId.toString()) {
        return row.toUserId;
      } else {
        return row.fromUserId;
      }
    });

    res.json({
      message: "Connections",
      data,
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

// GET feed API
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const loggedInUserId = user._id;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit > 50 ? 50 : limit;
    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUserId }, { toUserId: loggedInUserId }],
    });

    const hideUsersFromFeed = new Set();
    connectionRequest.forEach((row) => {
      hideUsersFromFeed.add(row.fromUserId.toString());
      hideUsersFromFeed.add(row.toUserId.toString());
    });
    // console.log(hideUsersFromFeed);
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        {
          _id: { $ne: loggedInUserId },
        },
      ],
    })
      .select(SAFE_USER_DATA)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({ message: "Feed Data", data: users });
  } catch (error) {
    res.json({ message: "ERROR: " + error.message });
  }
});

module.exports = userRouter;
