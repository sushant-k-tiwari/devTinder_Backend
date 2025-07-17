const express = require("express");

const app = express();

const { adminAuth } = require("../middlewares/auth");

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data Sent!");
});

app.get("/admin/deleteData", (req, res) => {
  res.send("All Data Deleted!");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
