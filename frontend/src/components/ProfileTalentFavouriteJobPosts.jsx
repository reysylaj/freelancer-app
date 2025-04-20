import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, CardMedia, Button } from "@mui/material";
import "../styles/ProfileTalentFavouriteJobPosts.css";

const ProfileTalentFavouriteJobPosts = () => {
    const [favouriteJobs, setFavouriteJobs] = useState(JSON.parse(localStorage.getItem("favouriteJobs")) || []);

    // Dummy Data (if no job posts exist)
    useEffect(() => {
        if (favouriteJobs.length === 0) {
            const dummyJobs = [
                {
                    id: 1,
                    title: "Frontend Developer Needed",
                    company: "Tech Innovations Ltd",
                    image: "https://source.unsplash.com/400x250/?office",
                    link: "https://jobportal.com/frontend-developer",
                },
                {
                    id: 2,
                    title: "React Developer for E-Commerce Project",
                    company: "Online Solutions",
                    image: "https://source.unsplash.com/400x250/?business",
                    link: "https://jobportal.com/react-developer",
                },
                {
                    id: 3,
                    title: "Full Stack Developer - Remote",
                    company: "Global Tech",
                    image: "https://source.unsplash.com/400x250/?teamwork",
                    link: "https://jobportal.com/fullstack-developer",
                },
            ];
            setFavouriteJobs(dummyJobs);
            localStorage.setItem("favouriteJobs", JSON.stringify(dummyJobs));
        }
    }, []);

    return (
        <Box className="favourite-jobs-container">
            <Typography variant="h5" className="section-title">Favourite Job Posts</Typography>
            <Box className="job-slider">
                {favouriteJobs.map((job) => (
                    <Card key={job.id} className="job-card">
                        <CardMedia component="img" height="140" image={job.image} alt={job.title} className="job-image" />
                        <CardContent>
                            <Typography variant="h6" className="job-title">{job.title}</Typography>
                            <Typography variant="body2" className="job-company">{job.company}</Typography>
                            <Button onClick={() => window.open(job.link, "_blank")} className="view-job-button">
                                View Job
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default ProfileTalentFavouriteJobPosts;
