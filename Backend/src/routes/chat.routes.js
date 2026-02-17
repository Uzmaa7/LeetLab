import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createGroup, getMyChats, getMyGroups } from "../controllers/chat.controller.js";
import { createGroupChatValidation } from "../validators/chat.Validators.js";
import { validate } from "../middlewares/validator.middleware.js";

const chatRouter = express.Router();


chatRouter.get("/create-group", verifyJWT, createGroupChatValidation(), validate, createGroup);
chatRouter.get("/my-chats", verifyJWT,  getMyChats);
chatRouter.get("/my-groups", verifyJWT, getMyGroups);

export default chatRouter;