import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Avatar
} from "@mui/material";
import "../styles/ProfileTalentMessenger.css";
import { getConversation, sendMessage } from "../services/messageService";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";

const ProfileTalentMessenger = () => {
    const { authUser } = useAuth();
    const talentId = authUser?.id;
    const { id: selectedClientId } = useParams(); // 🟠 comes from /message-client/:id

    const [clients, setClients] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    // 👇 Add client to sidebar and load messages
    useEffect(() => {
        const initChat = async () => {
            if (!talentId || !selectedClientId) return;

            const clientIdNum = parseInt(selectedClientId);
            const chatClient = {
                clientId: clientIdNum,
                name: `Client #${clientIdNum}`,
            };

            setClients((prev) => {
                const exists = prev.find(c => c.clientId === clientIdNum);
                return exists ? prev : [...prev, chatClient];
            });

            try {
                const msgs = await getConversation(clientIdNum, talentId);
                setMessages(msgs);
            } catch (err) {
                console.error("❌ Failed to load messages:", err);
            }
        };

        initChat();
    }, [selectedClientId, talentId]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        const messagePayload = {
            talentId,
            clientId: parseInt(selectedClientId),
            sender: "talent",
            text: newMessage,
        };

        try {
            await sendMessage(messagePayload);
            setNewMessage("");
            const updated = await getConversation(parseInt(selectedClientId), talentId);
            setMessages(updated);
        } catch (err) {
            console.error("❌ Failed to send message:", err);
        }
    };

    return (
        <Box className="messenger-wrapper">
            {/* LEFT: Sidebar with Client */}
            <Box className="chat-sidebar">
                <Typography className="chat-sidebar-title">Clients</Typography>
                {clients.length === 0 ? (
                    <Typography className="chat-placeholder">Message a client to start chatting.</Typography>
                ) : (
                    clients.map(client => (
                        <Box key={client.clientId} className="chat-client">
                            <Avatar src="/default-avatar.png" sx={{ width: 32, height: 32, mr: 1 }} />
                            <Typography>{client.name}</Typography>
                        </Box>
                    ))
                )}
            </Box>

            {/* RIGHT: Chat Window */}
            <Box className="chat-window">
                <Typography className="chat-title">Chat with Client #{selectedClientId}</Typography>

                <Box className="message-box">
                    {messages.length === 0 ? (
                        <Typography className="chat-placeholder">Start the conversation.</Typography>
                    ) : (
                        messages.map((msg, i) => (
                            <Box key={i} className={`message ${msg.sender}`}>
                                {msg.text}
                            </Box>
                        ))
                    )}
                </Box>

                {/* Message input */}
                <TextField
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    fullWidth
                    placeholder="Type a message..."
                    className="message-input"
                />
                <Button
                    onClick={handleSendMessage}
                    className="send-button"
                    variant="contained"
                    color="primary"
                >
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default ProfileTalentMessenger;
