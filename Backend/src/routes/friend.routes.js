import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { searchUsersInTalkTown, sendRequest } from "../controllers/friend.controller.js";
import { sendRequestValidation } from "../validators/friend.Validators.js";

const friendRouter = express.Router();

friendRouter.get("/search", verifyJWT, searchUsersInTalkTown)

friendRouter.put("/send-request", verifyJWT, sendRequestValidation(), sendRequest);

export default friendRouter;
