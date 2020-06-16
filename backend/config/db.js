require("dotenv").config();

const mongoose = require("mongoose");

const url = process.env.NODE_DATABASE;

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      ssl: false,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err.message);
    return process.exit(1);
  }
};

module.exports = connectDB;
