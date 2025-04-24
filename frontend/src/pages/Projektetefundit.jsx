import { useState, useEffect } from "react";
import {
    Box, Typography, Grid, Card, CardContent, IconButton,
    Avatar, FormControl, Select, MenuItem, TextField, Chip
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ClientProfileViewProjectBeforeContact from "../components/ClientProfileViewProjectBeforeContact";
import { getAllProjects } from "../services/projectService";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
    saveProjectToBackend,
    removeSavedProjectFromBackend,
    getSavedProjects
} from "../services/savedProjectService";
import { useAuth } from "../context/AuthContext";


const roles = ["Developer", "Designer", "Project Manager", "QA Engineer", "Data Scientist"];
const tools = ["React", "Node.js", "Figma", "Python", "Docker", "Kubernetes", "Jira"];

const Projektetefundit = () => {
    const [projects, setProjects] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [saved, setSaved] = useState([]);
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("");
    const [tool, setTool] = useState("");
    const [popup, setPopup] = useState(null);
    const { authUser } = useAuth();

    // 🔄 Load all projects + listen to "projectUpdated"
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getAllProjects();
                setProjects(res);
                setFiltered(res);
            } catch (err) {
                console.error("Load error:", err);
            }
        };
        fetch();

        // 👂 Listen for updates
        window.addEventListener("projectUpdated", fetch);
        return () => window.removeEventListener("projectUpdated", fetch);
    }, []);


    // 🔄 Load saved projects for current client
    useEffect(() => {
        const fetchSaved = async () => {
            try {
                const res = await getSavedProjects(); // ✅ from backend
                setSaved(res);
            } catch (err) {
                console.error("❌ Failed to load saved projects:", err);
            }
        };
        fetchSaved();
        window.addEventListener("savedProjectsUpdated", fetchSaved);
        return () => window.removeEventListener("savedProjectsUpdated", fetchSaved);
    }, []);

    // 🔍 Filter projects when inputs change
    useEffect(() => {
        let list = [...projects];
        if (search) list = list.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));
        if (role) list = list.filter(p => p.role === role);
        if (tool) list = list.filter(p => p.tools.includes(tool));
        setFiltered(list);
    }, [search, role, tool, projects]);

    // 🔁 Save/remove toggle
    const toggleSave = async (project) => {
        try {
            const existing = saved.find(s => s.project?.id === project.id || s.projectId === project.id);
            if (existing) {
                await removeSavedProjectFromBackend(existing.id);
                setSaved(saved.filter(s => s.id !== existing.id));
            } else {
                const result = await saveProjectToBackend({ projectId: project.id });
                setSaved([...saved, result]);
            }

            window.dispatchEvent(new Event("savedProjectsUpdated"));
        } catch (err) {
            console.error("❌ Failed to toggle saved project:", err);
        }
    };

    return (
        <>
            <Header />
            <Box>
                <Typography variant="h4">Projektet e Fundit</Typography>
                <Box display="flex" gap={2} mb={2}>
                    <TextField label="Search" value={search} onChange={(e) => setSearch(e.target.value)} fullWidth />
                    <FormControl fullWidth>
                        <Select value={role} onChange={(e) => setRole(e.target.value)} displayEmpty>
                            <MenuItem value="">All Roles</MenuItem>
                            {roles.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <Select value={tool} onChange={(e) => setTool(e.target.value)} displayEmpty>
                            <MenuItem value="">All Tools</MenuItem>
                            {tools.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Box>

                <Grid container spacing={2}>
                    {filtered.map(project => {
                        const isSaved = saved.some(p => p.project?.id === project.id || p.projectId === project.id);

                        return (
                            <Grid item xs={12} sm={6} md={4} key={project.id}>
                                <Card onClick={() => {
                                    if (!authUser) {
                                        alert("Krijo nje llogari per me shume.");
                                        return;
                                    }
                                    setPopup(project);
                                }}>
                                    <CardContent>
                                        <Box display="flex" alignItems="center">
                                            <Avatar src={project.profilePicture} />
                                            <Box ml={1}>
                                                <Typography>{project.user}</Typography>
                                                <Typography variant="caption">{new Date(project.createdAt).toLocaleDateString()}</Typography>
                                            </Box>
                                        </Box>
                                        <Typography variant="h6">{project.title}</Typography>
                                        <Typography>{project.description?.replace(/<[^>]+>/g, "").slice(0, 100)}</Typography>
                                        <Typography>Role: {project.role}</Typography>
                                        <Box mt={1}>
                                            {Array.isArray(project.tools) && project.tools.map(t => (
                                                <Chip key={t} label={t} sx={{ mr: 0.5 }} />
                                            ))}
                                        </Box>
                                        <IconButton onClick={(e) => { e.stopPropagation(); toggleSave(project); }}>
                                            {isSaved ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                                        </IconButton>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>

            {popup && (
                <ClientProfileViewProjectBeforeContact
                    open={true}
                    project={popup}
                    onClose={() => setPopup(null)}
                />
            )}

            <Footer />
        </>
    );
};

export default Projektetefundit;
