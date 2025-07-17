const mongoose = require("mongoose");
require("dotenv").config();

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
