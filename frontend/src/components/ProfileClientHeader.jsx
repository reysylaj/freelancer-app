import { useState, useEffect } from "react";
import { Box, Typography, Avatar, Button, IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/ProfileClientHeader.css";
import { useAuth } from "../context/AuthContext";
import { getClientById, updateClientProfile } from "../services/clientService"; // ✅ create these API functions

const ProfileClientHeader = () => {
    const { authUser } = useAuth();
    const clientId = authUser?.id;
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const { data } = await getClientById(authUser.id);
                setUser(data);
            } catch (err) {
                console.error("Failed to load profile", err);
            }
        };
        loadProfile();
    }, [authUser]);




    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            await updateClientProfile(clientId, user); // 📡 Update to DB
            setEditing(false);
        } catch (err) {
            console.error("Failed to update profile:", err);
            alert("Failed to update profile");
        }
    };

    const handleImageUpload = async (event, field) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            const updatedUser = { ...user, [field]: e.target.result };
            setUser(updatedUser);
            await updateClientProfile(clientId, updatedUser);
        };
        reader.readAsDataURL(file);
    };

    const handleImageDelete = async (field) => {
        const updatedUser = { ...user, [field]: null };
        setUser(updatedUser);
        await updateClientProfile(clientId, updatedUser);
    };

    if (!user) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <Typography>Loading client profile...</Typography>
            </Box>
        );
    }

    return (
        <Box className="profile-client-header">
            <Box className="cover-container">
                <img src={user.coverImage || "/default-cover.jpg"} alt="Cover" className="cover-image" />
                <Box className="cover-actions">
                    <IconButton component="label" className="edit-cover-btn">
                        <CameraAltIcon />
                        <input type="file" hidden onChange={(e) => handleImageUpload(e, "coverImage")} />
                    </IconButton>
                    {user.coverImage && (
                        <IconButton className="delete-cover-btn" onClick={() => handleImageDelete("coverImage")}>
                            <DeleteIcon />
                        </IconButton>
                    )}
                </Box>
            </Box>

            <Box className="profile-info">
                <Box className="avatar-container">
                    <Avatar src={user.profilePicture || "/default-avatar.png"} className="profile-avatar" />
                    <Box className="avatar-actions">
                        <IconButton component="label" className="edit-avatar-btn">
                            <CameraAltIcon />
                            <input type="file" hidden onChange={(e) => handleImageUpload(e, "profilePicture")} />
                        </IconButton>
                        {user.profilePicture && (
                            <IconButton className="delete-avatar-btn" onClick={() => handleImageDelete("profilePicture")}>
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </Box>
                </Box>

                <Box className="details-container">
                    {editing ? (
                        <>
                            <TextField name="name" value={user.name} onChange={handleChange} size="small" />
                            <TextField name="surname" value={user.surname} onChange={handleChange} size="small" />
                            <TextField name="role" value={user.role} onChange={handleChange} size="small" />
                            <TextField name="preferredLink" value={user.preferredLink} onChange={handleChange} size="small" />
                        </>
                    ) : (
                        <>
                            <Typography variant="h4">{user.name} {user.surname}</Typography>
                            <Typography variant="h6" className="role-text">{user.role}</Typography>
                            <Typography variant="body2">
                                <a href={user.preferredLink} target="_blank" rel="noopener noreferrer">
                                    {user.preferredLink}
                                </a>
                            </Typography>
                        </>
                    )}
                    {editing ? (
                        <Button variant="contained" color="success" onClick={handleSave}>Save</Button>
                    ) : (
                        <IconButton onClick={() => setEditing(true)} className="edit-btn">
                            <EditIcon />
                        </IconButton>
                    )}
                </Box>
            </Box>

            <Box className="jobs-posted">
                <Typography variant="h6">Total Jobs Posted: {user.jobsPosted}</Typography>
            </Box>
        </Box>
    );
};

export default ProfileClientHeader;
