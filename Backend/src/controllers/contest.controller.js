import Collection from "../models/collection.model.js";
import mongoose, { isValidObjectId } from 'mongoose'
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { createContestService } from "../services/contest.service.js";
import { createContestParticipantService } from "../services/contestParticipant.services.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import Contest from "../models/contest.model.js";
import { ContestParticipant } from "../models/contestParticipants.model.js";



const createContest = asyncHandler(async (req, res) => {
    // collectionId is now optional, added directQuestions and externalQuestions
    const { 
        title, 
        durationInMin, 
        visibility, 
        collectionId, 
        questionCount, 
        directQuestionIds, // Array of platform Question ObjectIds
        externalQuestions  // Array of {url, title, platform}
    } = req.body;

    const duration = Number(durationInMin);
    if (Number.isNaN(duration) || duration <= 0) {
        throw new ApiError(400, "Valid duration is required");
    }

    let finalQuestions = [];

    // SCENARIO 1: Questions from a Collection (Randomly picked)
    if (collectionId) {
        if (!isValidObjectId(collectionId)) throw new ApiError(400, "Invalid collection ID");

        const qCount = Number(questionCount) || 0;
        
        const collection = await Collection.findOne({ _id: collectionId, createdBy: req.user._id });
        if (!collection) throw new ApiError(404, "Collection not found");

        const pickedIds = await collection.getRandomQuestionIds(qCount);
        pickedIds.forEach(id => {
            finalQuestions.push({ questionId: id, isExternal: false });
        });
    }

    // SCENARIO 2: Questions selected directly from platform
    if (directQuestionIds && Array.isArray(directQuestionIds)) {
        directQuestionIds.forEach(id => {
            if (isValidObjectId(id)) {
                finalQuestions.push({ questionId: id, isExternal: false });
            }
        });
    }

    // SCENARIO 3: External Links pasted by user
    if (externalQuestions && Array.isArray(externalQuestions)) {
        externalQuestions.forEach(q => {
            finalQuestions.push({
                isExternal: true,
                externalUrl: q.url,
                externalTitle: q.title || "External Problem",
                externalPlatform: q.platform || "other"
            });
        });
    }

    if (finalQuestions.length === 0) {
        throw new ApiError(400, "At least one question is required to create a contest");
    }

    // Create the Contest
    const contest = await createContestService({
        title,
        owner: req.user._id,
        questions: finalQuestions, // Use the new hybrid array
        durationInMin: duration,
        visibility
    });

    // Create the Participant Entry (Host)
    // We initialize questionsStatus so the UI knows what needs to be solved
    const initialQuestionsStatus = finalQuestions.map(q => ({
        questionIdOrUrl: q.isExternal ? q.externalUrl : q.questionId.toString(),
        isSolved: false
    }));

    await createContestParticipantService({
        contestId: contest._id,
        userId: req.user._id,
        joinedAt: new Date(),
        questionsStatus: initialQuestionsStatus
    });

    return res.status(201).json(
        new ApiResponse(201, contest ,"Contest created successfully")
    );
});

const getCreatedContests = asyncHandler(async (req, res) => {
    const { page, limit } = req.query;
    const p = Math.max(1, Number(page));
    const l = Math.min(50, Number(limit));
 
    const skip =  (p - 1) * l;

    const [contests, total] = await Promise.all([
        Contest.find({ owner: req.user._id})
            .select("title status startsAt endsAt visibility")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(l),
        Contest.countDocuments({ owner: req.user._id })
    ]);

    return res.json(
        new ApiResponse(200,  contests, {
       
        meta: {
            page: p,
            limit: l,
            total,
            pages: Math.ceil(total / l)
        }
        }, "Created contests")
    );
});


// (host starts contest globally)



export {createContest, getCreatedContests, getJoinedContests, getAllContests, getActiveContests};