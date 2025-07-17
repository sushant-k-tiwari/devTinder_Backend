const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sushant:tKCfEQNzDtKrcBPe@namastenode.mldjppc.mongodb.net/devTinder",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      tlsInsecure: false,
    }
  );
};

module.exports = { connectDB };
