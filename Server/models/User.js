import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  profilePic:{
    type:String
  },
  name: {
    type: String,
    required: true,
  },
  email: { 
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    default: "PKR",
  },
  resetPasswordToken: {
    type: String, 
  },
  resetPasswordExpires: {
    type: Date, 
  },
});

export default mongoose.model("User", UserSchema);
