import express from "express";
import { checkAdmin, verifyJWT } from "../middlewares/auth.middleware.js";
import { createProblem } from "../controllers/problem.controller.js";

const problemRouter = express.Router();


problemRouter.post("/create-problem", verifyJWT, checkAdmin, createProblem);





export default problemRouter;