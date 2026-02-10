import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAllSubmission, getAllTheSubmissionsForProblem, getSubmissionForProblem } from "../controllers/submission.controller.js";


const submissionRouter = express.Router();

submissionRouter.get("/get-all-submissions", verifyJWT, getAllSubmission);
submissionRouter.get("/get-submission/:problemId", verifyJWT, getSubmissionForProblem);
submissionRouter.get("/get-submissions-counts/:problemId", verifyJWT, getAllTheSubmissionsForProblem);

export default submissionRouter;