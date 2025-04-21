import { useState } from "react";
import {
    Box,
    Avatar,
    Button,
    TextField,
    Typography,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/ProfileClientCreateJob.css";
import { createJob } from "../services/jobService";

const ProfileClientCreateJob = () => {
    const navigate = useNavigate();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const clientId = storedUser?.id;

    if (!storedUser || !clientId) {
        alert("You must be logged in as a client to create a job.");
        navigate("/login");
        return null;
    }

    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [budget, setBudget] = useState("");
    const [jobType, setJobType] = useState("Full-Time");
    const [workMode, setWorkMode] = useState("On-Site");

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
            workMode,
            clientId,
            seniorityLevel: "Junior",
        };

        console.log("🚀 Sending job to backend:", newJob); // ✅ DEBUG


        try {
            const response = await createJob(newJob);
            console.log("✅ Response from backend:", response); // ✅ DEBUG
            window.dispatchEvent(new Event("jobPostedByClient"));
            navigate(`/client-profile/${clientId}`);
        } catch (error) {
            console.error("❌ Failed to create job:", error.response?.data || error);
            alert("Error creating job.");
        }
    };

    return (
        <Box className="create-job-form-container">
            <Paper elevation={3} className="job-form-paper">
                <Box className="job-form-header">
                    <Avatar src={storedUser.profilePicture} className="job-form-avatar" />
                    <Typography variant="h5">Create a Job</Typography>
                </Box>

                <TextField
                    label="Job Title"
                    fullWidth
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Job Description"
                    fullWidth
                    multiline
                    rows={4}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Budget (ALL)"
                    fullWidth
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Job Type</InputLabel>
                    <Select value={jobType} onChange={(e) => setJobType(e.target.value)}>
                        <MenuItem value="Full-Time">Full-Time</MenuItem>
                        <MenuItem value="Part-Time">Part-Time</MenuItem>
                        <MenuItem value="Contract">Contract</MenuItem>
                        <MenuItem value="Temporary">Temporary</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Work Mode</InputLabel>
                    <Select value={workMode} onChange={(e) => setWorkMode(e.target.value)}>
                        <MenuItem value="On-Site">On-Site</MenuItem>
                        <MenuItem value="Fully Remote">Fully Remote</MenuItem>
                        <MenuItem value="Hybrid">Hybrid</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handlePostJob}
                >
                    Post Job
                </Button>
            </Paper>
        </Box>
    );
};

export default ProfileClientCreateJob;
