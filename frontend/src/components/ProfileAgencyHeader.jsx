import { useState } from "react";
import { Box, Typography, Avatar, Button, IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "../styles/ProfileAgencyHeader.css";

const ProfileAgencyHeader = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {
        name: "Agency Name",
        role: "IT Solutions Provider",
        preferredLink: "https://agencywebsite.com",
        jobsConfirmed: 20,
        profilePicture: null,
        coverImage: null,
    };

    const [user, setUser] = useState(storedUser);
    const [editing, setEditing] = useState(false);

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUser((prev) => ({ ...prev, profilePicture: e.target.result }));
                localStorage.setItem("user", JSON.stringify({ ...user, profilePicture: e.target.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCoverImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUser((prev) => ({ ...prev, coverImage: e.target.result }));
                localStorage.setItem("user", JSON.stringify({ ...user, coverImage: e.target.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEdit = () => setEditing(!editing);
    const handleSave = () => {
        localStorage.setItem("user", JSON.stringify(user));
        setEditing(false);
    };

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <Box className="profile-agency-header">
            {/* Cover Image */}
            <Box className="cover-container">
                <img src={user.coverImage || "/default-cover.jpg"} alt="Cover" className="cover-image" />
                <IconButton component="label" className="edit-cover-btn">
                    <CameraAltIcon />
                    <input type="file" hidden onChange={handleCoverImageChange} />
                </IconButton>
            </Box>

            {/* Profile Details */}
            <Box className="profile-info">
                <Box className="avatar-container">
                    <Avatar src={user.profilePicture || "/default-avatar.png"} className="profile-avatar" />
                    <IconButton component="label" className="edit-avatar-btn">
                        <CameraAltIcon />
                        <input type="file" hidden onChange={handleProfilePictureChange} />
                    </IconButton>
                </Box>

                {/* Name, Role, and Preferred Link */}
                <Box className="details-container">
                    {editing ? (
                        <>
                            <TextField name="name" value={user.name} onChange={handleChange} size="small" />
                            <TextField name="role" value={user.role} onChange={handleChange} size="small" />
                            <TextField name="preferredLink" value={user.preferredLink} onChange={handleChange} size="small" />
                        </>
                    ) : (
                        <>
                            <Typography variant="h4">{user.name}</Typography>
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
                        <Button variant="contained" color="success" onClick={handleSave}>
                            Save
                        </Button>
                    ) : (
                        <IconButton onClick={handleEdit} className="edit-btn">
                            <EditIcon />
                        </IconButton>
                    )}
                </Box>
            </Box>

            {/* Jobs Confirmed */}
            <Box className="jobs-confirmed">
                <Typography variant="h6">Total Jobs Confirmed: {user.jobsConfirmed}</Typography>
            </Box>
        </Box>
    );
};

export default ProfileAgencyHeader;
