// src/components/ChatWindowClient.jsx
import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import "../../styles/ProfileClientMessengerChatWhatsapp.css/ChatWindowClient.css";

const ChatWindowClient = ({ selectedTalentId, messages, onSend }) => {
    const [newMessage, setNewMessage] = useState("");

    const handleSend = () => {
        if (newMessage.trim()) {
            onSend(newMessage);
            setNewMessage("");
        }
    };

    return (
        <Box className="chat-window">
            {selectedTalentId ? (
                <>
                    {/* message box */}
                    <Box className="chat-messages">
                        {messages.map((msg, index) => (
                            <Box
                                key={index}
                                className={`message-bubble ${msg.sender === "client" ? "sent" : "received"}`}
                            >
                                {msg.text}
                            </Box>
                        ))}
                    </Box>

                    {/* message input */}
                    <Box>
                        <TextField
                            fullWidth
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="message-input"
                        />
                        <Button onClick={handleSend} className="send-button">
                            Send
                        </Button>
                    </Box>
                </>
            ) : (
                <Typography variant="body2">Select a talent to start chatting</Typography>
            )}

        </Box>
    );
};

export default ChatWindowClient;
