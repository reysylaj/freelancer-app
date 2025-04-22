import { useState, useEffect } from "react";
import {
    Box, Typography, Card, CardContent,
    CardActions, Button, Pagination
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClientProfilePopupViewCreatedPost from "./ClientProfilePopupViewCreatedPost";
import "../styles/ProfileClientJobListings.css";
import { getAllJobs } from "../services/jobService";
import { deleteJobById } from "../services/jobService";
import { useAuth } from "../context/AuthContext";

const ITEMS_PER_PAGE = 4;

const ProfileClientJobListings = () => {
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedJob, setSelectedJob] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);

    const { authUser } = useAuth();

    useEffect(() => {
        const loadJobs = async () => {
            try {
                const allJobs = await getAllJobs();
                const clientJobs = allJobs.filter(job => job.clientId === authUser?.id);
                setJobs(clientJobs);
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
            }
        };

        loadJobs(); // ✅ Load on first render
        window.addEventListener("jobPostedByClient", loadJobs);

        return () => {
            window.removeEventListener("jobPostedByClient", loadJobs); // ✅ Clean up listener
        };
    }, [authUser?.id]);

    const handleDelete = async (id) => {
        try {
            await deleteJobById(id); // ✅ delete from backend
            const updatedJobs = jobs.filter(job => job.id !== id);
            setJobs(updatedJobs);
        } catch (error) {
            console.error("❌ Failed to delete job:", error);
            alert("Failed to delete job.");
        }
    };

    const handleViewJob = (job) => {
        setSelectedJob(job);
        setOpenPopup(true);
    };

    const handleClosePopup = () => setOpenPopup(false);

    const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
    const paginatedJobs = jobs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        setTimeout(() => {
            const paginationElement = document.querySelector(".pagination-controls");
            if (paginationElement) {
                paginationElement.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }, 100);
    };

    return (
        <Box className="job-listings-container">
            <Typography variant="h5" className="job-listings-title">Job Listings</Typography>

            {jobs.length === 0 ? (
                <Typography className="no-jobs">No jobs posted yet.</Typography>
            ) : (
                <>
                    <Box className="cards-container">
                        {paginatedJobs.map((job) => (
                            <Card key={job.id} className="job-card">
                                <CardContent>
                                    <Typography variant="h6">{job.title}</Typography>
                                    <Typography variant="body2">{job.description}</Typography>
                                    <Typography>💰 <strong>Budget:</strong> {job.budget} ALL</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" startIcon={<VisibilityIcon />} onClick={() => handleViewJob(job)}>View</Button>
                                    <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(job.id)}>Delete</Button>
                                </CardActions>
                            </Card>
                        ))}
                    </Box>

                    {totalPages > 1 && (
                        <Box className="pagination-controls">
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                size="large"
                                shape="rounded"
                                color="primary"
                            />
                        </Box>
                    )}
                </>
            )}

            <ClientProfilePopupViewCreatedPost open={openPopup} job={selectedJob} onClose={handleClosePopup} />
        </Box>
    );
};

export default ProfileClientJobListings;
