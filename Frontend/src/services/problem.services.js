import axios from "axios";
import { api } from "./api.services";

export const getAllProblemsService = async() => {
// Saari problems lane ke liye (Used in Dashboard)

    try {
        const response = await api.get("/problems/get-All-problems");
        return response.data; // Backend se { success, problems, message } aayega
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const createProblemService = async (problemData) => {
    try {
        const response = await api.post("/problems/create-problem", problemData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


// Existing createProblemService...

// export const updateProblemService = async (id, problemData) => {
//     try {
//         const response = await api.put(`/problems/update-problem/${id}`, problemData);
//         return response.data;
//     } catch (error) {
//         throw error.response?.data || error.message;
//     }
// };

export const deleteProblemService = async (id) => {
    try {
        const response = await api.delete(`/problems/delete-problem/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getSolvedProblemsService = async () => {
    try {
        const response = await api.get("/problems/get-solved-problems");
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};