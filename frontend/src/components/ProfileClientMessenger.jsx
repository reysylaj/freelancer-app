import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
} from "@mui/material";
import "../styles/ProfileClientMessenger.css";
import { getConversation, sendMessage } from "../services/messageService";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";

const ProfileClientMessenger = () => {
    const { authUser } = useAuth();
    const clientId = authUser?.id;
    const { id: selectedTalentId } = useParams(); // ✅ from route /view-talent-profile/:id

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    // ✅ Load messages when component mounts or when talent changes
    useEffect(() => {
        if (clientId && selectedTalentId) {
            loadMessages();
        }
    }, [clientId, selectedTalentId]);

    const loadMessages = async () => {
        try {
            const data = await getConversation(clientId, selectedTalentId);
            setMessages(data);
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
            await loadMessages();
        } catch (error) {
            console.error("❌ Failed to send message:", error);
        }
    };

    return (
        <Box className="messenger-container">
            <Typography variant="h4" className="messages-title">
                Message Your Favourite Talent
            </Typography>

            <Box className="chat-window">
                {selectedTalentId ? (
                    <>
                        <Typography variant="h6" className="chat-header">
                            Chat with Talent #{selectedTalentId}
                        </Typography>

                        <Box className="message-box">
                            {messages.length > 0 ? (
                                messages.map((msg, index) => (
                                    <Box
                                        key={index}
                                        className={`message ${msg.sender === "client" ? "sent" : "received"}`}
                                    >
                                        {msg.text}
                                    </Box>
                                ))
                            ) : (
                                <Typography className="no-messages">No messages yet.</Typography>
                            )}
                        </Box>

                        <Box className="input-section">
                            <TextField
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                fullWidth
                                placeholder="Type your message..."
                                className="message-input"
                            />
                            <Button onClick={handleSendMessage} className="send-button" variant="contained" color="primary">
                                Send
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Typography variant="body1">No talent selected.</Typography>
                )}
            </Box>
        </Box>
    );
};

export default ProfileClientMessenger;
