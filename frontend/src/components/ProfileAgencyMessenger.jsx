import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "../styles/ProfileAgencyMessenger.css";

const ProfileAgencyMessenger = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {
        name: "Agency Name",
        profilePicture: "/default-avatar.png",
    };

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        const savedMessages = JSON.parse(localStorage.getItem("agencyMessages")) || [];
        setMessages(savedMessages);
    }, []);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        const messageData = {
            sender: storedUser.name,
            text: newMessage,
            timestamp: new Date().toLocaleTimeString(),
        };

        const updatedMessages = [...messages, messageData];
        setMessages(updatedMessages);
        localStorage.setItem("agencyMessages", JSON.stringify(updatedMessages));

        setNewMessage("");
    };

    return (
        <Box className="messenger-container">
            <Typography variant="h5" className="messenger-title">Agency Messages</Typography>

            <Box className="messages-list">
                {messages.length === 0 ? (
                    <Typography className="no-messages">No messages yet.</Typography>
                ) : (
                    messages.map((msg, index) => (
                        <Box key={index} className={`message-box ${msg.sender === storedUser.name ? "sent" : "received"}`}>
                            <Avatar src={storedUser.profilePicture} className="message-avatar" />
                            <Box className="message-content">
                                <Typography variant="subtitle2" className="message-sender">{msg.sender}</Typography>
                                <Typography variant="body2" className="message-text">{msg.text}</Typography>
                                <Typography variant="caption" className="message-time">{msg.timestamp}</Typography>
                            </Box>
                        </Box>
                    ))
                )}
            </Box>

            <Box className="message-input-box">
                <TextField
                    className="message-input"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    fullWidth
                />
                <Button className="send-button" onClick={handleSendMessage} startIcon={<SendIcon />}>Send</Button>
            </Box>
        </Box>
    );
};

export default ProfileAgencyMessenger;
