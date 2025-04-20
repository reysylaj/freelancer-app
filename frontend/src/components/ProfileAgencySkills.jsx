import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/ProfileAgencySkills.css";

const ProfileAgencySkills = () => {
    const storedData = JSON.parse(localStorage.getItem("agencySkills")) || {
        about: "We are a professional agency offering top-notch services.",
        skills: ["Project Management", "Marketing", "Software Development"],
    };

    const [agencyData, setAgencyData] = useState(storedData);
    const [editing, setEditing] = useState(false);
    const [newSkill, setNewSkill] = useState("");

    // Save to LocalStorage
    useEffect(() => {
        localStorage.setItem("agencySkills", JSON.stringify(agencyData));
    }, [agencyData]);

    // Handle Editing
    const handleEdit = () => setEditing(true);
    const handleSave = () => setEditing(false);

    // Handle About Section Change
    const handleAboutChange = (e) => {
        setAgencyData((prev) => ({ ...prev, about: e.target.value }));
    };

    // Handle Adding Skills
    const handleAddSkill = () => {
        if (newSkill.trim() !== "") {
            setAgencyData((prev) => ({
                ...prev,
                skills: [...prev.skills, newSkill.trim()],
            }));
            setNewSkill("");
        }
    };

    // Handle Removing Skills
    const handleRemoveSkill = (skillToRemove) => {
        setAgencyData((prev) => ({
            ...prev,
            skills: prev.skills.filter((skill) => skill !== skillToRemove),
        }));
    };

    return (
        <Box className="agency-skills-container">
            {/* Section Title */}
            <Box className="skills-header">
                <Typography variant="h5">About & Expertise</Typography>
                {editing ? (
                    <IconButton onClick={handleSave} className="edit-btn">
                        <SaveIcon />
                    </IconButton>
                ) : (
                    <IconButton onClick={handleEdit} className="edit-btn">
                        <EditIcon />
                    </IconButton>
                )}
            </Box>

            {/* About Section */}
            {editing ? (
                <TextField
                    multiline
                    fullWidth
                    variant="outlined"
                    value={agencyData.about}
                    onChange={handleAboutChange}
                    className="about-textfield"
                />
            ) : (
                <Typography variant="body1" className="about-text">
                    {agencyData.about}
                </Typography>
            )}

            {/* Skills Section */}
            <Box className="skills-list">
                {agencyData.skills.map((skill, index) => (
                    <Chip
                        key={index}
                        label={skill}
                        className="skill-chip"
                        onDelete={editing ? () => handleRemoveSkill(skill) : undefined}
                    />
                ))}
            </Box>

            {/* Add New Skill */}
            {editing && (
                <Box className="add-skill-container">
                    <TextField
                        label="Add a skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        className="skill-input"
                    />
                    <Button onClick={handleAddSkill} className="add-skill-button">
                        Add Skill
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default ProfileAgencySkills;
