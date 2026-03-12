import crypto from "crypto";
import Contest from "../models/contest.model.js";
import { ApiError } from "../utils/ApiError.js";

const createContestService = async ({
    title,
    owner,
    questions, 
    durationInMin,
    visibility
}) => {
    let attempts = 0;
    let contestCode;

    // Unique Contest Code Generation
    do {
        // 4 bytes se 8 characters ka hex code banega (e.g., 'a1b2c3d4')
        contestCode = crypto.randomBytes(4).toString("hex");
        attempts++;
        if (attempts > 5) {
            throw new ApiError(500, "Failed to generate a unique contest code. Please try again.");
        }
    } while (await Contest.exists({ contestCode }));

    // Creating the Contest Document
    const contest = await Contest.create({
        contestCode: contestCode,
        owner: owner,
        title: title,
        questions: questions, // Pass the hybrid array [{questionId, isExternal, ...}]
        durationInMin: durationInMin,
        visibility: visibility,
        status: "upcoming"
    });

    if (!contest) {
        throw new ApiError(500, "Error while creating the contest document in DB");
    }

    return contest;
};

export { createContestService };