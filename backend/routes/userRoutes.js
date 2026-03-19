import express from "express";
import {
  getAllUsers,
  registerUser,
  verifyOTP,
} from "../controller/userController.js";
export const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/otpVerification", verifyOTP);
authRoutes.get("/get-all-users", getAllUsers);
