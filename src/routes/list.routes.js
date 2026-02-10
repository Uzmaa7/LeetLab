import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createList, getAllLists, getAList, addProblemInList, deleteList, removeProblemFromList } from "../controllers/list.controller.js";

const listRouter = express.Router();

listRouter.get("/", verifyJWT, getAllLists);

listRouter.get("/:listId", verifyJWT, getAList);

listRouter.post("/create-playlist", verifyJWT, createList);

listRouter.post("/:listId/add-problem", verifyJWT, addProblemInList);

listRouter.delete("/:listId", verifyJWT, deleteList);

listRouter.delete("/:listId/remove-problem", verifyJWT, removeProblemFromList);

export default listRouter;