import { useState, useEffect } from "react";
import { Box, Typography, Avatar, Button, IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/ProfileClientHeader.css";

const ProfileClientHeader = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const clientId = storedUser.id;

    const storedClients = JSON.parse(localStorage.getItem("clientProfiles")) || {};
    const clientData = storedClients[clientId] || {
        name: "Jane",
        surname: "Doe",
        role: "Hiring Manager",
        preferredLink: "https://company.com/janedoe",
        jobsPosted: 0,
        profilePicture: null,
        coverImage: null,
    };

    const [user, setUser] = useState(clientData);
    const [editing, setEditing] = useState(false);

    // ✅ Save profile to local storage per client
    const saveProfile = (updatedData) => {
        const updatedClients = { ...storedClients, [clientId]: updatedData };
        localStorage.setItem("clientProfiles", JSON.stringify(updatedClients));
    };

    // ✅ Update Profile Fields
    const handleChange = (e) => {
        const updatedUser = { ...user, [e.target.name]: e.target.value };
        setUser(updatedUser);
        saveProfile(updatedUser);
    };

    // ✅ Handle Profile Picture Upload
    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const updatedUser = { ...user, profilePicture: e.target.result };
                setUser(updatedUser);
                saveProfile(updatedUser);
            };
            reader.readAsDataURL(file);
        }
    };

    // ✅ Handle Cover Image Upload
    const handleCoverImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const updatedUser = { ...user, coverImage: e.target.result };
                setUser(updatedUser);
                saveProfile(updatedUser);
            };
            reader.readAsDataURL(file);
        }
    };

    // ✅ Handle Image Deletion
    const handleDeleteProfilePicture = () => {
        const updatedUser = { ...user, profilePicture: null };
        setUser(updatedUser);
        saveProfile(updatedUser);
    };

    const handleDeleteCoverImage = () => {
        const updatedUser = { ...user, coverImage: null };
        setUser(updatedUser);
        saveProfile(updatedUser);
    };

    return (
        <Box className="profile-client-header">
            {/* Cover Image */}
            <Box className="cover-container">
                <img src={user.coverImage || "/default-cover.jpg"} alt="Cover" className="cover-image" />
                <Box className="cover-actions">
                    <IconButton component="label" className="edit-cover-btn">
                        <CameraAltIcon />
                        <input type="file" hidden onChange={handleCoverImageChange} />
                    </IconButton>
                    {user.coverImage && (
                        <IconButton className="delete-cover-btn" onClick={handleDeleteCoverImage}>
                            <DeleteIcon />
                        </IconButton>
                    )}
                </Box>
            </Box>

            {/* Profile Info */}
            <Box className="profile-info">
                <Box className="avatar-container">
                    <Avatar src={user.profilePicture || "/default-avatar.png"} className="profile-avatar" />
                    <Box className="avatar-actions">
                        <IconButton component="label" className="edit-avatar-btn">
                            <CameraAltIcon />
                            <input type="file" hidden onChange={handleProfilePictureChange} />
                        </IconButton>
                        {user.profilePicture && (
                            <IconButton className="delete-avatar-btn" onClick={handleDeleteProfilePicture}>
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </Box>
                </Box>

                {/* Editable Fields */}
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

                    {/* Edit and Save Buttons */}
                    {editing ? (
                        <Button variant="contained" color="success" onClick={() => setEditing(false)}>
                            Save
                        </Button>
                    ) : (
                        <IconButton onClick={() => setEditing(true)} className="edit-btn">
                            <EditIcon />
                        </IconButton>
                    )}
                </Box>
            </Box>

            {/* Jobs Posted */}
            <Box className="jobs-posted">
                <Typography variant="h6">Total Jobs Posted: {user.jobsPosted}</Typography>
            </Box>
        </Box>
    );
};

export default ProfileClientHeader;
