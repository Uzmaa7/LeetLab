// src/services/chat.service.js
import { api } from "./api.services";

// Get all chats for the logged-in user
export const getMyChatsService = async () => {
    const response = await api.get("/chats/my-chats");
    return response.data; 
};