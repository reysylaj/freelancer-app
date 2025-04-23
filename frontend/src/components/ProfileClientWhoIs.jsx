import { useState, useEffect } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import "../styles/ProfileClientWhoIs.css";
import { useAuth } from "../context/AuthContext";
import { getClientById, updateClientProfile } from "../services/clientService"; // ✅ make sure these exist

const ProfileClientWhoIs = () => {
    const { authUser } = useAuth();
    const clientId = authUser?.id;

    const [intro, setIntro] = useState("");
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchIntro = async () => {
            try {
                const response = await getClientById(clientId);
                setIntro(response.data.bio || ""); // ✅ .data.bio instead of just .bio
            } catch (err) {
                console.error("Failed to load intro:", err);
            }
        };
        if (clientId) fetchIntro();
    }, [clientId]);

    const handleSaveIntro = async () => {
        try {
            await updateClientProfile(clientId, { bio: intro });
            setEditing(false);
        } catch (err) {
            console.error("Failed to save intro:", err);
        }
    };

    return (
        <Box className="client-intro-container">
            <Typography variant="h5" className="intro-title">Who is the Client?</Typography>
            {editing ? (
                <TextField
                    className="intro-textbox"
                    multiline
                    rows={4}
                    fullWidth
                    value={intro}
                    onChange={(e) => setIntro(e.target.value)}
                />
            ) : (
                <Typography className="intro-text">
                    {intro || "Click edit to write something about yourself..."}
                </Typography>
            )}
            <Button className="intro-edit-button" onClick={editing ? handleSaveIntro : () => setEditing(true)}>
                {editing ? "Save" : "Edit"}
            </Button>
        </Box>
    );
};

export default ProfileClientWhoIs;
