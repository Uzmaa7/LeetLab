// import axios from "axios";
// import { api } from "./api.services";

// /**
//  * Sends code for execution against test cases
//  * @param {Object} payload - { source_code, language_id, stdin, expected_outputs, problemId }
//  */
// export const executeCodeService = async (payload) => {
//     try {
//         const response = await api.post("/execute-code", payload);
//         return response.data; // Returns { success, message, submission }
//     } catch (error) {
//         throw error.response?.data || error.message;
//     }
// };


// export const getProblemByIdService = async (id) => {
//     try {
//         const response = await api.get(`/problems/get-problem/${id}`);
//         return response.data;
//     } catch (error) {
//         throw error.response?.data || error.message;
//     }
// };