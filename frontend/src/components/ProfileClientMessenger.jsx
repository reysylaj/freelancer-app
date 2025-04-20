import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Avatar,
    TextField,
    Button,
} from "@mui/material";
import "../styles/ProfileClientMessenger.css";
import { getConversation, sendMessage } from "../services/messageService";

const ProfileClientMessenger = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const clientId = storedUser.id;
    const selectedTalentId = parseInt(localStorage.getItem("selectedTalentId"));

    const [conversations, setConversations] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);

    // 🔹 Fetch all conversations from backend (grouped per talent)
    useEffect(() => {
        if (selectedTalentId && clientId) {
            loadMessages(clientId, selectedTalentId);
        }
    }, [selectedTalentId]);

    const loadMessages = async (clientId, talentId) => {
        try {
            const data = await getConversation(clientId, talentId);
            setMessages(data);
            setSelectedChat({
                talentId,
                talentName: localStorage.getItem("selectedTalentName") || "Talent",
                talentAvatar: "/default-avatar.png", // You can pass real avatar if needed
            });
        } catch (error) {
            console.error("❌ Failed to load messages:", error);
        }
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        const messagePayload = {
            clientId,
            talentId: selectedTalentId,
            sender: "client",
            senderId: clientId,
            receiverId: selectedTalentId,
            text: newMessage,
        };

        try {
            await sendMessage(messagePayload);
            setNewMessage("");
            loadMessages(clientId, selectedTalentId);
        } catch (error) {
            console.error("❌ Failed to send message:", error);
        }
    };

    return (
        <Box className="messenger-container">
            <Typography variant="h4" className="messages-title">
                Message Your Favourite Talent
            </Typography>
            <Box className="messenger-box">
                {/* You can build a sidebar later to show all talent chats */}
                <Box className="chat-window">
                    {selectedChat ? (
                        <>
                            <Typography variant="h6" className="chat-header">
                                Chat with {selectedChat.talentName}
                            </Typography>

                            <Box className="message-box">
                                {messages.map((msg, index) => (
                                    <Box key={index} className={`message ${msg.sender}`}>
                                        {msg.text}
                                    </Box>
                                ))}
                            </Box>

                            <TextField
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                fullWidth
                                placeholder="Type your message..."
                                className="message-input"
                            />
                            <Button onClick={handleSendMessage} className="send-button">
                                Send
                            </Button>
                        </>
                    ) : (
                        <Typography>Select a talent to start chatting</Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default ProfileClientMessenger;
