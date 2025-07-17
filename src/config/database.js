const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sushant:tKCfEQNzDtKrcBPe@namastenode.mldjppc.mongodb.net/devTinder"
  );
};



module.exports = {connectDB};
