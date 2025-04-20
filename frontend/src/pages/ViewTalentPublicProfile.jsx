import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ProfileTalentHeader from "../components/ProfileTalentHeader";
import ProfileTalentSkills from "../components/ProfileTalentSkills";
import ProfileTalentRecentProjects from "../components/ProfileTalentRecentProjects";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ViewTalentPublicProfile = () => {
    const { id } = useParams(); // talent ID from URL
    const [talent, setTalent] = useState(null);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const foundTalent = users.find((u) => u.id === parseInt(id));
        setTalent(foundTalent);

        const allProjects = JSON.parse(localStorage.getItem("recentProjects")) || [];
        const filteredProjects = allProjects.filter((proj) => proj.talentId === parseInt(id));
        setProjects(filteredProjects);
    }, [id]);

    if (!talent) {
        return <Typography variant="h5">Talent not found</Typography>;
    }

    return (
        <>
            <Header />
            <Box sx={{ padding: 4 }}>
                <ProfileTalentHeader user={talent} />
                <ProfileTalentSkills user={talent} readOnly />
                <ProfileTalentRecentProjects posts={projects} />
            </Box>
            <Footer />
        </>
    );
};

export default ViewTalentPublicProfile;
