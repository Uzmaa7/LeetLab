import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createManualContest, endContestResult, getAllContest,  scheduleWeeklyContests} from "../controllers/contest.controller.js";
import { endContestResultValidation } from "../validators/contest.Validators.js";
import validate from "../middlewares/validator.middleware.js";


const contestRouter = express.Router();


// 1. User khud se links daal kar contest banaye
contestRouter.post("/create-manual", verifyJWT, createManualContest);

// 2. Contest end karke result calculate karna
contestRouter.post("/end/:contestId", verifyJWT,endContestResultValidation, validate, endContestResult);

// 3. User ke saare purane contests dekhne ke liye
contestRouter.get("/all-contest", verifyJWT, getAllContest);

// 4. Random 4 questions wala contest (Weekly feature)
contestRouter.post("/generate-weekly", verifyJWT, scheduleWeeklyContests);

// 5. when user clicked on a particular contest he will be able to see all 4questions and their status
contestRouter.get("/:id", verifyJWT, getAContestDetails)

//6. get active contests
contestRouter.get("/active-contest", verifyJWT, getActiveContest)

//7. user can update his leetcodeusername
contestRouter.patch("/update-leetcode-username", verifyJWT, updateLeetcodeUsername);


export default contestRouter;