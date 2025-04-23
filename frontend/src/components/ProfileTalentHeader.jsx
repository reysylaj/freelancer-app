import { useState, useEffect } from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/ProfileTalentHeader.css";
import { useAuth } from "../context/AuthContext";

const ProfileTalentHeader = ({ user: externalUser = null }) => {
    const { authUser } = useAuth();
    const isPublic = !!externalUser;
    const userData = isPublic ? externalUser : authUser;

    const [user, setUser] = useState(userData);

    useEffect(() => {
        setUser(userData);
    }, [userData]);

    // ✅ Upload Profile Picture
    const handleProfilePictureChange = (event) => {
        if (isPublic) return;
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUser((prev) => ({ ...prev, profilePicture: e.target.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    // ✅ Upload Cover Image
    const handleCoverImageChange = (event) => {
        if (isPublic) return;
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUser((prev) => ({ ...prev, coverImage: e.target.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    // ✅ Delete profile/cover
    const handleDeleteProfilePicture = () => {
        if (isPublic) return;
        setUser((prev) => ({ ...prev, profilePicture: null }));
    };

    const handleDeleteCoverImage = () => {
        if (isPublic) return;
        setUser((prev) => ({ ...prev, coverImage: null }));
    };

    if (!user) return null;

    return (
        <Box className="profile-header">
            {/* Cover Image Section */}
            <Box className="cover-container">
                <img
                    src={user.coverImage || "/default-cover.jpg"}
                    alt="Cover"
                    className="cover-image"
                />

                {/* Upload/Delete Cover */}
                {!isPublic && (
                    <>
                        <IconButton component="label" className="edit-cover-btn">
                            <CameraAltIcon />
                            <input type="file" hidden onChange={handleCoverImageChange} />
                        </IconButton>
                        {user.coverImage && (
                            <IconButton className="delete-cover-btn" onClick={handleDeleteCoverImage}>
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </>
                )}
            </Box>

            {/* Profile Info */}
            <Box className="profile-info">
                <Box className="avatar-container">
                    <Avatar
                        src={user.profilePicture || "/default-avatar.png"}
                        className="profile-avatar"
                    />

                    {/* Upload/Delete Avatar */}
                    {!isPublic && (
                        <>
                            <IconButton component="label" className="edit-avatar-btn">
                                <CameraAltIcon />
                                <input type="file" hidden onChange={handleProfilePictureChange} />
                            </IconButton>
                            {user.profilePicture && (
                                <IconButton className="delete-avatar-btn" onClick={handleDeleteProfilePicture}>
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </>
                    )}
                </Box>

                <Box className="details-container">
                    <Typography variant="h4">{user.name} {user.surname}</Typography>
                    <Typography variant="h6" className="role-text">{user.role}</Typography>
                    <Typography variant="body2" className="job-role">{user.jobRole}</Typography>
                    <Typography variant="body2" className="job-category">{user.jobSeekingCategory}</Typography>
                </Box>
            </Box>

            <Box className="jobs-confirmed">
                <Typography variant="h6">Total Jobs Confirmed: {user.jobsConfirmed || 0}</Typography>
            </Box>
        </Box>
    );
};

export default ProfileTalentHeader;
