import { isValidObjectId } from "mongoose";
import Collection from "../models/collection.model.js";
import CollectionQuestion from "../models/collectionQuestion.model.js";
import Question from "../models/question.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



const addQuestionToCollection = asyncHandler(async(req, res) => {

    const {collectionId} = req.params;
    const {questionId} = req.body;

    const collection = await Collection.findOne({
        _id : collectionId,
        createdBy : req.user._id,
    })
    if(!collection){
        throw new ApiError(404, "Collection not found")
    }

    const question = await Question.findOne(
        {
            _id : questionId,
            addedBy : req.user._id,
            isDeleted: false,
        }
    )
    if(!question){
        throw new ApiError(404, "Question not found")
    }

    try {
        await CollectionQuestion.create({
            collectionId,
            questionId,
        })

        await Collection.updateOne(
            {_id : collectionId},
            {$inc : {questionsCount : 1}}
        )
    } catch (error) {
         if (error.code === 11000) {
            throw new ApiError(409, "Question already in this collection");
        }

        throw error;
    }
    return res
        .status(201)
        .json(new ApiResponse(201, {} , "Question added to collection"));
})

const removeQuestionFromCollection = asyncHandler( async (req, res) => {
    const { collectionId, questionId } = req.params;

    const collection = await Collection.findOne({
        _id : collectionId,
        createdBy : req.user._id,
    })
    if(!collection){
        throw new ApiError(404, "Collection not found")
    }

    const removed = await CollectionQuestion.findOneAndDelete({
        collectionId,
        questionId,
    });

    if (!removed) {
        throw new ApiError(404, "Question not found in this collection");
    }

    await Collection.updateOne(
        { _id: collectionId },
        { $inc: { questionsCount: -1 } }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Question removed from collection"));

})

const bulkAddQuestions = asyncHandler(async (req, res) => {
    const { collectionId } = req.params;
    const { questionIds } = req.body;

    // 1. Input Validation
    if (!Array.isArray(questionIds) || questionIds.length === 0) {
        throw new ApiError(400, "questionIds must be a non-empty array");
    }

    const collection = await Collection.findOne({
        _id : collectionId,
        createdBy : req.user._id,
    })
    if(!collection){
        throw new ApiError(404, "Collection not found")
    }

    // 2. Filter Valid IDs & Check Ownership/Existence
    const validIds = questionIds.filter(id => isValidObjectId(id));
    if (validIds.length === 0) {
        throw new ApiError(400, "No valid question IDs provided");
    }

    // Note: This query restricts users to only adding questions they OWN. 
    const validQuestions = await Question.find({
        _id: { $in: validIds },
        addedBy: req.user._id, 
        isDeleted: false,
    }).select("_id");

    if (validQuestions.length === 0) {
        throw new ApiError(404, "No valid questions found to add");
    }

    // 3. Prepare Bulk Docs -> 
    // [
    //  {collectionId: "COL123", questionId: "Q1"},
    //  { collectionId: "COL123", questionId: "Q2" }
    // ]
    const bulkDocs = validQuestions.map((q) => ({
        collectionId,
        questionId: q._id,
    }));

    // 4. Perform Insert (Ignore Duplicates)
    try {
        //insertMany() needs an array of documents. [{}, {}, {}]
        await CollectionQuestion.insertMany(bulkDocs, {
            ordered: false, // Continue inserting even if duplicates are found
        });
    } catch (error) {
        // We catch errors here because 'ordered: false' throws if ANY duplicate is found.
        // We don't care about duplicates, we just want to ensure the unique ones are in.
        // We silence the error to proceed to the count update.
    }

    // 5. THE FIX: Recalculate and Set Absolute Count
    // This is safer than $inc because it corrects any previous drift automatically.
    const currentTotal = await CollectionQuestion.countDocuments({ collectionId });

    await Collection.findByIdAndUpdate(
        collectionId, 
        {$set: { questionsCount: currentTotal }}
    );

    return res.status(200).json(
        new ApiResponse(200,  {
            totalQuestions: currentTotal,
            attempted: bulkDocs.length,
        }, "Bulk add completed"
        )
    );
});

const bulkRemoveQuestions = asyncHandler(async(req, res) => {
     const { collectionId } = req.params;
    const { questionIds } = req.body;

    // 1. Input Validation
    if (!Array.isArray(questionIds) || questionIds.length === 0) {
        throw new ApiError(400, "questionIds must be a non-empty array");
    }

    const collection = await Collection.findOne({
        _id : collectionId,
        createdBy : req.user._id,
    })
    if(!collection){
        throw new ApiError(404, "Collection not found")
    }

    // 2. Filter Valid IDs & Check Ownership/Existence
    const validIds = questionIds.filter(id => isValidObjectId(id));
    if (validIds.length === 0) {
        throw new ApiError(400, "No valid question IDs provided");
    }

    // 4. Perform deleteMany
    const result = await CollectionQuestion.deleteMany({
        collectionId: collectionId,
        questionId: { $in: validIds }
    });

    if (result.deletedCount > 0) {
        await Collection.updateOne(
            { _id: collectionId },
            [
                {
                    $set: {
                        questionsCount: {
                            $max: [{ $subtract: ["$questionsCount", result.deletedCount] },0]
                        }
                    }
                }
            ],
            { updatePipeline: true }
        );

    }


    return res.status(200).json(
        new ApiResponse(200, {
            removed: result.deletedCount,
            attempted: validIds.length,
        }, "Questions removed from collection")
    );
})

const removeAllQuestions = asyncHandler( async (req, res) => {
    const { collectionId } = req.params;

    const collection = await Collection.findOne({
        _id : collectionId,
        createdBy : req.user._id,
    })
    if(!collection){
        throw new ApiError(404, "Collection not found")
    }

    const result = await CollectionQuestion.deleteMany({ collectionId });

    await Collection.updateOne(
        { _id: collectionId },
        { $set: { questionsCount: 0 } }
    );

    return res.status(200).json(
            new ApiResponse(200,{removed: result.deletedCount}, "All questions removed")
    );
})


export {addQuestionToCollection, removeQuestionFromCollection, 
bulkAddQuestions, bulkRemoveQuestions, removeAllQuestions};