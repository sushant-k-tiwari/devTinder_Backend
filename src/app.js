const express = require("express");
const { connectDB } = require("./config/database");
const { User } = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middlewares/auth");

const app = express();
app.use(express.json());
app.use(cookieParser());

// Signup API
app.post("/signup", async (req, res) => {
  //Creating a new instance of the User Model
  try {
    // Validation of data
    validateSignupData(req);

    const { firstName, lastName, emailId, password, age } = req.body;
    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
      age,
    });
    await user.save();
    res.send("User Added Successfully");
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

// Login API
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      // Add JWT token
      const token = jwt.sign({ _id: user._id }, "sushant@Amazing66", {
        expiresIn: "1d",
      });
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send("User logged in successfully");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

// Profile API
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

// sendConnectionRequest API
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  res.send("Connection Request Sent");
});

connectDB()
  .then(() => {
    console.log("Database is connected");
    app.listen(8000, () => {
      console.log("Server is listening on port 8000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Testing APIs
/**
   * // get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.find({ emailId: userEmail });
    res.send(user);
  } catch (error) {
    res.status(400).send("Something went wrong: " + error.message);
  }
});

// Feed API - GET /feed - Get all the users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Error getting the user: " + error.message);
  }
});

// DELETE API /user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    console.log(userId);
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (error) {
    res.status(400).send("Error deleting the user: " + error.message);
  }
});

// Update the data of the user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "gender", "about", "skills", "age"];
    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed!");
    }
    if (data.skills.lenght > 8) {
      throw new Error("Maximum of 8 skills");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED: " + err.message);
  }
});

app.get("/test", (req, res) => {
  res.send("Hello World");
});
   */
