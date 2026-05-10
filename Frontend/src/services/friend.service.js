
import { api } from "./api.services";

// Accept or Reject Request
export const acceptRequestService = async (requestId, accept) => {
    const response = await api.put("/friends/accept-request", { requestId, accept });
    return response.data;
};

// Get all notifications (Friend Requests)
export const getNotificationsService = async () => {
    const response = await api.get("/friends/notification");
    return response.data;
};

export const searchUsersService = async (fullname) => {
    const response = await api.get(`/friends/search?fullname=${fullname}`);
    // console.log("Search Users Response:", response);
    return response.data;
};

export const sendRequestService = async (receiverId) => {
    const response = await api.put("/friends/send-request", { receiverId });
    return response.data;
};

// Get all friends (with optional chatId for filtering)
export const getMyFriendsService = async (chatId = "") => {
    // Agar chatId hai toh '?chatId=xyz' jud jayega, warna khali string
    const response = await api.get(`/friends/my-friends${chatId ? `?chatId=${chatId}` : ""}`);
    return response.data;
};