import { useState } from "react";
import {
    Box,
    Avatar,
    Button,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import ArticleIcon from "@mui/icons-material/Article";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/ProfileAgencyCreatePost.css";

const ProfileAgencyCreatePost = ({ onPostSubmit }) => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {
        agencyName: "Agency Name",
        profilePicture: "/default-avatar.png",
    };

    const [open, setOpen] = useState(false);
    const [postText, setPostText] = useState("");
    const [postImage, setPostImage] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Handle Image Upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => setPostImage(event.target.result);
            reader.readAsDataURL(file);
        }
    };

    // Handle Posting
    const handlePost = () => {
        if (postText.trim() === "" && !postImage) return;

        const newPost = {
            id: Date.now(),
            agencyName: storedUser.agencyName,
            profilePicture: storedUser.profilePicture,
            text: postText,
            image: postImage,
            date: new Date().toLocaleDateString(),
        };

        // Store post in LocalStorage
        const existingPosts = JSON.parse(localStorage.getItem("agencyPosts")) || [];
        const updatedPosts = [newPost, ...existingPosts];
        localStorage.setItem("agencyPosts", JSON.stringify(updatedPosts));

        // Pass the post to parent component
        if (onPostSubmit) onPostSubmit(newPost);

        setPostText("");
        setPostImage(null);
        handleClose();
    };

    return (
        <Box className="create-post-container">
            {/* Post Input Box */}
            <Box className="post-input-box" onClick={handleOpen}>
                <Avatar src={storedUser.profilePicture} className="post-avatar" />
                <TextField className="post-text-field" placeholder="Create a job post..." fullWidth disabled />
            </Box>

            {/* Action Buttons */}
            <Box className="post-actions">
                <Button startIcon={<ImageIcon />} component="label" className="post-action-button">
                    Photo
                    <input type="file" hidden onChange={handleImageUpload} />
                </Button>
                <Button startIcon={<VideoLibraryIcon />} className="post-action-button">Video</Button>
                <Button startIcon={<ArticleIcon />} className="post-action-button">Write an article</Button>
            </Box>

            {/* Post Modal */}
            <Dialog open={open} onClose={handleClose} className="post-dialog">
                <DialogTitle>
                    <Box className="post-header">
                        <Avatar src={storedUser.profilePicture} className="post-modal-avatar" />
                        <span>{storedUser.agencyName}</span>
                        <IconButton className="close-button" onClick={handleClose}><CloseIcon /></IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                        placeholder="Describe the job opportunity..."
                        value={postText}
                        onChange={(e) => setPostText(e.target.value)}
                        className="post-textarea"
                    />
                    {postImage && <img src={postImage} alt="Post" className="post-preview" />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePost} className="post-submit-button">Post</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProfileAgencyCreatePost;
