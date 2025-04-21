import { useState } from "react";
import {
    Box, TextField, Button, Typography, Select, MenuItem, FormControl,
    InputLabel, Card, CardContent, IconButton, Dialog, DialogTitle,
    DialogContent, DialogActions, Avatar
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { createJob } from "../services/jobService"; //


const ProfileClientCreatePostPopup = ({ onJobPosted = () => { } }) => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || { name: "Company Name", profilePicture: "" };
    const clientId = storedUser?.id;

    const [open, setOpen] = useState(false);
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [budget, setBudget] = useState("");
    const [jobType, setJobType] = useState("Full-Time");
    const [seniorityLevel, setSeniorityLevel] = useState("Junior");
    const [workMode, setWorkMode] = useState("On-Site");
    const [attachments, setAttachments] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setAttachments((prev) => [...prev, ...files]);
    };

    const handleRemoveAttachment = (index) => {
        setAttachments(attachments.filter((_, i) => i !== index));
    };

    const handlePostJob = async () => {
        if (!jobTitle || !jobDescription || !budget) {
            alert("Please fill in all fields before posting.");
            return;
        }

        const newJob = {
            title: jobTitle,
            description: jobDescription,
            budget: parseInt(budget),
            jobType,
            seniorityLevel,
            workMode,
            clientId: Number(clientId),
        };

        try {
            await createJob(newJob); // 🔗 Save to backend only
            window.dispatchEvent(new Event("jobPostedByClient")); // 🧠 Notify others (if needed)
            onJobPosted(newJob); // Callback

            // Clear form
            setJobTitle(""); setJobDescription(""); setBudget("");
            setJobType("Full-Time"); setSeniorityLevel("Junior");
            setWorkMode("On-Site"); setAttachments([]);
            handleClose();
        } catch (err) {
            console.error("Error creating job:", err);
            alert("Failed to create job.");
        }
    };

    return (
        <>
            <Box className="create-job-button-container">
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    ➕ Create a New Job
                </Button>
            </Box>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center" gap={2}>
                            <Avatar src={storedUser.profilePicture} />
                            <Typography variant="h6">{storedUser.name}</Typography>
                        </Box>
                        <IconButton onClick={handleClose}><CloseIcon /></IconButton>
                    </Box>
                </DialogTitle>

                <DialogContent>
                    <TextField label="Job Title" fullWidth sx={{ mb: 2 }} value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
                    <TextField label="Job Description" fullWidth multiline rows={4} sx={{ mb: 2 }} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
                    <TextField label="Budget (ALL)" fullWidth type="number" sx={{ mb: 2 }} value={budget} onChange={(e) => setBudget(e.target.value)} />

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Job Type</InputLabel>
                        <Select value={jobType} onChange={(e) => setJobType(e.target.value)}>
                            <MenuItem value="Full-Time">Full-Time</MenuItem>
                            <MenuItem value="Part-Time">Part-Time</MenuItem>
                            <MenuItem value="Freelance">Freelance</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Seniority</InputLabel>
                        <Select value={seniorityLevel} onChange={(e) => setSeniorityLevel(e.target.value)}>
                            <MenuItem value="Intern">Intern</MenuItem>
                            <MenuItem value="Junior">Junior</MenuItem>
                            <MenuItem value="Mid">Mid</MenuItem>
                            <MenuItem value="Senior">Senior</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Work Mode</InputLabel>
                        <Select value={workMode} onChange={(e) => setWorkMode(e.target.value)}>
                            <MenuItem value="On-Site">On-Site</MenuItem>
                            <MenuItem value="Remote">Remote</MenuItem>
                            <MenuItem value="Hybrid">Hybrid</MenuItem>
                        </Select>
                    </FormControl>

                    <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />} sx={{ mb: 2 }}>
                        Attach Files
                        <input type="file" hidden multiple onChange={handleFileUpload} />
                    </Button>

                    {attachments.length > 0 && (
                        <Box>
                            {attachments.map((file, index) => (
                                <Card key={index} sx={{ my: 1, p: 1, display: 'flex', justifyContent: 'space-between' }}>
                                    <CardContent>
                                        <Typography>{file.name}</Typography>
                                    </CardContent>
                                    <IconButton onClick={() => handleRemoveAttachment(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Card>
                            ))}
                        </Box>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button variant="contained" color="primary" fullWidth onClick={handlePostJob}>
                        Post Job
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ProfileClientCreatePostPopup;
