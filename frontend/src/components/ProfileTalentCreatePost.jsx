import { useState } from "react";
import {
    Box, Avatar, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle,
    TextField, MenuItem, Select, FormControl, InputLabel, Chip, Typography
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import AddLinkIcon from "@mui/icons-material/AddLink";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/ProfileTalentCreatePost.css";
import { createProject } from "../services/projectService";
import { useAuth } from "../context/AuthContext";

const roles = ["Developer", "Designer", "Project Manager", "QA Engineer", "Data Scientist"];
const tools = ["React", "Node.js", "Figma", "Python", "Docker", "Kubernetes", "Jira"];

const ProfileTalentCreatePost = ({ addPost }) => {
    const { authUser } = useAuth();
    const talentId = authUser?.id;

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [role, setRole] = useState("");
    const [selectedTools, setSelectedTools] = useState([]);
    const [media, setMedia] = useState(null);
    const [links, setLinks] = useState([""]);

    const handleClose = () => {
        setTitle(""); setDescription(""); setRole(""); setSelectedTools([]);
        setMedia(null); setLinks([""]); setOpen(false);
    };

    const handleMediaUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setMedia(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handlePost = async () => {
        const post = {
            talentId,
            user: authUser?.name,
            profilePicture: authUser?.profilePicture || "/default-avatar.png",
            title,
            description,
            role,
            tools: selectedTools,
            media,
            links: links.filter(link => link.trim() !== ""),
        };

        try {
            await createProject(post);
            addPost(); // callback
            window.dispatchEvent(new Event("projectUpdated"));
            handleClose();
        } catch (err) {
            console.error("❌ Failed to create project:", err);
            alert("Failed to post project");
        }
    };

    return (
        <Box className="create-post-container">
            <Box className="post-input-box" onClick={() => setOpen(true)}>
                <Avatar src={authUser?.profilePicture} className="post-avatar" />
                <Box className="post-text-field">Create a new project...</Box>
            </Box>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>
                    <Box className="post-header">
                        <Avatar src={authUser?.profilePicture} className="post-modal-avatar" />
                        <span>{authUser?.name}</span>
                        <IconButton onClick={handleClose}><CloseIcon /></IconButton>
                    </Box>
                </DialogTitle>

                <DialogContent>
                    <TextField label="Project Title" value={title} fullWidth onChange={(e) => setTitle(e.target.value)} />
                    <ReactQuill value={description} onChange={setDescription} placeholder="Description" />

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Role</InputLabel>
                        <Select value={role} onChange={(e) => setRole(e.target.value)}>
                            {roles.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Tools</InputLabel>
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

                    <Typography sx={{ mt: 2 }}>Links</Typography>
                    {links.map((link, i) => (
                        <TextField
                            key={i}
                            fullWidth
                            value={link}
                            onChange={(e) => {
                                const copy = [...links];
                                copy[i] = e.target.value;
                                setLinks(copy);
                            }}
                            sx={{ mb: 1 }}
                        />
                    ))}
                    <Button startIcon={<AddLinkIcon />} onClick={() => setLinks([...links, ""])}>Add link</Button>

                    <Typography sx={{ mt: 2 }}>Media</Typography>
                    <Button component="label" startIcon={<ImageIcon />}>
                        Upload Image/Video
                        <input type="file" hidden onChange={handleMediaUpload} />
                    </Button>
                    {media && <img src={media} alt="preview" width="100%" style={{ marginTop: 10 }} />}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handlePost} disabled={!title || !description || !role || selectedTools.length === 0}>Post</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProfileTalentCreatePost;
