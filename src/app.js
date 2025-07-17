const express = require("express");
const { connectDB } = require("./config/database");

const app = express();
const { User } = require("./models/user");

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Sushant",
    lastName: "Kumar",
    emailId: "sushant@sushant.com",
    password: "123456",
    age: 23,
    gender: "male",
  };
  //Creating a new instance of the User Model
  const user = new User(userObj);
  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (error) {
    res.status(400).send("Error saving the user: ", error.message);
  }
});

app.get("/getUserData", async (req, res)=>{f
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(400).send("Error getting the user: ", error.message);
  }
})
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
