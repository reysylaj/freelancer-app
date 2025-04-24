import {
    Box,
    Typography,
    TextField,
    Button,
    Avatar
} from "@mui/material";
import "../../styles/ProfileTalentMessengerChatWhatsapp.css/ChatWindow.css";

const ChatWindow = ({
    selectedClient,
    messages,
    newMessage,
    setNewMessage,
    onSend
}) => {
    if (!selectedClient) {
        return (
            <Box className="chat-window">
                <Typography className="no-chat-message">
                    Select a client to start chatting.
                </Typography>
            </Box>
        );
    }

    return (
        <Box className="chat-window">
            {/* Header */}
            <Box className="chat-header">
                <Avatar src="/default-avatar.png" />
                <Typography variant="h6" className="chat-title">
                    Chat with {selectedClient.name}
                </Typography>
            </Box>

            {/* Messages */} 
            <Box className="message-list">
                {messages.length > 0 ? (
                    messages.map((msg, i) => (
                        <Box
                            key={i}
                            className={`message-bubble ${msg.sender === "talent" ? "sent" : "received"}`}
                        >
                            {msg.text}
                        </Box>
                    ))
                ) : (
                    <Typography className="no-messages">No messages yet.</Typography>
                )}
            </Box>

            {/* Input */}
            <Box className="message-input-wrapper">
                <TextField
                    fullWidth
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="chat-input"
                />
                <Button onClick={onSend} className="send-button" variant="contained" color="primary">
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default ChatWindow;
