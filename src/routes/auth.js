const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { validateSignupData } = require("../utils/validation");

authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignupData(req);

    const { firstName, lastName, emailId, password } = req.body;
    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    const token = await savedUser.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    
    res.json({ message: "User Added Successfully", data: savedUser });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = user.passwordValidation(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token);
      res.send(user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  //   res.cookie("token", null , {
  //     expires: new Date(Date.now()),
  //   });
  //   res.send("User logged out successfully");
  res.clearCookie("token").send("User logged out successfully!!");
});

module.exports = authRouter;
