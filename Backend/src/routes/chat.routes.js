import express from "express";


import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createGroup, getMyChats, getMyGroups, addMembers, removeMember, exitGroup, sendAttachment } from "../controllers/chat.controller.js";
import { createGroupChatValidation, addMembersValidation } from "../validators/chat.Validators.js";
import { validate } from "../middlewares/validator.middleware.js";

const chatRouter = express.Router();


chatRouter.post("/create-group", verifyJWT, createGroupChatValidation(), validate, createGroup);

chatRouter.get("/my-chats", verifyJWT,  getMyChats);

chatRouter.get("/my-groups", verifyJWT, getMyGroups);

chatRouter.put("/add-members", verifyJWT, addMembersValidation(), validate, addMembers);

chatRouter.delete("/remove-member", verifyJWT, removeMember);

chatRouter.delete("/exit-group/:id", verifyJWT, exitGroup);

chatRouter.post("/send-attachment", verifyJWT, upload.array("files", 5),  sendAttachment);

export default chatRouter;