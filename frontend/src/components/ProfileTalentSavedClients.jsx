import { useState } from "react";
import { Box, Typography, Card, CardContent, Avatar, Button, Rating } from "@mui/material";
import "../styles/ProfileTalentSavedClients.css";

const ProfileTalentSavedClients = () => {
    const [savedClients] = useState([
        {
            id: 1,
            name: "Alice Johnson",
            profilePic: "https://randomuser.me/api/portraits/women/32.jpg",
            company: "Tech Solutions Ltd",
            industry: "Software Development",
            rating: 4.8,
        },
        {
            id: 2,
            name: "David Miller",
            profilePic: "https://randomuser.me/api/portraits/men/45.jpg",
            company: "Creative Designs Inc",
            industry: "Graphic Design",
            rating: 5,
        },
        {
            id: 3,
            name: "Emma Roberts",
            profilePic: "https://randomuser.me/api/portraits/women/28.jpg",
            company: "Marketing Pro",
            industry: "Digital Marketing",
            rating: 4.5,
        },
    ]);

    return (
        <Box className="saved-clients-container">
            <Typography variant="h6" className="saved-clients-title">
                ⭐ Favorite Clients
            </Typography>

            <Box className="saved-clients-list">
                {savedClients.map((client) => (
                    <Card key={client.id} className="saved-client-card">
                        <CardContent className="saved-client-content">
                            <Avatar src={client.profilePic} alt={client.name} className="saved-client-avatar" />
                            <Box className="saved-client-details">
                                <Typography variant="h6" className="saved-client-name">
                                    {client.name}
                                </Typography>
                                <Typography variant="body2" className="saved-client-company">
                                    {client.company} - {client.industry}
                                </Typography>

                                {/* Rating */}
                                <Rating
                                    name={`rating-${client.id}`}
                                    value={client.rating}
                                    precision={0.5}
                                    readOnly
                                    className="saved-client-rating"
                                />

                                {/* Contact Button */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="contact-button"
                                    onClick={() => window.open(`/client-profile/${client.id}`, "_blank")}
                                >
                                    Contact
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default ProfileTalentSavedClients;
