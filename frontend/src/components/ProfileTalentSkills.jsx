import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "../styles/ProfileTalentSkills.css";
import { useAuth } from "../context/AuthContext";
import { getClientById, updateClientProfile } from "../services/clientService"; // ✅ your service

const ProfileTalentSkills = () => {
    const { authUser } = useAuth();
    const talentId = authUser?.id;

    const [bio, setBio] = useState("");
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState("");
    const [editingBio, setEditingBio] = useState(false);

    // ✅ Load from backend
    useEffect(() => {
        const fetchTalentProfile = async () => {
            try {
                const { data } = await getClientById(talentId); // this fetches full User
                setBio(data.bio || "");
                setSkills(data.skills ? data.skills.split(",") : []);
            } catch (err) {
                console.error("Failed to load talent profile:", err);
            }
        };
        if (talentId) fetchTalentProfile();
    }, [talentId]);

    const handleAddSkill = async () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            const updatedSkills = [...skills, newSkill.trim()];
            setSkills(updatedSkills);
            setNewSkill("");
            await updateClientProfile(talentId, {
                skills: updatedSkills.join(","),
            });
        }
    };

    const handleRemoveSkill = async (skillToRemove) => {
        const updatedSkills = skills.filter(skill => skill !== skillToRemove);
        setSkills(updatedSkills);
        await updateClientProfile(talentId, {
            skills: updatedSkills.join(","),
        });
    };

    const handleEditBio = async () => {
        if (editingBio) {
            await updateClientProfile(talentId, { bio });
        }
        setEditingBio(!editingBio);
    };

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
                    onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
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
