const express = require("express");
const { connectDB } = require("./config/database");
const { User } = require("./models/user");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  //Creating a new instance of the User Model
  const user = new User(req.body);
  try {
    // //want to add a check for photoUrl so user cannot send any giberish url
    // if (!user.photoUrl.startsWith("https://")) {
    //   throw new Error("Not Secure photoUrl");
    // }
    await user.save();
    res.send("User Added Successfully");
  } catch (error) {
    res.status(400).send("Error saving the user " + error.message);
  }
});

// get user by email
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
