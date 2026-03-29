import express from "express";
import { loginUser, registerUser, logoutUser, changePassword, refreshAccessToken, check, updateAvatar } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registrationValidation, loginValidation ,changePasswordValidation} from "../validators/auth.Validators.js";
import { validate } from "../middlewares/validator.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";



const authRouter = express.Router();


authRouter.post("/register", registrationValidation() ,validate ,registerUser);

authRouter.post("/login", loginValidation(), validate,  loginUser);


// ======Secured routes=====================//
authRouter.post("/logout", verifyJWT, logoutUser);

authRouter.post("/refresh-token", refreshAccessToken);

authRouter.get("/check", verifyJWT, check);
authRouter.post("/change-password", verifyJWT, changePasswordValidation(), validate, changePassword);
// authRouter.get("/check");

authRouter.patch('/update-avatar', verifyJWT,  upload.single("avatar"), updateAvatar);


export default authRouter;