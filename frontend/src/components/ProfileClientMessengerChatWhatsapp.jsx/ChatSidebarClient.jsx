// src/components/ChatSidebarClient.jsx
import { Avatar, Box, Typography } from "@mui/material";
import "../../styles/ProfileClientMessengerChatWhatsapp.css/ChatSidebarClient.css";

const ChatSidebarClient = ({ talents, selectedTalentId, onSelectTalent }) => {
    return (
        <Box className="chat-sidebar">
            <Typography variant="h6" className="chat-sidebar-title">Talents</Typography>
            {talents.length === 0 ? (
                <Typography variant="body2" className="chat-sidebar-empty">
                    Message a talent to start chatting.
                </Typography>
            ) : (
                talents.map((talent) => (
                    <Box
                        key={`talent-${talent.talentId}`}
                        className={`chat-client-entry ${selectedTalentId === talent.talentId ? "selected" : ""}`}
                        onClick={() => onSelectTalent(talent.talentId)}
                    >
                        <Avatar src="/default-avatar.png" sx={{ mr: 1 }} />
                        <Typography>{talent.name}</Typography>
                    </Box>
                ))
            )}
        </Box>
    );
};

export default ChatSidebarClient;
