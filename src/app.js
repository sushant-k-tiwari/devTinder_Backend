const express = require("express");

const app = express();

//GET
app.get("/test/:userId/:name/:age/", (req, res) => {
    // console.log(req.query)
    console.log(req.params)
  res.send("HAHAHAHA this is a get request");
});



app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
