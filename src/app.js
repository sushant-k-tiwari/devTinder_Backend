const express = require("express");

const app = express();

//GET
app.get(
  "/test/",
  (req, res, next) => {
    console.log("1st middleware");
    // res.send("HAHAHAHA this is a get request");
    next();
  },
  (req, res, next) => {
    console.log("2nd middleware");
    // res.send("2nd middleware");
    next();
  },
  (req, res, next) => {
    console.log("3rd middleware");
    // res.send("3rd middleware");
    next();
  },
  (req, res, next) => {
    console.log("4th middleware");
    // res.send("4th middleware");
    next();
  },
  (req, res, next) => {
    console.log("5th middleware");
    res.send("5th middleware");
  }
);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
