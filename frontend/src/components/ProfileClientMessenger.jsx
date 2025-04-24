import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getConversation, sendMessage } from "../services/messageService";
import { getTalentsByClient } from "../services/proposalService"; // ✅ NEW
import ChatSidebarClient from "../components/ProfileClientMessengerChatWhatsapp.jsx/ChatSidebarClient";
import ChatWindowClient from "../components/ProfileClientMessengerChatWhatsapp.jsx/ChatWindowClient";
import "../styles/ProfileClientMessenger.css";

const ProfileClientMessenger = () => {
    const { id: selectedTalentIdFromURL } = useParams();
    const { authUser } = useAuth();
    const clientId = authUser?.id;

    const [selectedTalentId, setSelectedTalentId] = useState(
        selectedTalentIdFromURL ? parseInt(selectedTalentIdFromURL) : null
    );
    const [talents, setTalents] = useState([]);
    const [messages, setMessages] = useState([]);

    // ✅ Fetch all talents who have sent proposals to this client
    useEffect(() => {
        const fetchTalents = async () => {
            if (!clientId) return;
            try {
                const data = await getTalentsByClient(clientId);
                setTalents(data);

                // If we come via route (e.g., /message-talent/21), preselect it
                const parsedId = parseInt(selectedTalentIdFromURL);
                if (parsedId && data.find(t => t.talentId === parsedId)) {
                    setSelectedTalentId(parsedId);
                }
            } catch (err) {
                console.error("❌ Failed to load talents:", err);
            }
        };

        fetchTalents();
    }, [clientId, selectedTalentIdFromURL]);

    // ✅ Fetch messages when a talent is selected
    useEffect(() => {
        const fetchMessages = async () => {
            if (!clientId || !selectedTalentId) return;
            try {
                const data = await getConversation(clientId, selectedTalentId);
                setMessages(data);
            } catch (err) {
                console.error("❌ Error loading messages:", err);
            }
        };

        fetchMessages();
    }, [selectedTalentId, clientId]);

    // ✅ Send message logic
    const handleSendMessage = async (text) => {
        try {
            await sendMessage({
                clientId,
                talentId: selectedTalentId,
                sender: "client",
                text,
            });
            const updated = await getConversation(clientId, selectedTalentId);
            setMessages(updated);
        } catch (err) {
            console.error("❌ Failed to send message:", err);
        }
    };

    return (
        <Box className="messenger-container">
            <Typography variant="h4" className="messages-title">
                Message Your Favourite Talent
            </Typography>
            <Box className="messenger-box">
                <ChatSidebarClient
                    talents={talents}
                    selectedTalentId={selectedTalentId}
                    onSelectTalent={setSelectedTalentId}
                />
                <ChatWindowClient
                    selectedTalentId={selectedTalentId}
                    messages={messages}
                    onSend={handleSendMessage}
                />
            </Box>
        </Box>
    );
};

export default ProfileClientMessenger;
