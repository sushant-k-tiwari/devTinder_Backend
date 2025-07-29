const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// const DB_URI = process.env.MONGODB;
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sushant:tKCfEQNzDtKrcBPe@namastenode.mldjppc.mongodb.net/devTinder",
    {
      ssl: true,
      tlsInsecure: false,
    }
  );
};

module.exports = { connectDB };
