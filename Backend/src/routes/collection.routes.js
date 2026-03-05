import express from "express";
import { createCollection, getAllCollections } from "../controllers/collection.controller.js";
import { createCollectionValidator } from "../validators/collection.Validators.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";

const collectionRouter = express.Router();


//create collection
collectionRouter.post("/", verifyJWT, createCollectionValidator(), validate,  createCollection);

//get all collections
collectionRouter.get("/", verifyJWT, getAllCollections);

//get a particular collection

//delete a collection

//update collection 

export default collectionRouter;