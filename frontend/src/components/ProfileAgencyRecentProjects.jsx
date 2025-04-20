import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Avatar,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../styles/ProfileAgencyRecentProjects.css";

const ProfileAgencyRecentProjects = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const postsPerPage = 4;

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem("agencyPosts")) || [];
        setPosts(savedPosts);
    }, []);

    // Handle delete post
    const handleDelete = (id) => {
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);
        localStorage.setItem("agencyPosts", JSON.stringify(updatedPosts));
    };

    // Handle pagination
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const paginatedPosts = posts.slice(currentPage * postsPerPage, (currentPage + 1) * postsPerPage);

    return (
        <Box className="recent-projects-container">
            <Typography variant="h5" className="recent-projects-title">Recent Job Posts</Typography>

            {posts.length === 0 ? (
                <Typography className="no-posts">No job posts yet.</Typography>
            ) : (
                <Box className="projects-grid">
                    {paginatedPosts.map((post) => (
                        <Card key={post.id} className="post-card">
                            <CardHeader
                                avatar={<Avatar src={post.profilePicture} />}
                                title={post.agencyName}
                                subheader={post.date}
                            />
                            {post.image && <CardMedia component="img" height="200" image={post.image} alt="Job Post" />}
                            <CardContent>
                                <Typography variant="body2">{post.text}</Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton onClick={() => handleDelete(post.id)}><DeleteIcon /></IconButton>
                                <IconButton><EditIcon /></IconButton>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <Box className="pagination-controls">
                    <Button
                        startIcon={<ArrowBackIosIcon />}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                        disabled={currentPage === 0}
                    >
                        Previous
                    </Button>
                    <Typography className="page-indicator">{currentPage + 1} / {totalPages}</Typography>
                    <Button
                        endIcon={<ArrowForwardIosIcon />}
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
                        disabled={currentPage === totalPages - 1}
                    >
                        Next
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default ProfileAgencyRecentProjects;
