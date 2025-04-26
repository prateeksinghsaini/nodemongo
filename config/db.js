const mongoose = require("mongoose");
const dbURI =
  "mongodb+srv://prateek25:Mypassword123@study.0r4h32o.mongodb.net/?retryWrites=true&w=majority&appName=study";

const connectDB = async () => {
  try {
    if (!dbURI) {
      throw new Error("MongoDB URI is not defined");
    }

    await mongoose.connect(dbURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectDB;
