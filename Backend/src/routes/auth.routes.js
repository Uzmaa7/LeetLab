import express from "express";
import { loginUser, registerUser, logoutUser, refreshAccessToken, check } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registrationValidation } from "../validators/auth.Validators.js";
import { validate } from "../middlewares/validator.middleware.js";



const authRouter = express.Router();


authRouter.post("/register", registrationValidation() ,validate ,registerUser);

authRouter.post("/login", loginUser);


// ======Secured routes=====================//
authRouter.post("/logout", verifyJWT, logoutUser);
authRouter.post("/refresh-token", refreshAccessToken);
authRouter.get("/check", verifyJWT, check);
// authRouter.get("/check");



export default authRouter;