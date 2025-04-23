import { useEffect, useState } from "react";
import {
    Box, Typography, Card, CardContent, CardMedia, CardActions,
    Button, Pagination, Avatar, Chip, TextField, Select, MenuItem
} from "@mui/material";
import ProfileTalentViewPostPopup from "./ProfileTalentViewPostPopup";
import { getProjectsByTalentId } from "../services/projectService";
import "../styles/ProfileTalentRecentProjects.css";
import { useAuth } from "../context/AuthContext";

const ITEMS_PER_PAGE = 4;

const ProfileTalentRecentProjects = ({ posts = null }) => {
    const { authUser } = useAuth();
    const talentId = authUser?.id;

    const [projects, setProjects] = useState([]);
    const [paginated, setPaginated] = useState([]);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("recent");
    const [page, setPage] = useState(1);
    const [openPopup, setOpenPopup] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const updatePage = (pg, list = projects) => {
        const start = (pg - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        setPaginated(list.slice(start, end));
        setPage(pg);
    };

    const applyFilters = (rawProjects) => {
        const sorted = rawProjects.sort((a, b) =>
            sortOrder === "recent"
                ? new Date(b.createdAt) - new Date(a.createdAt)
                : new Date(a.createdAt) - new Date(b.createdAt)
        );
        const filtered = sorted.filter(p =>
            p.title?.toLowerCase().includes(search.toLowerCase()) ||
            p.description?.toLowerCase().includes(search.toLowerCase())
        );
        setProjects(filtered);
        updatePage(1, filtered);
    };

    useEffect(() => {
        const load = async () => {
            if (posts) {
                applyFilters(posts);
            } else {
                try {
                    const data = await getProjectsByTalentId(talentId);
                    applyFilters(data);
                } catch (err) {
                    console.error("❌ Failed loading recent projects:", err);
                }
            }
        };

        load();
    }, [posts, talentId]);

    useEffect(() => {
        applyFilters(projects); // Reapply sort + search to existing list
    }, [search, sortOrder]);

    return (
        <Box className="recent-projects-container">
            <Typography variant="h5">Recent Projects</Typography>
            <Box display="flex" gap={2} mb={2}>
                <TextField fullWidth label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} fullWidth>
                    <MenuItem value="recent">Most Recent</MenuItem>
                    <MenuItem value="oldest">Oldest</MenuItem>
                </Select>
            </Box>

            {paginated.length === 0 ? (
                <Typography>No projects found</Typography>
            ) : (
                paginated.map((post) => (
                    <Card key={post.id} className="post-card">
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <Avatar src={post.profilePicture} />
                                <Box ml={1}>
                                    <Typography variant="h6">{post.user}</Typography>
                                    <Typography variant="caption">{new Date(post.createdAt).toLocaleDateString()}</Typography>
                                </Box>
                            </Box>
                            <Typography variant="h6">{post.title}</Typography>
                            <Typography>{post.description?.replace(/<[^>]+>/g, "").slice(0, 100) + "..."}</Typography>
                            <Typography><strong>Role:</strong> {post.role}</Typography>
                            <Box>
                                {Array.isArray(post.tools) && post.tools.map((t, i) => (
                                    <Chip key={i} label={t} />
                                ))}
                            </Box>
                            {post.media && (
                                <CardMedia component={post.media.includes("video") ? "video" : "img"} src={post.media} controls />
                            )}
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => { setSelectedProject(post); setOpenPopup(true); }}>View</Button>
                        </CardActions>
                    </Card>
                ))
            )}

            <Pagination
                count={Math.ceil(projects.length / ITEMS_PER_PAGE)}
                page={page}
                onChange={(e, v) => updatePage(v)}
            />

            <ProfileTalentViewPostPopup
                post={selectedProject}
                open={openPopup}
                onClose={() => setOpenPopup(false)}
            />
        </Box>
    );
};

export default ProfileTalentRecentProjects;
