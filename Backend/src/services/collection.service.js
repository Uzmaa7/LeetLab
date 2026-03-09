import Collection from "../models/collection.model.js";
import { ApiError } from "../utils/ApiError.js";

const createCollectionService = async ({ createdBy, name, description, isPrivate }) => {
    try {
        return await Collection.create({
            createdBy,
            name,
            nameLower: name.trim().toLowerCase(),
            description,
            isPrivate,
        })
    } catch (error) {
        if (error.code === 11000) {
            throw new ApiError(409, "A collection with this name already exists for you")
        }

        throw new ApiError(500, "Error while creating collection")
    }
}

const getAllCollectionsService = async({
    page,
    limit,
    skip,
    userId,
}) => {

    try {
        const [ allCollections, totalCount] = await Promise.all([
            Collection.find({createdBy: userId})
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
    
            Collection.countDocuments({createdBy: userId})
        ])
    
        return {
            allCollections,
            totalCount,
            totalPages: Math.ceil(totalCount/limit),
            currentPage: page,
        }
    } catch (error) {

        console.error("Critical Database Error:", error.message);

        throw new ApiError(500, "Unable to fetch collections at the moment. Please try later.");
    }
}

export { createCollectionService, getAllCollectionsService };