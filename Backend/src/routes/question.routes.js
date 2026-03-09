import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { deleteQuestion, getAllQuestions, getQuestionById, uploadQuestion, updateQuestion } from "../controllers/question.controller.js";
import { getAllQuestionsValidator, idValidator, uploadQuestionValidator, updateQuestionValidator } from "../validators/question.Validators.js";
import { validate } from "../middlewares/validator.middleware.js";

const questionRouter = express.Router();

questionRouter.post("/", verifyJWT, uploadQuestionValidator(), validate, uploadQuestion);

questionRouter.get("/", verifyJWT, getAllQuestionsValidator(), validate, getAllQuestions);

questionRouter.get("/:questionId", verifyJWT, idValidator(), validate, getQuestionById);

questionRouter.delete("/:questionId", verifyJWT,idValidator(),  validate,  deleteQuestion);
   
questionRouter.patch("/:questionId", verifyJWT, idValidator(), updateQuestionValidator() ,validate,updateQuestion);
export default questionRouter;