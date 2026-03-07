import { api } from "./api.services";
import axios from "axios";

export const uploadQuestionService = async (questionData) => {
    try {
        const response = await api.post("/questions", questionData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getAllQuestionsService = async (params = {}) => {
    try {
        // params mein difficulty, platform, topic filters bhej sakte hain
        const response = await api.get("/questions", { params });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getQuestionByIdService = async (id) => {
    try {
        const response = await api.get(`/questions/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};



/**
 * Update an existing question
 * @param {string} questionId - The ID of the question to update
 * @param {object} updateData - Object containing title, difficulty, or platform
 */
export const updateQuestionService = async (questionId, updateData) => {
    try {
        const response = await api.patch(`/questions/${questionId}`, updateData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Delete a question (Soft delete handled by backend)
 * @param {string} questionId - The ID of the question to delete
 */
export const deleteQuestionService = async (questionId) => {
    try {
        const response = await api.delete(`/questions/${questionId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};



