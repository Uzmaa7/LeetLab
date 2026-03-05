import Collection from "../models/collection.model.js";
import {ApiError} from "../utils/ApiError.js";

const createCollectionService = async ({createdBy, name, description, isPrivate}) => {
    try {
        return await Collection.create({
            createdBy,
            name,
            nameLower: name.trim().toLowerCase(),
            description,
            isPrivate,
        })
    } catch (error) {
        if(error.code === 11000){
            throw new ApiError(409, "A collection with this name already exists for you")
        }

        throw new ApiError(500, "Error while creating collection")
    }
}

export {createCollectionService};