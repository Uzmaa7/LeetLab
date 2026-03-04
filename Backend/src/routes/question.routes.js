import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAllQuestions, uploadQuestion } from "../controllers/question.controller.js";
import { getAllQuestionsValidator, uploadQuestionValidator } from "../validators/question.Validators.js";
import { validate } from "../middlewares/validator.middleware.js";

const questionRouter = express.Router();

questionRouter.post("/", verifyJWT, uploadQuestionValidator(), validate, uploadQuestion);

questionRouter.get("/", verifyJWT, getAllQuestionsValidator(), validate, getAllQuestions);

export default questionRouter;