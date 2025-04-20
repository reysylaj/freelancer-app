import { Box } from "@mui/material";
import ProfileAgencyHeader from "../components/ProfileAgencyHeader.jsx";
import ProfileAgencySkills from "../components/ProfileAgencySkills.jsx";
import ProfileAgencyCreatePost from "../components/ProfileAgencyCreatePost.jsx";
import ProfileAgencyRecentProjects from "../components/ProfileAgencyRecentProjects.jsx";
import ProfileAgencySavedJobs from "../components/ProfileAgencySavedJobs.jsx";
import ProfileAgencyProposals from "../components/ProfileAgencyProposals.jsx";
import ProfileAgencyClientHistory from "../components/ProfileAgencyClientHistory.jsx";
import ProfileAgencySavedClients from "../components/ProfileAgencySavedClients.jsx";
import ProfileAgencyEarnings from "../components/ProfileAgencyEarningsDashboard.jsx";
import ProfileAgencyMessenger from "../components/ProfileAgencyMessenger.jsx";
import ProfileAgencyTestimonials from "../components/ProfileAgencyTestimonials.jsx";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/AgencyProfile.css";

const AgencyProfile = () => {
    return (
        <>
            <Header />
            <Box className="agency-profile-container">
                {/* Header Section */}
                <ProfileAgencyHeader />

                {/* About & Skills */}
                <ProfileAgencySkills />

                {/* Post Creation */}
                <ProfileAgencyCreatePost />

                {/* Recent Projects */}
                <ProfileAgencyRecentProjects />

                {/* Saved Job Posts */}
                <ProfileAgencySavedJobs />

                {/* Total Proposals Sent */}
                <ProfileAgencyProposals />

                {/* Client History */}
                <ProfileAgencyClientHistory />

                {/* Saved Clients */}
                <ProfileAgencySavedClients />

                {/* Earnings Dashboard */}
                <ProfileAgencyEarnings />

                {/* Messaging System */}
                <ProfileAgencyMessenger />

                {/* Testimonials */}
                <ProfileAgencyTestimonials />
            </Box>
            <Footer />
        </>
    );
};

export default AgencyProfile;
