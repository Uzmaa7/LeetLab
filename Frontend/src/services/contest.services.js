import { api } from "./api.services.js";

export const createContestService = async (data) => {
    console.log("Creating contest with data:", data);
    try {
        const response = await api.post("/contests", data);
        return response.data.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getAllContestsService = async (params = {}) => {
    try {
        const response = await api.get("/contests/all", { params });
        // Backend returns: { contests: [], meta: { page, limit, total, pages } }
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


export const getActiveContestsService = async (params = {}) => {
    try {
        const response = await api.get("/contests/active", { params });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getCreatedContestsService = async (params = {}) => {
    try {
        const response = await api.get("/contests/created", { params });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getJoinedContestsService = async (params = {}) => {
    try {
        const response = await api.get("/contests/joined", { params });
        // Aapka backend data ko { contests: data, meta: ... } mein wrap kar raha hai
        return response.data; 
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getContestByIdService = (contestId) =>
    api.get(`/contests/${contestId}`).then(res => res.data.data);

export const startContestService = (contestId) =>
    api.post(`/contests/${contestId}/start`).then(res => res.data.data);

/* LEADERBOARD */
export const getLeaderboardService = (contestId) =>
    api.get(`/contests/${contestId}/leaderboard`).then(res => res.data.data);