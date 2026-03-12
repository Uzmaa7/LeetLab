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

const getJoinedContests = asyncHandler(async (req, res) => {
    const { page, limit } = req.query;
     const p = Math.max(1, Number(page));
    const l = Math.min(50, Number(limit));
 
    const skip =  (p - 1) * l;

    const basePipeline = [
        { $match: { userId: req.user._id } },
        {
            $lookup: {
                from: "contests",
                localField: "contestId",
                foreignField: "_id",
                as: "contest"
            }
        },
        {   $unwind: "$contest" },
        {
            $match: { "contest.owner": { $ne: req.user._id } }
        }
    ];

    const [data, countResult] = await Promise.all([
        ContestParticipant.aggregate([
            ...basePipeline,
            { $sort: { joinedAt: -1 } },
            { $skip: skip },
            { $limit: l },
            {
                $project: {
                    _id: "$contest._id",
                    title: "$contest.title",
                    status: "$contest.status",
                    startsAt: "$contest.startsAt",
                    endsAt: "$contest.endsAt",
                    visibility: "$contest.visibility"
                }
            }
        ]),

        ContestParticipant.aggregate([
            ...basePipeline,
            { $count: "total" }
        ])
    ]);
    const total = countResult[0]?.total || 0;

    return res.json(
        new ApiResponse(200, {
        contests: data,
        meta: {
            page: p,
            limit: l,
            total,
            pages: Math.ceil(total / l)
        }
        }, "Joined contests")
    );
});


const getAllContests = asyncHandler(async (req, res) => {
    const { page, limit, status } = req.query;
     const p = Math.max(1, Number(page));
    const l = Math.min(50, Number(limit));
 
    const skip =  (p - 1) * l;

    // 1. Get IDs of contests the user is participating in (Lightweight query)
    const participatedContestIds = await ContestParticipant.find({ 
        userId: req.user._id 
    }).distinct('contestId');

    // 2. Build filter: Created by Me OR Joined by Me
    const matchStage = {
        $or: [
            { owner: req.user._id },                     // Created by user
            { _id: { $in: participatedContestIds } }     // Joined by user
        ]
    };

    // Add optional status filter if provided (e.g., ?status=live)
    if (status) {
        matchStage.status = status;
    }

    // 3. Fetch Data & Count in parallel
    const [contests, total] = await Promise.all([
        Contest.find(matchStage)
            .select("title status startsAt endsAt visibility") // Only fetch needed fields
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(l)
            .lean(), // Convert to plain JS objects (faster)
        Contest.countDocuments(matchStage)
    ]);

    return res.status(200).json(
        new ApiResponse(200, {
            contests,
            meta: {
                page: p,
                limit: l,
                total,
                pages: Math.ceil(total / l)
            }
        }, "All my contests fetched successfully")
    );
});

const getActiveContests = asyncHandler(async (req, res) => {

    const { page, limit } = req.query;
     const p = Math.max(1, Number(page));
    const l = Math.min(50, Number(limit));
 
    const skip =  (p - 1) * l;

    // 1. Get IDs of contests the user is participating in
    const participatedContestIds = await ContestParticipant.find({ 
        userId: req.user._id 
    }).distinct('contestId');

    // 2. Create a filter that matches:
    // (Created by Me OR Participated by Me) AND (Is Active)
    const filter = {
        $and: [
            {
                $or: [
                    { owner: req.user._id },                     // Created by user
                    { _id: { $in: participatedContestIds } }     // Participated by user
                ]
            },
            { status: { $in: ["upcoming", "live"] } }           // Must be active
        ]
    };
    
    const [contests, total] = await Promise.all([
        Contest.find(filter)
        .select("title status startsAt endsAt visibility")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(l),
        Contest.countDocuments(filter)
    ]);

    return res.json(
        new ApiResponse(200, {
        contests,
        meta: {
            page: p,
            limit: l,
            total,
            pages: Math.ceil(total / l)
        }
        }, "Active contests")
    );
});


// (host starts contest globally)



export {createContest, getCreatedContests, getJoinedContests, getAllContests, getActiveContests};