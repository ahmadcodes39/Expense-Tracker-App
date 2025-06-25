import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectToMongo = async () => { 
  try {
    const uri = process.env.MONGOOSE_URI;
    const connection = await mongoose.connect(uri);
    if (connection) {
      console.log("✅ MongoDB Connected Successfully!");
    }
  } catch (error) {
    console.log("❌ MongoDB Connection Failed:", error.message);
  }
};

export default connectToMongo;
