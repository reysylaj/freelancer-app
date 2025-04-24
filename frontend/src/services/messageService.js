// src/services/messageService.js
import API from "./api";

// Send a message
export const sendMessage = async (messageData) => {
    const res = await API.post("/messages", messageData);
    return res.data;
};

// Get conversation between a client and a talent
export const getConversation = async (clientId, talentId) => {
    const res = await API.get(`/messages/${clientId}/${talentId}`);
    return res.data;
};

// Optional: Delete message by ID
export const deleteMessage = async (id) => {
    const res = await API.delete(`/messages/${id}`);
    return res.data;
};
