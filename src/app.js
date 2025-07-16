const express = require("express");

const app = express();

// app.use("/test", (req, res) => {
//   res.send("Hello from the other side");
// });

//GET
app.get("/test", (req, res) => {
  res.send("HAHAHAHA this is a get request");
});

//POST
app.post("/test", (req, res) => {
  res.send({firstName : "Sushant", lastName : "Tiwari"});
});

//DELETE
app.delete("/test", (req, res) => {
  res.send("This is a delete request");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
