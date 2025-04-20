import { useState, useEffect } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import "../styles/ProfileClientWhoIs.css";

const ProfileClientWhoIs = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const clientId = storedUser.id;

    const storedIntros = JSON.parse(localStorage.getItem("clientIntros")) || {};
    const clientIntro = storedIntros[clientId] || "";

    const [intro, setIntro] = useState(clientIntro);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const updatedIntros = { ...storedIntros, [clientId]: intro };
        localStorage.setItem("clientIntros", JSON.stringify(updatedIntros));
    }, [intro]);

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
            <Button className="intro-edit-button" onClick={() => setEditing(!editing)}>
                {editing ? "Save" : "Edit"}
            </Button>
        </Box>
    );
};

export default ProfileClientWhoIs;
