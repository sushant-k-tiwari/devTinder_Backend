const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const DB_URI = process.env.mongoDB;
const connectDB = async () => {
  await mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    tlsInsecure: false,
  });
};

module.exports = { connectDB };
