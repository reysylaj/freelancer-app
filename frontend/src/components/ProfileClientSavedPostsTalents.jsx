import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Avatar,
    Button,
    Pagination
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClientProfileViewProjectBeforeContact from "./ClientProfileViewProjectBeforeContact";
import { getAllProjects } from "../services/projectService";
import "../styles/ProfileClientSavedPostsTalents.css";

const ITEMS_PER_PAGE = 4;

const ProfileClientSavedPostsTalents = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const clientId = storedUser.id;

    const [allProjects, setAllProjects] = useState([]);
    const [savedProjects, setSavedProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedProjects, setPaginatedProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);

    // ✅ Load all projects from backend
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getAllProjects();
                setAllProjects(data);
            } catch (error) {
                console.error("❌ Failed to fetch projects from backend", error);
            }
        };

        fetchProjects();
    }, []);

    // ✅ Load saved projects from localStorage per client
    useEffect(() => {
        const allSaved = JSON.parse(localStorage.getItem("savedClientProjects")) || {};
        const savedIds = allSaved[clientId] || [];
        const matched = allProjects.filter(project => savedIds.some(p => p.id === project.id));

        setSavedProjects(matched);
        setPaginatedProjects(matched.slice(0, ITEMS_PER_PAGE));
    }, [allProjects, clientId]);

    const handleRemoveProject = (id) => {
        const updatedSaved = savedProjects.filter(p => p.id !== id);
        setSavedProjects(updatedSaved);
        setPaginatedProjects(updatedSaved.slice(0, ITEMS_PER_PAGE));

        // ✅ Update localStorage
        const allSaved = JSON.parse(localStorage.getItem("savedClientProjects")) || {};
        allSaved[clientId] = updatedSaved;
        localStorage.setItem("savedClientProjects", JSON.stringify(allSaved));
    };

    const handlePageChange = (event, value) => {
        const start = (value - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        setPaginatedProjects(savedProjects.slice(start, end));
        setCurrentPage(value);
    };

    return (
        <Box className="saved-projects-container">
            <Typography variant="h5" className="saved-projects-title">Saved Projects ❤️</Typography>

            {savedProjects.length === 0 ? (
                <Typography className="no-projects">No saved projects yet.</Typography>
            ) : (
                <>
                    <Box className="cards-container">
                        {paginatedProjects.map((project) => (
                            <Card key={project.id} className="saved-project-card">
                                <CardContent>
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Avatar src={project.profilePicture || "/default-avatar.png"} />
                                        <Box>
                                            <Typography variant="h6">{project.title}</Typography>
                                            <Typography variant="body2">{project.user}</Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ mt: 2 }}>
                                        <Button
                                            size="small"
                                            startIcon={<VisibilityIcon />}
                                            onClick={() => {
                                                setSelectedProject(project);
                                                setOpenPopup(true);
                                            }}
                                        >
                                            View
                                        </Button>

                                        <Button
                                            size="small"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => handleRemoveProject(project.id)}
                                        >
                                            Remove
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>

                    <Box className="pagination-controls">
                        <Pagination
                            count={Math.ceil(savedProjects.length / ITEMS_PER_PAGE)}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            shape="rounded"
                        />
                    </Box>
                </>
            )}

            <ClientProfileViewProjectBeforeContact
                project={selectedProject}
                open={openPopup}
                onClose={() => setOpenPopup(false)}
            />
        </Box>
    );
};

export default ProfileClientSavedPostsTalents;
