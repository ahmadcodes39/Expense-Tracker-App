import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import nodemailer from "nodemailer";

dotenv.config();

export const validate = [
  body("name").isLength({ min: 3 }).withMessage("minimum name length is 3"),
  body("email").isEmail().withMessage("Incorrect Email"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("password should be 3 characters long"),
];

export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "This email already exist" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
    });
    return res.status(200).json({ message: "Registered successfully", newUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Registration Fails", details: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });

  } catch (error) {
    res.status(500).json({ error: "Login Failed", details: error.message });
  }
};


//  this function is used to verify token and make protected route secure
export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(400)
        .json({ error: "Access Denied: No Token provided" });
    }
    console.log("Extracted Token:", token); // Debugging

    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next(); // move to the next middleware or route
  } catch (error) {
    res.status(401).json({ error: "Invalid Token" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User with this email not exist" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: "Password Reset Request",
      html: `<p>You requested a password reset. Click <a href="${process.env.RESET_URL}/${user._id}/${resetToken}">here</a> to reset your password.</p>
             <p style='color:red'> It will Expires in 15 min</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({message:"Reset Password link is shared with your email"})
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to process request", details: error.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.resetPasswordExpires<Date.now()) {
      return res.status(400).json({error:"Token time expires try it by generating new token "})
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    user.password = hashPassword;
    await user.save();

    res.status(200).json({ message: "password updated successfullt", user });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to process request", details: error.message });
  }
};

export const uploadProfilePic = async(req,res)=>{
  try {
    const {userId} = req.params
    const {pic} = req.body
    const user = await User.findById(userId)
    if (user) {
      user.profilePic = pic      
      await user.save();
    }
    res.status(200).json({message:"Image uploaded successfully..."})
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to process request", details: error.message });
  }
}

export const getProfilePic = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (user && user.profilePic) {
      res.status(200).json({ message: "Profile picture found",profilePic: user.profilePic });
    } else if (user && !user.profilePic) {
      res.status(404).json({ message: "Profile picture not found" });
    } else {
      res.status(404).json({ message: "User not found" });
    }

  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch profile picture",
      details: error.message
    });
  }
};
