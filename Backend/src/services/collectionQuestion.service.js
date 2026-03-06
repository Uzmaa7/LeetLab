import Collection from "../models/collection.model.js"
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";


const validateCollection =  async (collectionId, userId) => {

    if(!isValidObjectId(collectionId)){
        throw new ApiError(400, "Invalid collection ID");
    }

    const collection = await Collection.findOne(
        {
            _id : collectionId,
            createdBy : userId
        }
    )

    if (!collection) {
        throw new ApiError(404, "Collection not found");
    }

    return collection;
}


export {
    validateCollection
}