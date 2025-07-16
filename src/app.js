const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("Hello from the other side");
});

app.get("/profile", (req, res)=>{
  res.send("Namaste from the profile side");
})

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
