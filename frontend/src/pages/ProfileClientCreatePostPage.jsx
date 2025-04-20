import { useState } from "react";
import {
    Box, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel,
    Card, CardContent, IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/ProfileClientCreatePostPage.css";

const ProfileClientCreatePostPage = () => {
    const navigate = useNavigate();

    // ✅ State for job fields
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [budget, setBudget] = useState("");
    const [jobType, setJobType] = useState("Full-Time");
    const [seniorityLevel, setSeniorityLevel] = useState("Junior");
    const [workMode, setWorkMode] = useState("On-Site");
    const [attachments, setAttachments] = useState([]);

    // ✅ Get current user
    const storedUser = JSON.parse(localStorage.getItem("user")) || { name: "Company Name" };

    // ✅ Handle File Upload
    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setAttachments((prev) => [...prev, ...files]);
    };

    // ✅ Remove an attachment
    const handleRemoveAttachment = (index) => {
        setAttachments(attachments.filter((_, i) => i !== index));
    };

    // ✅ Handle job submission
    const handlePostJob = () => {
        if (!jobTitle || !jobDescription || !budget) {
            alert("Please fill in all fields before posting.");
            return;
        }

        const newJob = {
            id: Date.now(),
            title: jobTitle,
            description: jobDescription,
            budget,
            jobType,
            seniorityLevel,
            workMode,
            date: new Date().toLocaleDateString(),
            user: storedUser.name,
            attachments,
        };

        // ✅ Save job to localStorage for both Client Listings & Public Listings
        const allJobs = JSON.parse(localStorage.getItem("allJobs")) || [];
        const updatedJobs = [newJob, ...allJobs];
        localStorage.setItem("allJobs", JSON.stringify(updatedJobs));

        // ✅ Redirect to job listings
        navigate("/client-profile/${clientId}");
    };

    return (
        <>
            <Header />
            <Box sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3, bgcolor: "white", borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h4" gutterBottom>Create a Job Post</Typography>

                <TextField label="Job Title" fullWidth value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} sx={{ mb: 2 }} />
                <TextField label="Job Description" fullWidth multiline rows={4} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} sx={{ mb: 2 }} />
                <TextField label="Budget (ALL)" fullWidth type="number" value={budget} onChange={(e) => setBudget(e.target.value)} sx={{ mb: 2 }} />

                {/* Job Type Selection */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Job Type</InputLabel>
                    <Select value={jobType} onChange={(e) => setJobType(e.target.value)}>
                        <MenuItem value="Full-Time">Full-Time</MenuItem>
                        <MenuItem value="Part-Time">Part-Time</MenuItem>
                        <MenuItem value="Contract">Contract</MenuItem>
                        <MenuItem value="Internship">Internship</MenuItem>
                        <MenuItem value="Temporary">Temporary</MenuItem>
                        <MenuItem value="Freelancing">Freelancing</MenuItem>
                    </Select>
                </FormControl>

                {/* Seniority Level Selection */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Seniority Level</InputLabel>
                    <Select value={seniorityLevel} onChange={(e) => setSeniorityLevel(e.target.value)}>
                        <MenuItem value="Intern">Intern</MenuItem>
                        <MenuItem value="Junior">Junior</MenuItem>
                        <MenuItem value="Junior-Mid">Junior-Mid</MenuItem>
                        <MenuItem value="Mid">Mid</MenuItem>
                        <MenuItem value="Mid-Senior">Mid-Senior</MenuItem>
                        <MenuItem value="Senior">Senior</MenuItem>
                    </Select>
                </FormControl>

                {/* Work Mode Selection */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Work Mode</InputLabel>
                    <Select value={workMode} onChange={(e) => setWorkMode(e.target.value)}>
                        <MenuItem value="On-Site">On-Site</MenuItem>
                        <MenuItem value="Fully Remote">Fully Remote</MenuItem>
                        <MenuItem value="Hybrid">Hybrid</MenuItem>
                    </Select>
                </FormControl>

                {/* File Upload */}
                <Box sx={{ mb: 2 }}>
                    <Button variant="contained" component="label" startIcon={<CloudUploadIcon />}>
                        Attach Files
                        <input type="file" hidden multiple onChange={handleFileUpload} />
                    </Button>
                </Box>

                {/* Display Uploaded Files */}
                {attachments.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body1">Attachments:</Typography>
                        {attachments.map((file, index) => (
                            <Card key={index} sx={{ display: "flex", alignItems: "center", p: 1, my: 1, boxShadow: 2 }}>
                                <CardContent sx={{ flex: 1 }}>
                                    <Typography variant="body2">{file.name}</Typography>
                                </CardContent>
                                <IconButton onClick={() => handleRemoveAttachment(index)}><DeleteIcon /></IconButton>
                            </Card>
                        ))}
                    </Box>
                )}

                {/* Post Job Button */}
                <Button variant="contained" color="primary" fullWidth onClick={handlePostJob}>
                    Post Job
                </Button>
            </Box>
            <Footer />
        </>
    );
};

export default ProfileClientCreatePostPage;
