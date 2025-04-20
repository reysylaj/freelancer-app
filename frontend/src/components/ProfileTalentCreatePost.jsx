// ✅ ProfileTalentCreatePost.jsx - UPDATED TO USE BACKEND
import { useState } from "react";
import {
    Box, Avatar, Button, IconButton, Dialog,
    DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, FormControl, InputLabel, Chip
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddLinkIcon from "@mui/icons-material/AddLink";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/ProfileTalentCreatePost.css";
import { createProject } from "../services/projectService";

const roles = ["Developer", "Designer", "Project Manager", "QA Engineer", "Data Scientist"];
const tools = ["React", "Node.js", "Figma", "Python", "Docker", "Kubernetes", "Jira"];

const ProfileTalentCreatePost = ({ addPost }) => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {
        name: "John Doe",
        profilePicture: "/default-avatar.png",
    };

    const talentId = storedUser.id;

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [role, setRole] = useState("");
    const [selectedTools, setSelectedTools] = useState([]);
    const [media, setMedia] = useState(null);
    const [links, setLinks] = useState([""]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setTitle(""); setDescription(""); setRole(""); setSelectedTools([]);
        setMedia(null); setLinks([""]); setOpen(false);
    };

    const handleMediaUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setMedia(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleLinkChange = (index, value) => {
        const updatedLinks = [...links];
        updatedLinks[index] = value;
        setLinks(updatedLinks);
    };

    const addNewLink = () => setLinks([...links, ""]);

    const handlePost = async () => {
        if (!title.trim() || !description.trim() || !role.trim() || selectedTools.length === 0) return;

        const newPost = {
            talentId,
            user: storedUser.name,
            profilePicture: storedUser.profilePicture,
            title,
            description,
            role,
            tools: selectedTools,
            media,
            links: links.filter(link => link.trim() !== ""),
        };

        try {
            await createProject(newPost);
            addPost();
            window.dispatchEvent(new Event("projectUpdated"));
            handleClose();
        } catch (err) {
            console.error("❌ Failed to post project:", err);
            alert("Failed to post project");
        }
    };

    return (
        <Box className="create-post-container">
            <Box className="post-input-box" onClick={handleOpen}>
                <Avatar src={storedUser.profilePicture} className="post-avatar" />
                <Box className="post-text-field">Create a new project...</Box>
            </Box>

            <Dialog open={open} onClose={handleClose} className="post-dialog" maxWidth="md" fullWidth>
                <DialogTitle>
                    <Box className="post-header">
                        <Avatar src={storedUser.profilePicture} className="post-modal-avatar" />
                        <span>{storedUser.name}</span>
                        <IconButton className="close-button" onClick={handleClose}><CloseIcon /></IconButton>
                    </Box>
                </DialogTitle>

                <DialogContent>
                    <TextField
                        fullWidth
                        label="Project Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        sx={{ mb: 2 }}
                    />

                    <ReactQuill
                        value={description}
                        onChange={setDescription}
                        placeholder="Project Description..."
                    />

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Role in Project</InputLabel>
                        <Select value={role} onChange={(e) => setRole(e.target.value)} required>
                            {roles.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Tools Used</InputLabel>
                        <Select
                            multiple
                            value={selectedTools}
                            onChange={(e) => setSelectedTools(e.target.value)}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => <Chip key={value} label={value} />)}
                                </Box>
                            )}
                        >
                            {tools.map((tool) => <MenuItem key={tool} value={tool}>{tool}</MenuItem>)}
                        </Select>
                    </FormControl>

                    <Typography sx={{ mt: 2 }}>Project Links:</Typography>
                    {links.map((link, index) => (
                        <TextField
                            key={index}
                            fullWidth
                            value={link}
                            onChange={(e) => handleLinkChange(index, e.target.value)}
                            sx={{ mb: 1 }}
                            placeholder="Add a project link"
                        />
                    ))}
                    <Button startIcon={<AddLinkIcon />} onClick={addNewLink} sx={{ mt: 1 }}>Add another link</Button>

                    <Typography sx={{ mt: 2 }}>Attach Media:</Typography>
                    <Button component="label" startIcon={<ImageIcon />} sx={{ mt: 1 }}>
                        Upload Image/Video
                        <input type="file" accept="image/*,video/*" hidden onChange={handleMediaUpload} />
                    </Button>
                    {media && <img src={media} alt="Preview" width="100%" style={{ marginTop: 10 }} />}
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={handlePost}
                        className="post-submit-button"
                        disabled={!title.trim() || !description.trim() || !role.trim() || selectedTools.length === 0}
                    >
                        Post
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProfileTalentCreatePost;
