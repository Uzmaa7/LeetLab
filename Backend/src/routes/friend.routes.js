import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { searchUsersInTalkTown, sendRequest, acceptRequest, notification, myfriends } from "../controllers/friend.controller.js";
import { sendRequestValidation, acceptRequestValidation } from "../validators/friend.Validators.js";

const friendRouter = express.Router();

friendRouter.get("/search", verifyJWT, searchUsersInTalkTown)

friendRouter.put("/send-request", verifyJWT, sendRequestValidation(), sendRequest);

friendRouter.put("/accept-request", verifyJWT,  acceptRequestValidation(), acceptRequest);

friendRouter.get("/notification", verifyJWT, notification);

friendRouter.get("/my-friends", verifyJWT, myfriends);
export default friendRouter;
