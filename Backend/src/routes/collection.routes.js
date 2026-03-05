import express from "express";
import { createCollection } from "../controllers/collection.controller.js";
import { createCollectionValidator } from "../validators/collection.Validators.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";

const collectionRouter = express.Router();


//create collection
collectionRouter.post("/", verifyJWT, createCollectionValidator(), validate,  createCollection);

//get all colections

//get a particular collection

//delete a collection

//update collection 

export default collectionRouter;