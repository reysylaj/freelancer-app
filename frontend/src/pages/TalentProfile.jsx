import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // ✅ Import useParams
import { Box, Typography } from "@mui/material";
import ProfileTalentHeader from "../components/ProfileTalentHeader";
import ProfileTalentSkills from "../components/ProfileTalentSkills";
import ProfileTalentCreatePost from "../components/ProfileTalentCreatePost";
import ProfileTalentRecentProjects from "../components/ProfileTalentRecentProjects";
import ProfileTalentSavedJobs from "../components/ProfileTalentSavedJobs";
import ProfileTalentClientHistory from "../components/ProfileTalentClientHistory";
import ProfileTalentDashboardEarnings from "../components/ProfileTalentDashboardEarnings";
import ProfileTalentMessenger from "../components/ProfileTalentMessenger";
import ProfileTalentTestimonials from "../components/ProfileTalentTestimonial";
import ProfileTalentTotalProposalsSent from "../components/ProfileTalentTotalProposalsSent";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/TalentProfile.css";

const TalentProfile = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the talent ID from URL
    const [talent, setTalent] = useState(null);
    const [recentProjects, setRecentProjects] = useState([]);

    useEffect(() => {
        let storedTalents = JSON.parse(localStorage.getItem("users")) || [];
        let storedUser = JSON.parse(localStorage.getItem("user"));

        let foundTalent = storedTalents.find(t => t.id.toString() === id);

        if (!foundTalent) {
            foundTalent = storedUser;
        }

        if (foundTalent) {
            setTalent(foundTalent);
            console.log("✅ Loaded Talent Profile:", foundTalent);
        } else {
            console.error("❌ No talent profile found!");
        }
    }, [id]);

    // ✅ Function to add a new post
    const addPost = () => {
        // No need to manage posts here anymore, we use localStorage + event instead
        window.dispatchEvent(new Event("projectUpdated"));
    };

    if (!talent) {
        return <Typography variant="h4">Talent Profile Not Found</Typography>;
    } 

    return (
        <>
            <Header />
            <Box className="profile-container">
                <ProfileTalentHeader user={talent} />
                <ProfileTalentSkills />
                <ProfileTalentCreatePost addPost={addPost} />
                <ProfileTalentRecentProjects posts={recentProjects} />
                <ProfileTalentSavedJobs />
                <ProfileTalentTotalProposalsSent />
                <ProfileTalentMessenger />

            </Box>
            <Footer />
        </>
    );
}; 

export default TalentProfile;
