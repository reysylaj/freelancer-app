import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import ProfileTalentHeader from "../components/ProfileTalentHeader";
import ProfileTalentSkills from "../components/ProfileTalentSkills";
import ProfileTalentCreatePost from "../components/ProfileTalentCreatePost";
import ProfileTalentRecentProjects from "../components/ProfileTalentRecentProjects";
import ProfileTalentSavedJobs from "../components/ProfileTalentSavedJobs";
import ProfileTalentMessenger from "../components/ProfileTalentMessenger";
import ProfileTalentTotalProposalsSent from "../components/ProfileTalentTotalProposalsSent";
import Header from "../components/Header";
import Footer from "../components/Footer"; 
import "../styles/TalentProfile.css";
import { useAuth } from "../context/AuthContext"; // ✅

const TalentProfile = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { authUser, loading } = useAuth(); // ✅
    const [refreshProjects, setRefreshProjects] = useState(false);
    const [recentProjects, setRecentProjects] = useState([]);

    useEffect(() => {
        if (!loading && !authUser) {
            navigate("/login"); // ✅ redirect if not logged in
        }
    }, [loading, authUser, navigate]);

    if (loading) return <Typography variant="h4">Loading...</Typography>;

    if (!authUser || authUser.id.toString() !== id) {
        return <Typography variant="h4">Unauthorized or profile not found</Typography>;
    }

    const addPost = (newProject) => {
        setRecentProjects(prev => [newProject, ...prev]); // push new project at the top
    };


    return (
        <>
            <Header />
            <Box className="profile-container">
                <ProfileTalentHeader user={authUser} />
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
