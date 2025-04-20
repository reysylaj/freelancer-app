import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Avatar,
    IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/ProfileAgencySavedClients.css";

const ProfileAgencySavedClients = () => {
    const [savedClients, setSavedClients] = useState([]);

    useEffect(() => {
        const storedClients = JSON.parse(localStorage.getItem("agencySavedClients")) || [];
        setSavedClients(storedClients);
    }, []);

    // Remove client from saved list
    const handleRemove = (id) => {
        const updatedClients = savedClients.filter(client => client.id !== id);
        setSavedClients(updatedClients);
        localStorage.setItem("agencySavedClients", JSON.stringify(updatedClients));
    };

    return (
        <Box className="saved-clients-container">
            <Typography variant="h5" className="saved-clients-title">Favorite Clients</Typography>

            {savedClients.length === 0 ? (
                <Typography className="no-saved-clients">No saved clients yet.</Typography>
            ) : (
                <Box className="saved-clients-grid">
                    {savedClients.map((client) => (
                        <Card key={client.id} className="client-card">
                            <CardContent>
                                <Box className="client-header">
                                    <Avatar src={client.profilePicture} className="client-avatar" />
                                    <Box>
                                        <Typography variant="h6">{client.name}</Typography>
                                        <Typography variant="body2" className="client-role">{client.role}</Typography>
                                    </Box>
                                    <IconButton className="remove-client-btn" onClick={() => handleRemove(client.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default ProfileAgencySavedClients;
