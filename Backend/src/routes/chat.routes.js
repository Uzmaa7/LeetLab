import express from "express";


import { verifyJWT } from "../middlewares/auth.middleware.js";

import { createGroup, getMyChats, getMyGroups, addMembers, removeMember, exitGroup, 
sendAttachment, getChatDetails, renameChat, deleteChat, getMessage } from "../controllers/chat.controller.js";

import { createGroupChatValidation, addMembersValidation, removeMemberValidation, chatIdValidation, 
    sendAttachmentValidation, renameChatValidation
 } from "../validators/chat.Validators.js";

import { validate } from "../middlewares/validator.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const chatRouter = express.Router();


chatRouter.post("/create-group", verifyJWT, createGroupChatValidation(), validate, createGroup);

chatRouter.get("/my-chats", verifyJWT,  getMyChats);

chatRouter.get("/my-groups", verifyJWT, getMyGroups);

chatRouter.put("/add-members", verifyJWT, addMembersValidation(), validate, addMembers);

chatRouter.delete("/remove-member", verifyJWT, removeMemberValidation(), validate, removeMember);

chatRouter.delete("/exit-group/:id", verifyJWT, chatIdValidation(), validate,  exitGroup);

chatRouter.post("/send-attachment", verifyJWT, sendAttachmentValidation, validate, upload.array("files", 5),  sendAttachment);

chatRouter.get("/message/:id", verifyJWT, chatIdValidation(), validate, getMessage);


//get chat -> details, rename, delete
chatRouter.route("/:id")
.get(chatIdValidation(), validate, getChatDetails)
.put(renameChatValidation(), validate, renameChat)
.delete(chatIdValidation(), validate, deleteChat);

export default chatRouter;