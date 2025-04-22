import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Avatar, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BusinessIcon from "@mui/icons-material/Business";
import "../styles/ProfileTalentFavouritesClientsChosen.css";

const ProfileTalentFavouritesClientsChosen = () => {

    // Dummy Data (if no favorite clients exist)
    useEffect(() => {
        if (favorites.length === 0) {
            const dummyClients = [
                { id: 1, name: "Anna Williams", company: "TechCorp Ltd.", description: "Looking for skilled frontend developers.", photo: "https://randomuser.me/api/portraits/women/50.jpg" },
                { id: 2, name: "Mark Johnson", company: "FinBank", description: "Needs expert backend engineers.", photo: "https://randomuser.me/api/portraits/men/55.jpg" },
                { id: 3, name: "Lisa Chen", company: "Startup Hub", description: "Hiring innovative thinkers for new projects.", photo: "https://randomuser.me/api/portraits/women/60.jpg" },
            ];
            setFavorites(dummyClients);
        }
    }, []);

    // Remove a favorite client
    const removeFavorite = (id) => {
        const updatedFavorites = favorites.filter(client => client.id !== id);
        setFavorites(updatedFavorites);
    };

    return (
        <Box className="favorites-container">
            <Typography variant="h5" className="section-title">Favorite Clients</Typography>
            <Typography variant="body1" className="section-subtitle">Clients you'd love to work with</Typography>

            <Box className="favorites-list">
                {favorites.length > 0 ? (
                    favorites.map(client => (
                        <Card key={client.id} className="favorite-card">
                            <CardContent>
                                <Avatar src={client.photo} className="client-avatar" />
                                <Typography variant="h6" className="client-name">{client.name}</Typography>
                                <Typography variant="body2" className="client-company">
                                    <BusinessIcon className="icon" /> {client.company}
                                </Typography>
                                <Typography variant="body2" className="client-description">{client.description}</Typography>
                                <IconButton className="remove-button" onClick={() => removeFavorite(client.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography variant="body2" className="no-favorites">You have no favorite clients yet.</Typography>
                )}
            </Box>
        </Box>
    );
};

export default ProfileTalentFavouritesClientsChosen;
