import express from "express";

import { createContest, getActiveContests, getCreatedContests, getJoinedContests, getAllContests } from "../controllers/contest.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const contestRouter = express.Router();

contestRouter.post("/",verifyJWT, createContest);

contestRouter.get("/active", verifyJWT, getActiveContests);

contestRouter.get("/created", verifyJWT, getCreatedContests);

contestRouter.get("/joined", verifyJWT, getJoinedContests);

contestRouter.get("/all", verifyJWT, getAllContests)

export default contestRouter;