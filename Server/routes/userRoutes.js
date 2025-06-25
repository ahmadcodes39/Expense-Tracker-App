import express from "express";
import {
  registerUser,
  validate,
  loginUser,
  forgotPassword,
  updatePassword,
  uploadProfilePic,
  getProfilePic
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", validate, registerUser);
router.post("/login", loginUser);
router.post("/forgotPassword", forgotPassword);
router.post("/upload-profile-pic/:userId", uploadProfilePic);
router.get('/profile-pic/:userId', getProfilePic);
router.put("/update-password/:id", updatePassword);


export default router;
