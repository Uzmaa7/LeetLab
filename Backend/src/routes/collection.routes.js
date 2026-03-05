import express from "express";
import { createCollection, getAllCollections, getCollectionById, deleteCollection } from "../controllers/collection.controller.js";
import { createCollectionValidator, idValidator } from "../validators/collection.Validators.js";
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

//update collection 

export default collectionRouter;