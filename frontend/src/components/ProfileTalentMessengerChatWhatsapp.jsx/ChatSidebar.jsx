import { Avatar, Box, Typography } from "@mui/material";
import "../../styles/ProfileTalentMessengerChatWhatsapp.css/ChatSidebar.css";

const ChatSidebar = ({ clients, selectedClientId, onSelectClient }) => {
    return (
        <Box className="chat-sidebar">
            <Typography variant="h6" className="sidebar-title">Clients</Typography>
            {clients.length === 0 ? (
                <Typography className="no-clients">Message a client to start chatting.</Typography>
            ) : (
                clients.map((client) => (
                    <Box
                        key={client.clientId}
                        className={`client-item ${selectedClientId === client.clientId ? "active" : ""}`}
                        onClick={() => onSelectClient(client.clientId)}
                    >
                        <Avatar src="/default-avatar.png" />
                        <Typography className="client-name">{client.name}</Typography>
                    </Box>
                ))
            )}
        </Box>
    );
};

export default ChatSidebar;
