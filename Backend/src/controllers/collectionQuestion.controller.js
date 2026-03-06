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

export {addQuestionToCollection, removeQuestionFromCollection};