const express = require("express");

const app = express();

app.use("/getData", (req, res) => {
  try {
    // Logic and DB calls
    throw new Error("Something went wrong");
  } catch (error) {
    // console.log(error);
    res.status(500).send("Something went wrong contact support team!");
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
