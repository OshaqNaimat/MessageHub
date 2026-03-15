import express from "express";
import { registerUser } from "../controller/userController.js";
export const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
