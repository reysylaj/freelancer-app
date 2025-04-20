import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "../styles/ProfileTalentSkills.css";

const ProfileTalentSkills = () => {
    // ✅ Get logged-in user
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const talentId = storedUser.id || "defaultTalent"; // Ensure we have a unique identifier

    // ✅ Load profile data from localStorage
    const loadTalentProfileData = () => {
        const storedProfileData = JSON.parse(localStorage.getItem("talentProfileData")) || {};
        return storedProfileData[talentId] || {
            bio: "Write about yourself here...",
            skills: []
        };
    };

    const [bio, setBio] = useState(loadTalentProfileData().bio);
    const [skills, setSkills] = useState(loadTalentProfileData().skills);
    const [newSkill, setNewSkill] = useState("");
    const [editingBio, setEditingBio] = useState(false);

    // ✅ Save profile data whenever `bio` or `skills` change
    useEffect(() => {
        console.log("💾 Saving Talent Profile Data...");
        const storedProfileData = JSON.parse(localStorage.getItem("talentProfileData")) || {};

        localStorage.setItem(
            "talentProfileData",
            JSON.stringify({
                ...storedProfileData,
                [talentId]: { bio, skills }
            })
        );
    }, [bio, skills, talentId]);

    // ✅ Add new skill
    const handleAddSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill("");
        }
    };

    // ✅ Remove a skill
    const handleRemoveSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    // ✅ Toggle edit mode for bio
    const handleEditBio = () => setEditingBio(!editingBio);

    return (
        <Box className="profile-talent-skills">
            {/* Bio Section */}
            <Box className="bio-section">
                <Typography variant="h5" className="bio-title">
                    About Me
                    <IconButton onClick={handleEditBio} className="edit-icon">
                        <EditIcon />
                    </IconButton>
                </Typography>
                {editingBio ? (
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        onBlur={handleEditBio}
                    />
                ) : (
                    <Typography variant="body1" className="bio-text">
                        {bio}
                    </Typography>
                )}
            </Box>

            {/* Skills Section */}
            <Typography variant="h5" className="skills-title">Skills & Expertise</Typography>
            <Box className="skills-container">
                {skills.length > 0 ? (
                    skills.map((skill, index) => (
                        <Chip
                            key={index}
                            label={skill}
                            onDelete={() => handleRemoveSkill(skill)}
                            className="skill-chip"
                        />
                    ))
                ) : (
                    <Typography>No skills added yet.</Typography>
                )}
            </Box>

            {/* Add Skill Section */}
            <Box className="add-skill-container">
                <TextField
                    label="Add a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                    fullWidth
                    className="skill-input"
                />
                <Button onClick={handleAddSkill} className="add-skill-btn">
                    ADD SKILL
                </Button>
            </Box>
        </Box>
    );
};

export default ProfileTalentSkills;
