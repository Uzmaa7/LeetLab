import express from "express";
import { registerUser } from "../controllers/auth.controller.js";



const authRouter = express.Router();


authRouter.post("/register", registerUser);

// authRouter.post("/login");

// authRouter.post("/logout");

// authRouter.get("/check");



export default authRouter;