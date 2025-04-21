import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ProfileTalentHeader from "../components/ProfileTalentHeader";
import ProfileTalentSkills from "../components/ProfileTalentSkills";
import ProfileTalentRecentProjects from "../components/ProfileTalentRecentProjects";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getUserById } from "../services/userService";
import { getProjectsByTalentId } from "../services/projectService";

const ViewTalentPublicProfile = () => {
    const { id } = useParams();
    const [talent, setTalent] = useState(null);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const loadTalent = async () => {
            try {
                const talentData = await getUserById(id);
                setTalent(talentData);

                const projectData = await getProjectsByTalentId(id);
                setProjects(projectData);
            } catch (error) {
                console.error("Failed to load talent:", error);
                setTalent(null); // to show "Talent not found"
            }
        };

        loadTalent();
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
