import { useState, useEffect } from "react";
import {
    Box, Typography, Card, CardContent, Avatar, Grid, FormControl,
    InputLabel, Select, MenuItem, TextField, IconButton, Chip
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ClientProfileViewProjectBeforeContact from "../components/ClientProfileViewProjectBeforeContact";

import { getAllProjects } from "../services/projectService";

import "../styles/Projektetefundit.css";

const roles = ["Developer", "Designer", "Project Manager", "QA Engineer", "Data Scientist"];
const tools = ["React", "Node.js", "Figma", "Python", "Docker", "Kubernetes", "Jira"];

const Projektetefundit = () => {
    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [savedProjects, setSavedProjects] = useState([]);
    const [roleFilter, setRoleFilter] = useState("");
    const [toolFilter, setToolFilter] = useState("");
    const [openProjectPopup, setOpenProjectPopup] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const clientId = storedUser.id;

    // ✅ Load all projects from backend
    const loadProjects = async () => {
        try {
            const data = await getAllProjects();
            setProjects(data);
        } catch (error) {
            console.error("Failed to load projects:", error);
        }
    };

    useEffect(() => {
        loadProjects();

        const allSaved = JSON.parse(localStorage.getItem("savedClientProjects")) || {};
        setSavedProjects(allSaved[clientId] || []);
    }, [clientId]);

    const handleSaveProject = (project) => {
        const allSaved = JSON.parse(localStorage.getItem("savedClientProjects")) || {};
        const clientSaved = allSaved[clientId] || [];

        let updated;
        if (clientSaved.some(p => p.id === project.id)) {
            updated = clientSaved.filter(p => p.id !== project.id);
        } else {
            updated = [...clientSaved, project];
        }

        allSaved[clientId] = updated;
        localStorage.setItem("savedClientProjects", JSON.stringify(allSaved));
        setSavedProjects(updated);
    };

    const handleOpenProjectPopup = (project) => {
        setSelectedProject(project);
        setOpenProjectPopup(true);
    };

    const handleCloseProjectPopup = () => {
        setSelectedProject(null);
        setOpenProjectPopup(false);
    };

    // ✅ Filters
    const filteredProjects = projects.filter((project) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch = project.title?.toLowerCase().includes(query) ||
            project.description?.toLowerCase().includes(query);
        const matchesRole = roleFilter ? project.role === roleFilter : true;
        const matchesTool = toolFilter ? project.tools?.includes(toolFilter) : true;
        return matchesSearch && matchesRole && matchesTool;
    });

    return (
        <>
            <Header />
            <Box className="projektetefundit-container">
                <Box className="projektet-fundit-title">
                    <Typography variant="h3" className="projektet-h1">Projektet e fundit</Typography>
                    <Typography variant="body1" className="projektet-p1">
                        Këtu do të gjeni projektet më të fundit të shpërndara nga talentët profesionistë.
                    </Typography>
                </Box>

                <Box className="content-container">
                    {/* 🔹 Filters */}
                    <Box className="filters-container">
                        <Typography variant="h6">Filters</Typography>

                        <TextField
                            fullWidth
                            label="Search by title or description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <FormControl fullWidth>
                            <InputLabel>Role</InputLabel>
                            <Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                                <MenuItem value="">All</MenuItem>
                                {roles.map((role) => (
                                    <MenuItem key={role} value={role}>{role}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Tool</InputLabel>
                            <Select value={toolFilter} onChange={(e) => setToolFilter(e.target.value)}>
                                <MenuItem value="">All</MenuItem>
                                {tools.map((tool) => (
                                    <MenuItem key={tool} value={tool}>{tool}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {/* 🔹 Projects */}
                    <Box className="projects-container">
                        {filteredProjects.length === 0 ? (
                            <Typography className="no-projects">No projects found.</Typography>
                        ) : (
                            <Grid container spacing={2}>
                                {filteredProjects.map((project) => (
                                    <Grid item xs={12} sm={6} md={4} key={project.id}>
                                        <Card
                                            className="project-card"
                                            onClick={() => handleOpenProjectPopup(project)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <CardContent>
                                                <Box display="flex" alignItems="center">
                                                    <Avatar src={project.profilePicture || "/default-avatar.png"} sx={{ mr: 1 }} />
                                                    <Box>
                                                        <Typography variant="h6">{project.user || "Unknown User"}</Typography>
                                                        <Typography variant="caption" color="textSecondary">
                                                            {new Date(project.createdAt).toLocaleDateString()}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <Typography variant="h5" sx={{ mt: 1 }}>{project.title}</Typography>

                                                <Typography variant="body2" sx={{ mt: 1 }}>
                                                    {project.description
                                                        ? project.description.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 100) + "..."
                                                        : "No description available"}
                                                </Typography>

                                                <Typography variant="body2" sx={{ fontWeight: "bold", mt: 1 }}>
                                                    Role: {project.role}
                                                </Typography>

                                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "5px", mt: 1 }}>
                                                    {Array.isArray(project.tools) ? (
                                                        project.tools.map((tool) => (
                                                            <Chip key={tool} label={tool} />
                                                        ))
                                                    ) : (
                                                        <Typography variant="body2">No tools specified</Typography>
                                                    )}
                                                </Box>

                                                <Box className="save-icon-container">
                                                    <IconButton
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleSaveProject(project);
                                                        }}
                                                    >
                                                        {savedProjects.some(saved => saved.id === project.id)
                                                            ? <FavoriteIcon color="error" />
                                                            : <FavoriteBorderIcon />}
                                                    </IconButton>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>
                </Box>
            </Box>

            {/* 🔹 Project View Popup */}
            <ClientProfileViewProjectBeforeContact
                project={selectedProject}
                open={openProjectPopup}
                onClose={handleCloseProjectPopup}
            />

            <Footer />
        </>
    );
};

export default Projektetefundit;
