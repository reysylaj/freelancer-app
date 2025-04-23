import { useState, useEffect } from "react";
import {
    Box, Typography, Card, CardContent, CardMedia,
    CardActions, Button, Pagination, Avatar, Chip
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TalentProfileViewJobBeforeSubmitProposal from "../components/TalentProfileViewJobBeforeSubmitProposal"; // ✅ First Popup
import TalentProfileSendFinalSubmitProposal from "../components/TalentProfileSendFinalSubmitProposal"; // ✅ Second Popup
import { getSavedJobs, removeSavedJobFromBackend } from "../services/savedJobService";
import { useAuth } from "../context/AuthContext"; // ✅ add this if missing

import "../styles/ProfileTalentSavedJobs.css";

const ITEMS_PER_PAGE = 4;

const ProfileTalentSavedJobs = () => {
    const { authUser } = useAuth();
    const talentId = authUser?.id;
    const [likedJobs, setLikedJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedJobs, setPaginatedJobs] = useState([]);


    // ✅ Popup States
    const [selectedJob, setSelectedJob] = useState(null);
    const [openJobPopup, setOpenJobPopup] = useState(false);
    const [openProposalPopup, setOpenProposalPopup] = useState(false);


    useEffect(() => {
        const fetchSaved = async () => {
            try {
                const savedFromBackend = await getSavedJobs(talentId); // Pass it if needed
                setLikedJobs(savedFromBackend);
                updatePaginatedJobs(1, savedFromBackend);
            } catch (error) {
                console.error("Failed to fetch saved jobs:", error);
            }
        };

        fetchSaved();

        const handleSavedJobsUpdate = () => fetchSaved();
        window.addEventListener("savedJobsUpdated", handleSavedJobsUpdate);
        return () => window.removeEventListener("savedJobsUpdated", handleSavedJobsUpdate);
    }, [talentId]); // 🔁 add dependency if needed




    const updatePaginatedJobs = (page, jobs = likedJobs) => {
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        setPaginatedJobs(jobs.slice(startIndex, endIndex));
        setCurrentPage(page);
    };

    const handlePageChange = (event, value) => {
        updatePaginatedJobs(value);
    };

    // ✅ Remove saved job
    const handleRemoveJob = async (id) => {
        try {
            await removeSavedJobFromBackend(id);
            const updated = likedJobs.filter(job => job.id !== id && job.jobId !== id);
            setLikedJobs(updated);
            updatePaginatedJobs(currentPage, updated);
            window.dispatchEvent(new Event("savedJobsUpdated")); // 👈 optional
        } catch (error) {
            console.error("Failed to remove saved job:", error);
        }
    };

    // ✅ Open Job Details Popup First
    const handleOpenJobPopup = (job) => {
        setSelectedJob(job);
        setOpenJobPopup(true);
    };

    // ✅ Close Job Details Popup
    const handleCloseJobPopup = () => {
        setOpenJobPopup(false);
        setSelectedJob(null);
    };

    // ✅ Open Proposal Submission Popup After Job Details
    const handleOpenProposalPopup = () => {
        setOpenJobPopup(false); // Close first popup
        setOpenProposalPopup(true); // Open second popup
    };

    // ✅ Close Proposal Popup
    const handleCloseProposalPopup = () => {
        setOpenProposalPopup(false);
        setSelectedJob(null);
    };

    return (
        <Box className="saved-jobs-container">
            <Typography variant="h5" className="saved-jobs-title">Saved Jobs ❤️</Typography>

            {paginatedJobs.length === 0 ? (
                <Typography className="no-jobs">No saved jobs yet.</Typography>
            ) : (
                <Box className="cards-container">
                    {paginatedJobs.map((job) => (
                        <Card key={job.id} className="saved-job-card">
                            <CardContent>
                                {/* 🔹 User Info */}
                                <Box display="flex" alignItems="center">
                                    <Avatar src="/default-avatar.png" className="user-avatar" />
                                    <Box ml={2}>
                                        <Typography variant="h6">Client ID: {job.job?.clientId || "Unknown"}</Typography>
                                        <Typography variant="caption" color="textSecondary">
                                            Saved at: {new Date(job.savedAt).toLocaleDateString() || "No Date"}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* 🔹 Job Title */}
                                <Typography variant="h6" className="job-title">
                                    {job.job?.title || "Untitled Job"}
                                </Typography>

                                {/* 🔹 Job Budget */}
                                <Typography className="job-budget">
                                    💰 Budget: {job.job?.budget || "N/A"} ALL
                                </Typography>

                                {/* 🔹 Job Work Mode & Type */}
                                <Typography className="job-workMode"><strong>Work Mode:</strong> {job.job?.workMode || "N/A"}</Typography>
                                <Typography className="job-type"><strong>Job Type:</strong> {job.job?.jobType || "N/A"}</Typography>
                                <Typography className="job-seniorityLevel"><strong>Seniority Level:</strong> {job.job?.seniorityLevel || "N/A"}</Typography>

                                {/* 🔹 Job Description */}
                                <Typography className="job-description">
                                    {job.job?.description
                                        ? job.job.description.replace(/<[^>]+>/g, "").substring(0, 100) + "..."
                                        : "No description available"}
                                </Typography>
                            </CardContent>

                            {/* 🔹 Remove + View Buttons */}
                            <CardActions className="card-actions">
                                <Button size="small" startIcon={<DeleteIcon />} onClick={() => handleRemoveJob(job.id)}>
                                    Remove
                                </Button>
                                <Button size="small" startIcon={<VisibilityIcon />} onClick={() => handleOpenJobPopup(job)}>
                                    View
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            )}

            {/* 🔹 Pagination */}
            <Box className="pagination-controls">
                <Pagination
                    count={Math.ceil((likedJobs.length || 1) / ITEMS_PER_PAGE)}
                    page={currentPage}
                    onChange={handlePageChange}
                    size="large"
                    shape="rounded"
                    color="primary"
                />
            </Box>

            {/* ✅ Popups */}
            <TalentProfileViewJobBeforeSubmitProposal
                job={selectedJob}
                open={openJobPopup}
                onClose={handleCloseJobPopup}
                onSendProposal={handleOpenProposalPopup}
            />

            <TalentProfileSendFinalSubmitProposal
                job={selectedJob}
                open={openProposalPopup}
                onClose={handleCloseProposalPopup}
            />
        </Box>
    );


};

export default ProfileTalentSavedJobs;
