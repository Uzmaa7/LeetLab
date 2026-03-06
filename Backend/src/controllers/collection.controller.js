import { createCollectionService, getAllCollectionsService } from "../services/collection.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import Collection from "../models/collection.model.js";
import { ApiError } from "../utils/ApiError.js";
import CollectionQuestion from "../models/collectionQuestion.model.js";



const  createCollection = asyncHandler(async(req, res) => {

    const {name, description, isPrivate} = req.body;

    const collection = await createCollectionService({
        createdBy: req.user._id,
        name:name.trim(),
        description: description?.trim() || "",
        isPrivate,

    });

    return res.status(201).json(new ApiResponse(201, collection, "Collection created Successfully"))

    
})

const getAllCollections = asyncHandler(async(req, res) => {

    let { page = 1, limit = 10} = req.query;

    page = Math.max(1, parseInt(page));

    limit = Math.min(10 , Math.max(1, parseInt(limit)));

    const skip = ( page - 1 ) * limit;

    const data = await getAllCollectionsService({
        page,
        limit,
        skip,
        userId: req.user._id,
    })

    const message = data.totalCount === 0 
        ? "You haven't created any collections yet" 
        : "Collections fetched successfully";

    return res.status(200).json(new ApiResponse(200, data, message));


})

const getCollectionById = asyncHandler(async(req, res) => {

    const {collectionId} = req.params;

    const collection = await Collection.findOne({_id : collectionId, createdBy : req.user._id});
    if(!collection){
        throw new ApiError(404, "Collection not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, collection, "Collection fetched"));
})

const deleteCollection = asyncHandler( async (req, res) => {

    const {collectionId} = req.params

    const collection = await Collection.findOneAndDelete({
        _id: collectionId,
        createdBy: req.user._id,
    });

    if (!collection) {
        throw new ApiError(404, "Collection not found");
    }

    // Remove all question links (safe cleanup)
    await CollectionQuestion.deleteMany({ collectionId: collectionId });

    return res
        .status(200)
        .json(new ApiResponse(200, "Collection deleted"));

})

const updateCollection = asyncHandler(async(req, res)=> {

    const {collectionId} = req.params;

    const { name, description, isPrivate } = req.body;

    if(!name && description === undefined && isPrivate === undefined){
        throw new ApiError(400, "Atleast one field is required")
    }

    if (name && !name.trim()) {
        throw new ApiError(400, "Collection name cannot be empty");
    }

    const update = {};

    if(description !== undefined){//if user send empty string to remove desc then it will update 
        update.description = description.trim();
    }
    if(name){
        update.name = name.trim();
        update.nameLower = name.trim().toLowerCase();
    }
    if(isPrivate !== undefined){
        update.isPrivate = isPrivate;
    }

    try {
        const collection = await Collection.findOneAndUpdate(
            {_id : collectionId, createdBy : req.user._id},
            { $set : update},
            { new :  true , runValidators : true}
        )
    
        if(!collection){
            throw new ApiError(404, "Collection not found");
        }
    
        return res
        .status(200)
        .json(new ApiResponse(200,  collection, "Collection updated"));
    } catch (error) {
        if(error.code === 11000){
            throw new ApiError(409, "You already have another collection with this name");
        }
        console.log("Error while updating a collection", error);
        throw new ApiError(500, "Error while updating a collection")
    }


})

const getCollectionQuestions = asyncHandler( async (req, res) => {

    const {collectionId} = req.params

    const collection = await Collection.findOne({
        _id: collectionId,
        createdBy: req.user._id,
    });

    if (!collection) {
        throw new ApiError(404, "Collection not found");
    }

    const questions = await CollectionQuestion.aggregate(
        [
            { 
                $match : {
                    collectionId : new mongoose.Types.ObjectId(collectionId),
                }
            },
            {
                $sort : {
                    order : 1,
                    addedAt : -1
                }
            },
            {
                $lookup : {
                    from: "questions",
                    localField: "questionId",
                    foreignField: "_id",
                    as: "question",
                }
            },
            {
                $unwind : "$question"
            },
            {
                $match : {
                    "question.isDeleted": false
                }
            },
            {
                $project: {
                    _id: 0,
                    order: 1,
                    addedAt: 1,
                    question: 1,
                }
            }
        ]
    )

    return res
        .status(200)
        .json(
            new ApiResponse(200,  {
                collection,
                questions,
            },"Collection questions fetched",)
        );
})

const getPublicCollectionQuestions = asyncHandler(async (req, res) => {
    const { collectionId } = req.params;

    

    const collection = await Collection.findOne({
        _id: collectionId,
        isPrivate: false,
    }).select("name description createdBy");

    if (!collection) {
        throw new ApiError(404, "Collection not found or private");
    }

    const questions = await CollectionQuestion.aggregate(
        [
            { 
                $match : {
                    collectionId : new mongoose.Types.ObjectId(collectionId),
                }
            },
            {
                $sort : {
                    order : 1,
                    addedAt : -1
                }
            },
            {
                $lookup : {
                    from: "questions",
                    localField: "questionId",
                    foreignField: "_id",
                    as: "question",
                }
            },
            {
                $unwind : "$question"
            },
            {
                $match : {
                    "question.isDeleted": false
                }
            },
            {
                $project: {
                    _id: 0,
                    order: 1,
                    addedAt: 1,
                    question: 1,
                }
            }
        ]
    )

    return res.json(
        new ApiResponse(200, {
            collection,
            questions,
        }, "Public collection questions")
    );
});

export {createCollection, getAllCollections, getCollectionById,
deleteCollection, updateCollection, getCollectionQuestions, getPublicCollectionQuestions}