import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // ✅ Import for redirection
import ProfileClientHeader from "../components/ProfileClientHeader";
import ProfileClientJobListings from "../components/ProfileClientJobListings";
import ProfileClientJobDetails from "../components/ProfileClientJobDetails";
import ProfileClientReceivedProposals from "../components/ProfileClientReceivedProposals";
import ProfileClientMessenger from "../components/ProfileClientMessenger";
import ProfileClientWhoIs from "../components/ProfileClientWhoIs";
import ProfileClientSavedPostsTalents from "../components/ProfileClientSavedPostsTalents";

import ProfileClientCreatePostPopup from "../components/ProfileClientCreatePostPopup";
import { getAllJobs } from "../services/jobService"; // ✅ make sure this exists
import { useAuth } from "../context/AuthContext";


import "../styles/ClientProfile.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ClientProfile = () => {
    const { authUser } = useAuth();
    const navigate = useNavigate(); // ✅ Hook for navigation
    const [jobs, setJobs] = useState([]);

    const [jobRefreshTrigger, setJobRefreshTrigger] = useState(0);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const allJobs = await getAllJobs();
                const clientJobs = allJobs.filter(job => job.clientId === authUser?.id);
                setJobs(clientJobs);
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
            }
        };

        fetchJobs();
    }, [authUser?.id]);

    const handleNewJob = (newJob) => {
        const updatedJobs = [newJob, ...jobs];
        setJobs(updatedJobs);

        setJobRefreshTrigger((prev) => prev + 1); // 🔄 Trigger refresh
    };




    return (
        <>
            <Header />

            <Box className="client-profile-container">
                <ProfileClientHeader />
                <ProfileClientWhoIs />
                {/* ✅ Button to navigate to the Create Job Page */}
                <ProfileClientCreatePostPopup onJobPosted={handleNewJob} />


                <ProfileClientJobListings newJobCreated={jobs[0]} />
                <ProfileClientJobDetails />
                <ProfileClientReceivedProposals />
                <ProfileClientSavedPostsTalents />

                <ProfileClientMessenger />

            </Box>
            <Footer />
        </>
    );
};

export default ClientProfile;
