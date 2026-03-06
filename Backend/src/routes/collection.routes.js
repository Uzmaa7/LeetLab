import express from "express";

import { createCollection, getAllCollections, getCollectionById,
deleteCollection, updateCollection, getCollectionQuestions, getPublicCollectionQuestions  } from "../controllers/collection.controller.js";

import { createCollectionValidator, idValidator, updateCollectionValidator } from "../validators/collection.Validators.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";

const collectionRouter = express.Router();


//create collection
collectionRouter.post("/", verifyJWT, createCollectionValidator(), validate,  createCollection);

//get all collections
collectionRouter.get("/", verifyJWT, getAllCollections);

//get a particular collection
collectionRouter.get("/:collectionId", verifyJWT, idValidator(), validate, getCollectionById);

//delete a collection
collectionRouter.delete("/:collectionId", verifyJWT, idValidator(), validate, deleteCollection);

//update a collection 
collectionRouter.patch("/:collectionId", verifyJWT, idValidator(), updateCollectionValidator(),  validate, updateCollection);

//fetch all questions of a particular collection
collectionRouter.get("/:collectionId/questions",verifyJWT, idValidator(), validate, getCollectionQuestions);

//fetch all questions of a public collection 
collectionRouter.get("/public/:collectionId/questions", verifyJWT, idValidator(), validate, getPublicCollectionQuestions);

export default collectionRouter;