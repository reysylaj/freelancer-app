import { useState } from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/ProfileTalentHeader.css";

const ProfileTalentHeader = () => {
    const { authUser } = useAuth();

    const [user, setUser] = useState(authUser);

    // ✅ Handle Profile Picture Upload
    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUser((prev) => ({ ...prev, profilePicture: e.target.result }));
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
                setUser((prev) => ({ ...prev, coverImage: e.target.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    // ✅ Delete Profile Picture
    const handleDeleteProfilePicture = () => {
        setUser((prev) => ({ ...prev, profilePicture: null }));
    };

    // ✅ Delete Cover Image
    const handleDeleteCoverImage = () => {
        setUser((prev) => ({ ...prev, coverImage: null }));
    };

    return (
        <Box className="profile-header">
            {/* Cover Image Section */}
            <Box className="cover-container">
                <img
                    src={user.coverImage || "/default-cover.jpg"}
                    alt="Cover"
                    className="cover-image"
                />

                {/* Upload Cover Button */}
                <IconButton component="label" className="edit-cover-btn">
                    <CameraAltIcon />
                    <input type="file" hidden onChange={handleCoverImageChange} />
                </IconButton>

                {/* Delete Cover Button */}
                {user.coverImage && (
                    <IconButton className="delete-cover-btn" onClick={handleDeleteCoverImage}>
                        <DeleteIcon />
                    </IconButton>
                )}
            </Box>

            {/* Profile Info */}
            <Box className="profile-info">
                <Box className="avatar-container">
                    <Avatar src={user.profilePicture || "/default-avatar.png"} className="profile-avatar" />

                    {/* Upload Profile Picture Button */}
                    <IconButton component="label" className="edit-avatar-btn">
                        <CameraAltIcon />
                        <input type="file" hidden onChange={handleProfilePictureChange} />
                    </IconButton>

                    {/* Delete Profile Picture Button */}
                    {user.profilePicture && (
                        <IconButton className="delete-avatar-btn" onClick={handleDeleteProfilePicture}>
                            <DeleteIcon />
                        </IconButton>
                    )}
                </Box>

                {/* User Details */}
                <Box className="details-container">
                    <Typography variant="h4">{user.name} {user.surname}</Typography>
                    <Typography variant="h6" className="role-text">{user.role}</Typography>
                    <Typography variant="body2" className="job-role">{user.jobRole}</Typography>
                    <Typography variant="body2" className="job-category">{user.jobSeekingCategory}</Typography>
                </Box>
            </Box>

            {/* Jobs Confirmed */}
            <Box className="jobs-confirmed">
                <Typography variant="h6">Total Jobs Confirmed: {user.jobsConfirmed || 0}</Typography>
            </Box>
        </Box>
    );
};

export default ProfileTalentHeader;
