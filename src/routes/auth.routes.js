import express from "express";
import { loginUser, registerUser, logoutUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";



const authRouter = express.Router();


authRouter.post("/register", registerUser);

authRouter.post("/login", loginUser);

// ======Secured routes=====================//
authRouter.post("/logout", verifyJWT, logoutUser);

// authRouter.get("/check");



export default authRouter;