import express from "express";
import { registerUser, verifyOTP } from "../controller/userController.js";
export const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/otp-verification", verifyOTP);
