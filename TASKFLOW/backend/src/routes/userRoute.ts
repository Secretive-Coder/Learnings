import express from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  updatePassword,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/auth.js";

const userRouter = express.Router();

//PUBLIC LINKS
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

//PRIVATE LINKS
userRouter.get("/me", authMiddleware, getCurrentUser);
userRouter.put("/profile", updateProfile);
userRouter.put("password", updatePassword);

export default userRouter;
