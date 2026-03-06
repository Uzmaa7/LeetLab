import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import { addQuestionToCollectionValidator, idValidator } from "../validators/collection.Validators.js";
import { addQuestionToCollection, removeQuestionFromCollection } from "../controllers/collectionQuestion.controller.js";

const collectionQuestionRouter = express.Router();



//add a question  the collection
collectionQuestionRouter.post("/:collectionId/questions",verifyJWT, addQuestionToCollectionValidator(), validate, addQuestionToCollection);

//remove a question from collection
collectionQuestionRouter.delete("/:collectionId/questions/:questionId",verifyJWT, idValidator(), validate, removeQuestionFromCollection);

//bull add question

//bulk remove question

//remove all questions from the collection



 
export default collectionQuestionRouter;