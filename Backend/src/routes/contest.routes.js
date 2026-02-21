import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createManualContest, endContestResult, getAllContest,  scheduleWeeklyContests} from "../controllers/contest.controller.js";


const contestRouter = express.Router();


// 1. User khud se links daal kar contest banaye
contestRouter.post("/create-manual", verifyJWT, createManualContest);

// 2. Contest end karke result calculate karna
contestRouter.post("/end/:contestId", verifyJWT, endContestResult);

// 3. User ke saare purane contests dekhne ke liye
contestRouter.get("/all-contest", verifyJWT, getAllContest);

// 4. Random 4 questions wala contest (Weekly feature)
contestRouter.post("/generate-weekly", verifyJWT, scheduleWeeklyContests);


export default contestRouter;