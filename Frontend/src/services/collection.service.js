import { api } from "./api.services";

// ==========================================
// 1. COLLECTION ROUTER (Base: /collections)
// ==========================================


// Create a new collection
export const createCollectionService = async (data) => {
    // data: { name, description, isPrivate }
    const response = await api.post("/collections", data);
    return response.data;
};

// Get all collections (with pagination)
export const getAllCollectionsService = async (page = 1, limit = 10) => {
    const response = await api.get(`/collections?page=${page}&limit=${limit}`);
    return response.data;
};

// Get a particular collection detail by ID
export const getCollectionByIdService = async (collectionId) => {
    const response = await api.get(`/collections/${collectionId}`);
    return response.data;
};

// Delete a collection
export const deleteCollectionService = async (collectionId) => {
    const response = await api.delete(`/collections/${collectionId}`);
    return response.data;
};

// Update a collection
export const updateCollectionService = async (collectionId, data) => {
    const response = await api.patch(`/collections/${collectionId}`, data);
    return response.data;
};

// Fetch questions of a PARTICULAR collection
export const getCollectionQuestionsService = async (collectionId) => {
    const response = await api.get(`/collections/${collectionId}/questions`);
    return response.data;
};

// Fetch questions of a PUBLIC collection
export const getPublicCollectionQuestionsService = async (collectionId) => {
    const response = await api.get(`/collections/public/${collectionId}/questions`);
    return response.data;
};


// ========================================================
// 2. COLLECTION-QUESTION ROUTER (Base: /collectionQuestions)
// ========================================================


// Add a SINGLE question to collection
export const addQuestionToCollectionService = async (collectionId, questionId) => {
    const response = await api.post(`/collectionQuestions/${collectionId}/questions`, { questionId });
    return response.data;
};

//Bulk add questions to the collection
export const bulkAddQuestionsService = async (collectionId, questionIdsArray) => {
    // Backend: POST /:collectionId/questions/bulk
    // Body: { questionIds: [...] }
    const response = await api.post(`/collectionQuestions/${collectionId}/questions/bulk`, { 
        questionIds: questionIdsArray 
    });
    return response.data;
};

//Bulk remove questions to the collection
export const bulkRemoveQuestionsService = async (collectionId, questionIdsArray) => {
    // Backend: DELETE /:collectionId/questions/bulk
    // Body: { questionIds: [...] }
    // Axios DELETE requires body inside 'data' key
    const response = await api.delete(`/collectionQuestions/${collectionId}/questions/bulk`, { 
        data: { questionIds: questionIdsArray } 
    });
    return response.data;
};

// REMOVE ALL questions from a collection
export const removeAllQuestionsService = async (collectionId) => {
    const response = await api.delete(`/collectionQuestions/${collectionId}/questions`);
    return response.data;
};

// REMOVE a SINGLE question from collection
export const removeSingleQuestionService = async (collectionId, questionId) => {
    const response = await api.delete(`/collectionQuestions/${collectionId}/questions/${questionId}`);
    return response.data;
};