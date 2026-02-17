import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createGroup, getMyChats } from "../controllers/chat.controller.js";
import { chatValidation } from "../validators/chat.Validators.js";
import { validate } from "../middlewares/validator.middleware.js";

const chatRouter = express.Router();


chatRouter.get("/create-group", verifyJWT, chatValidation(), validate, createGroup);
chatRouter.get("/my-chats", verifyJWT,  getMyChats);

export default chatRouter;