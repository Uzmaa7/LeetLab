import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import { addQuestionToCollectionValidator, idValidator, bulkAddQuestionsValidator } from "../validators/collection.Validators.js";
import { addQuestionToCollection, bulkAddQuestions, removeQuestionFromCollection, bulkRemoveQuestions } from "../controllers/collectionQuestion.controller.js";

const collectionQuestionRouter = express.Router();



//add a question  the collection
collectionQuestionRouter.post("/:collectionId/questions",verifyJWT, addQuestionToCollectionValidator(), validate, addQuestionToCollection);

//bulk add question
collectionQuestionRouter.post("/:collectionId/questions/bulk", verifyJWT, idValidator(), bulkAddQuestionsValidator(), validate, bulkAddQuestions);

//bulk remove question
collectionQuestionRouter.delete("/:collectionId/questions/bulk", verifyJWT, idValidator(), bulkAddQuestionsValidator(), validate, bulkRemoveQuestions)

//remove a question from collection
collectionQuestionRouter.delete("/:collectionId/questions/:questionId",verifyJWT, idValidator(), validate, removeQuestionFromCollection);

//remove all questions from the collection



 
export default collectionQuestionRouter;