const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// const DB_URI = process.env.MONGODB;
const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    tlsInsecure: false,
  });
};

module.exports = { connectDB };
