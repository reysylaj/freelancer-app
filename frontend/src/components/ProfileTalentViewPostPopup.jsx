import { useState, useEffect } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, MenuItem, Select,
    FormControl, InputLabel, Chip, Typography, Box, IconButton
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import AddLinkIcon from "@mui/icons-material/AddLink";
import CloseIcon from "@mui/icons-material/Close";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { updateProject, deleteProject } from "../services/projectService";

const roles = ["Developer", "Designer", "Project Manager", "QA Engineer", "Data Scientist"];
const tools = ["React", "Node.js", "Figma", "Python", "Docker", "Kubernetes", "Jira"];

const ProfileTalentViewPostPopup = ({ post, open, onClose, onUpdate, onDelete }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [role, setRole] = useState("");
    const [selectedTools, setSelectedTools] = useState([]);
    const [media, setMedia] = useState(null);
    const [links, setLinks] = useState([""]);

    useEffect(() => {
        if (post) {
            setTitle(post.title || "");
            setDescription(post.description || "");
            setRole(post.role || "");
            setSelectedTools(post.tools || []);
            setMedia(post.media || null);
            setLinks(post.links || [""]);
        }
    }, [post]);

    if (!post) return null;

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

    const handleSaveChanges = async () => {
        const updatedPost = {
            title,
            description,
            role,
            tools: selectedTools,
            media,
            links: links.filter(link => link.trim() !== "")
        };

        try {
            const savedProject = await updateProject(post.id, updatedPost);
            onUpdate(savedProject);
            window.dispatchEvent(new Event("projectUpdated"));
            onClose();
        } catch (err) {
            console.error("❌ Failed to update project:", err);
            alert("Failed to save changes.");
        }
    };

    const handleDeletePost = async () => {
        try {
            await deleteProject(post.id);
            onDelete(post.id);
            window.dispatchEvent(new Event("projectUpdated"));
            onClose();
        } catch (err) {
            console.error("❌ Failed to delete project:", err);
            alert("Failed to delete project.");
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6">Edit Project</Typography>
                    <IconButton onClick={onClose}><CloseIcon /></IconButton>
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
                <Button onClick={handleSaveChanges} variant="contained" color="primary">Save</Button>
                <Button onClick={handleDeletePost} variant="contained" color="error">Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProfileTalentViewPostPopup;
