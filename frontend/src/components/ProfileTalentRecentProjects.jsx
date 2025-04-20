import { useState, useEffect } from "react";
import {
    Box, Typography, Card, CardContent, CardMedia,
    CardActions, Button, Pagination, Avatar, Chip, TextField, Select, MenuItem
} from "@mui/material";
import ProfileTalentViewPostPopup from "./ProfileTalentViewPostPopup";
import "../styles/ProfileTalentRecentProjects.css";
import { getProjectsByTalentId } from "../services/projectService";

const ITEMS_PER_PAGE = 4;

const ProfileTalentRecentProjects = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [paginatedProjects, setPaginatedProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("recent");

    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const talentId = storedUser.id;

    // ✅ Fetch projects from backend
    const loadProjects = async () => {
        try {
            const data = await getProjectsByTalentId(talentId);
            setProjects(data);
            setFilteredProjects(data);
            updatePaginatedProjects(1, data);
        } catch (error) {
            console.error("❌ Failed to load projects:", error);
        }
    };

    useEffect(() => {
        loadProjects();

        const handleProjectUpdate = () => loadProjects();
        window.addEventListener("projectUpdated", handleProjectUpdate);

        return () => {
            window.removeEventListener("projectUpdated", handleProjectUpdate);
        };
    }, [talentId]);

    useEffect(() => {
        applyFilters();
    }, [searchQuery, sortOrder, projects]);

    const applyFilters = () => {
        let filtered = [...projects];

        if (searchQuery) {
            filtered = filtered.filter(post =>
            (post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.description?.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        filtered.sort((a, b) =>
            sortOrder === "recent"
                ? new Date(b.createdAt) - new Date(a.createdAt)
                : new Date(a.createdAt) - new Date(b.createdAt)
        );

        setFilteredProjects(filtered);
        updatePaginatedProjects(1, filtered);
    };

    const updatePaginatedProjects = (page, data = filteredProjects) => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        setPaginatedProjects(data.slice(start, end));
        setCurrentPage(page);
    };

    const handlePageChange = (event, value) => {
        updatePaginatedProjects(value);
    };

    // ✅ Popup
    const [selectedProject, setSelectedProject] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);

    const handleOpenPopup = (project) => {
        setSelectedProject(project);
        setOpenPopup(true);
    };

    const handleClosePopup = () => {
        setSelectedProject(null);
        setOpenPopup(false);
    };

    return (
        <Box className="recent-projects-container">
            <Typography variant="h5" className="recent-projects-title">Recent Projects</Typography>

            {/* Filters */}
            <Box className="filters-container" sx={{ display: "flex", gap: 2 }}>
                <TextField
                    label="Search by keyword"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    fullWidth
                />
                <Select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    fullWidth
                >
                    <MenuItem value="recent">Most Recent</MenuItem>
                    <MenuItem value="oldest">Oldest</MenuItem>
                </Select>
            </Box>

            {paginatedProjects.length === 0 ? (
                <Typography className="no-posts">No projects found.</Typography>
            ) : (
                <Box className="cards-container">
                    {paginatedProjects.map((post) => (
                        <Card key={post.id} className="post-card">
                            <CardContent>
                                {/* User Info */}
                                <Box display="flex" alignItems="center">
                                    <Avatar src={post.profilePicture || "/default-avatar.png"} className="user-avatar" />
                                    <Box>
                                        <Typography variant="h6">{post.user || "Unknown User"}</Typography>
                                        <Typography variant="caption">{new Date(post.createdAt).toLocaleDateString()}</Typography>
                                    </Box>
                                </Box>

                                <Typography variant="h6">{post.title}</Typography>
                                <Typography className="post-text">
                                    {post.description?.replace(/<[^>]+>/g, "").slice(0, 100) + "..."}
                                </Typography>

                                <Typography><strong>Role:</strong> {post.role}</Typography>

                                <Box className="tools-container">
                                    {Array.isArray(post.tools) && post.tools.map((tool, index) => (
                                        <Chip key={index} label={tool} className="tool-chip" />
                                    ))}
                                </Box>

                                {post.media && (
                                    <CardMedia
                                        component={post.media.includes("video") ? "video" : "img"}
                                        src={post.media}
                                        controls={post.media.includes("video")}
                                        alt="Project Media"
                                        className="post-image"
                                    />
                                )}
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleOpenPopup(post)}>View</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            )}

            <Box className="pagination-controls">
                <Pagination
                    count={Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)}
                    page={currentPage}
                    onChange={handlePageChange}
                    size="large"
                    shape="rounded"
                />
            </Box>

            <ProfileTalentViewPostPopup
                post={selectedProject}
                open={openPopup}
                onClose={handleClosePopup}
            />
        </Box>
    );
};

export default ProfileTalentRecentProjects;
