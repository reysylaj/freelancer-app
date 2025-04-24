import { useState, useEffect } from "react";
import {
    Box, Typography, Card, CardContent,
    Avatar, Button, Pagination
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClientProfileViewProjectBeforeContact from "./ClientProfileViewProjectBeforeContact";
import { getSavedProjects, removeSavedProjectFromBackend } from "../services/savedProjectService"; // ✅ NEW
import { getProposalsByClient } from "../services/proposalService";
import "../styles/ProfileClientSavedPostsTalents.css";

//message purpose
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const ITEMS_PER_PAGE = 4;

const ProfileClientSavedPostsTalents = () => {
    const [savedProjects, setSavedProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedProjects, setPaginatedProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const { authUser } = useAuth();
    const clientId = authUser?.id;
    const navigate = useNavigate();
    const [proposals, setProposals] = useState([]);

    useEffect(() => {
        const fetchSaved = async () => {
            try {
                const saved = await getSavedProjects(); // ✅ From backend
                setSavedProjects(saved);
                setPaginatedProjects(saved.slice(0, ITEMS_PER_PAGE));
            } catch (error) {
                console.error("❌ Failed to fetch saved projects", error);
            }
        };

        fetchSaved();
        window.addEventListener("savedProjectsUpdated", fetchSaved);
        return () => window.removeEventListener("savedProjectsUpdated", fetchSaved);
    }, []);

    const handleRemoveProject = async (id) => {
        try {
            await removeSavedProjectFromBackend(id);
            const updated = savedProjects.filter(p => p.id !== id);
            setSavedProjects(updated);
            setPaginatedProjects(updated.slice(0, ITEMS_PER_PAGE));
            window.dispatchEvent(new Event("savedProjectsUpdated"));
        } catch (err) {
            console.error("❌ Failed to remove saved project:", err);
        }
    };

    const updatePaginated = (data, page) => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        setPaginatedProjects(data.slice(start, end));
        setCurrentPage(page);
    };


    useEffect(() => {
        const loadProposals = async () => {
            try {
                if (!clientId) return;
                const clientProposals = await getProposalsByClient(clientId);
                setProposals(clientProposals);
                updatePaginated(clientProposals, 1);
            } catch (error) {
                console.error("Failed to fetch proposals:", error);
            }
        };

        loadProposals();
    }, [clientId]);

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
                        {paginatedProjects.map((saved) => (
                            <Card key={saved.id} className="saved-project-card">
                                <CardContent>
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Avatar src={saved.project?.profilePicture || "/default-avatar.png"} />
                                        <Box>
                                            <Typography variant="h6">{saved.project?.title || "Untitled"}</Typography>
                                            <Typography variant="body2">{saved.project?.user || "Unknown"}</Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ mt: 2 }}>
                                        <Button
                                            size="small"
                                            startIcon={<VisibilityIcon />}
                                            onClick={() => {
                                                setSelectedProject(saved.project);
                                                setOpenPopup(true);
                                            }}
                                        >
                                            View
                                        </Button>

                                        <Button
                                            size="small"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => handleRemoveProject(saved.id)}
                                        >
                                            Remove
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() => navigate(`/message-client/${saved.client.id}`)}>
                                            Message Talent
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
