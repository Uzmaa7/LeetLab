// src/services/chat.service.js
import { api } from "./api.services";

// Get all chats for the logged-in user
export const getMyChatsService = async () => {
    const response = await api.get("/chats/my-chats");
    return response.data; 
};

// 1. Create Group
export const createGroupService = async (data) => {
    const response = await api.post("/chats/create-group", data);
    return response.data;
};

// 2. Add Members to Group
export const addMembersService = async (chatId, members) => {
    const response = await api.put("/chats/add-members", { chatId, members });
    return response.data;
};


// 3. Remove Member (Admin Only)
export const removeMemberService = async (chatId, userRemoveId) => {
    const response = await api.delete("/chats/remove-member", { 
        data: { chatId, userRemoveId } 
    });
    return response.data;
};


// 4. Exit Group
export const exitGroupService = async (chatId) => {
    const response = await api.delete(`/chats/exit-group/${chatId}`);
    return response.data;
};


// 5. Rename Group
export const renameChatService = async (chatId, name) => {
    const response = await api.put(`/chats/${chatId}`, { name });
    return response.data;
};



// 6. Delete Chat/Group (Admin Only)
export const deleteChatService = async (chatId) => {
    const response = await api.delete(`/chats/${chatId}`);
    return response.data;
};

export const getChatDetailsService = async (chatId, populate = false) => {
    const response = await api.get(`/chats/${chatId}${populate ? '?populate=true' : ''}`);
    return response.data;
};



export const getMessagesService = async (chatId, page = 1) => {
    const response = await api.get(`/chats/message/${chatId}?page=${page}`);
    return response.data;
};


export const sendAttachmentService = async (formData) => {
    const response = await api.post("/chats/send-attachment", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};