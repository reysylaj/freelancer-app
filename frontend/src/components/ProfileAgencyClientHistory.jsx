import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Avatar,
    Chip
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import "../styles/ProfileAgencyClientHistory.css";

const ProfileAgencyClientHistory = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const storedClients = JSON.parse(localStorage.getItem("agencyClients")) || [];
        setClients(storedClients);
    }, []);

    return (
        <Box className="agency-client-history-container">
            <Typography variant="h5" className="agency-client-history-title">Client Work History</Typography>

            {clients.length === 0 ? (
                <Typography className="no-clients">No client history yet.</Typography>
            ) : (
                <Box className="client-history-grid">
                    {clients.map((client, index) => (
                        <Card key={index} className="client-card">
                            <CardContent>
                                <Box className="client-header">
                                    <Avatar src={client.profilePicture} className="client-avatar" />
                                    <Box>
                                        <Typography variant="h6">{client.name}</Typography>
                                        <Typography variant="body2" className="client-role">{client.role}</Typography>
                                    </Box>
                                </Box>

                                <Typography variant="body2" className="project-description">
                                    <strong>Project:</strong> {client.project}
                                </Typography>

                                <Typography variant="body2" className="project-duration">
                                    <strong>Duration:</strong> {client.duration}
                                </Typography>

                                <Typography variant="body2" className="client-feedback">
                                    <strong>Feedback:</strong> {client.feedback}
                                </Typography>

                                <Box className="rating-container">
                                    {Array(client.rating).fill().map((_, i) => (
                                        <StarIcon key={i} className="rating-star" />
                                    ))}
                                    {client.rating === 0 && <Typography variant="body2">No rating</Typography>}
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default ProfileAgencyClientHistory;
