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
import "../styles/ProfileTalentMessenger.css";
import { getConversation, sendMessage } from "../services/messageService";

const ProfileTalentMessenger = () => {
    const { authUser } = useAuth();
    const talentId = authUser?.id;

    const [conversations, setConversations] = useState([]); // Optional if you list clients later
    const [selectedChat, setSelectedChat] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        if (selectedClientId && talentId) {
            loadMessages(talentId, selectedClientId);
        }
    }, [selectedClientId]);

    const loadMessages = async (talentId, clientId) => {
        try {
            const data = await getConversation(clientId, talentId);
            setMessages(data);
            setSelectedChat({
                clientId,
                clientName: selectedClientName || "Client",
                clientAvatar: "/default-avatar.png",
            });
        } catch (error) {
            console.error("❌ Failed to load messages:", error);
        }
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        const messagePayload = {
            talentId,
            clientId: selectedChat.clientId,
            sender: "talent",
            senderId: talentId,
            receiverId: selectedChat.clientId,
            text: newMessage,
        };

        try {
            await sendMessage(messagePayload);
            setNewMessage("");
            loadMessages(talentId, selectedChat.clientId);
        } catch (error) {
            console.error("❌ Failed to send message:", error);
        }
    };

    return (
        <Box className="messenger-container">
            <Typography variant="h4" className="messages-title">
                Message Your Favourite Client
            </Typography>
            <Box className="messenger-box">
                <Box className="chat-window">
                    {selectedChat ? (
                        <>
                            <Typography variant="h6" className="chat-header">
                                Chat with {selectedChat.clientName}
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
                        <Typography>Select a client to start chatting</Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default ProfileTalentMessenger;
