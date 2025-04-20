import { useState } from "react";
import { Box, Typography, Card, CardContent, Avatar, Chip, Rating } from "@mui/material";
import "../styles/ProfileTalentClientHistory.css";

const ProfileTalentClientHistory = () => {
    const [clients] = useState([
        {
            id: 1,
            name: "John Doe",
            profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
            position: "Web Development",
            status: "Completed",
            payment: "Paid",
            rating: 4.5,
        },
        {
            id: 2,
            name: "Sarah Johnson",
            profilePic: "https://randomuser.me/api/portraits/women/45.jpg",
            position: "UI/UX Design",
            status: "Ongoing",
            payment: "Pending",
            rating: 5,
        },
        {
            id: 3,
            name: "Michael Smith",
            profilePic: "https://randomuser.me/api/portraits/men/28.jpg",
            position: "Mobile App Development",
            status: "Completed",
            payment: "Paid",
            rating: 4,
        },
    ]);

    return (
        <Box className="client-history-container">
            <Typography variant="h6" className="client-history-title">
                🏆 Client History
            </Typography>

            <Box className="client-history-list">
                {clients.map((client) => (
                    <Card key={client.id} className="client-card">
                        <CardContent className="client-content">
                            <Avatar src={client.profilePic} alt={client.name} className="client-avatar" />
                            <Box className="client-details">
                                <Typography variant="h6" className="client-name">
                                    {client.name}
                                </Typography>
                                <Typography variant="body2" className="client-position">
                                    {client.position}
                                </Typography>

                                {/* Status Chips */}
                                <Box className="client-status">
                                    <Chip
                                        label={client.status}
                                        className={`status-chip ${client.status.toLowerCase()}`}
                                    />
                                    <Chip
                                        label={client.payment}
                                        className={`payment-chip ${client.payment.toLowerCase()}`}
                                    />
                                </Box>

                                {/* Rating */}
                                <Rating
                                    name={`rating-${client.id}`}
                                    value={client.rating}
                                    precision={0.5}
                                    readOnly
                                    className="client-rating"
                                />
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default ProfileTalentClientHistory;
