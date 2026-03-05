import { createCollectionService, getAllCollectionsService } from "../services/collection.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js"

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

export {createCollection, getAllCollections}