import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const listRouter = express.Router();

listRouter.get("/", verifyJWT, getAllLists);
listRouter.get("/:listId", verifyJWT, getAList);
listRouter.post("/create-playlist", verifyJWT, creatList);


export default listRouter;