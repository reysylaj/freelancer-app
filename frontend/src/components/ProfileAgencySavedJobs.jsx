import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    IconButton,
    Avatar
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../styles/ProfileAgencySavedJobs.css";

const ProfileAgencySavedJobs = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const jobsPerPage = 4;

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("agencySavedJobs")) || [];
        setSavedJobs(saved);
    }, []);

    // Handle delete saved job
    const handleRemove = (id) => {
        const updatedJobs = savedJobs.filter(job => job.id !== id);
        setSavedJobs(updatedJobs);
        localStorage.setItem("agencySavedJobs", JSON.stringify(updatedJobs));
    };

    // Handle pagination
    const totalPages = Math.ceil(savedJobs.length / jobsPerPage);
    const paginatedJobs = savedJobs.slice(currentPage * jobsPerPage, (currentPage + 1) * jobsPerPage);

    return (
        <Box className="saved-jobs-container">
            <Typography variant="h5" className="saved-jobs-title">Saved Jobs</Typography>

            {savedJobs.length === 0 ? (
                <Typography className="no-saved-jobs">No saved jobs yet.</Typography>
            ) : (
                <Box className="saved-jobs-grid">
                    {paginatedJobs.map((job) => (
                        <Card key={job.id} className="job-card">
                            <CardContent>
                                <Box className="job-header">
                                    <Avatar src={job.clientProfile} className="job-avatar" />
                                    <Typography variant="h6">{job.clientName}</Typography>
                                </Box>
                                <Typography variant="body2">{job.description}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    href={job.link}
                                    target="_blank"
                                >
                                    View Job
                                </Button>
                                <IconButton onClick={() => handleRemove(job.id)} className="delete-button">
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <Box className="pagination-controls">
                    <Button
                        startIcon={<ArrowBackIosIcon />}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                        disabled={currentPage === 0}
                    >
                        Previous
                    </Button>
                    <Typography className="page-indicator">{currentPage + 1} / {totalPages}</Typography>
                    <Button
                        endIcon={<ArrowForwardIosIcon />}
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
                        disabled={currentPage === totalPages - 1}
                    >
                        Next
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default ProfileAgencySavedJobs;
