import { createCollectionService } from "../services/collection.service.js";
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

export {createCollection}