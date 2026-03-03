import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { uploadQuestion } from "../controllers/question.controller.js";
import { uploadQuestionValidator } from "../validators/question.Validators.js";
import { validate } from "../middlewares/validator.middleware.js";

const questionRouter = express.Router();

questionRouter.post("/", verifyJWT, uploadQuestionValidator(), validate, uploadQuestion);

export default questionRouter;