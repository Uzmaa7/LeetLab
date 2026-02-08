import express from "express";
import { checkAdmin, verifyJWT } from "../middlewares/auth.middleware.js";
import { createProblem , getAllProblems, getProblemById, updateProblem, deleteProblem} from "../controllers/problem.controller.js";

const problemRouter = express.Router();


problemRouter.post("/create-problem", verifyJWT, checkAdmin, createProblem);
problemRouter.get("/get-All-problems", verifyJWT, getAllProblems);
problemRouter.get("/get-problem/:id", verifyJWT, getProblemById);
problemRouter.put("/update-problem/:id", verifyJWT, checkAdmin, updateProblem);
problemRouter.delete("/delete-problem/:id", verifyJWT, checkAdmin, deleteProblem);

export default problemRouter;