import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, IconButton, Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/ProfileClientSavedJobs.css";
import { useAuth } from "../context/AuthContext";

const ProfileClientSavedJobs = () => {
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        const { authUser } = useAuth();
        const clientId = authUser?.id;

        const clientSavedJobs = allSavedJobs[clientId] || [];

        setSavedJobs(clientSavedJobs);
    }, []);


    // Handle remove job from saved list
    const handleRemove = (id) => {
        const updatedJobs = savedJobs.filter(job => job.id !== id);
        setSavedJobs(updatedJobs);

        const { authUser } = useAuth();
        const talentId = authUser?.id;

        allSavedJobs[clientId] = updatedJobs;
    };


    return (
        <Box className="saved-jobs-container">
            <Typography variant="h5" className="saved-jobs-title">Saved Jobs</Typography>

            {savedJobs.length === 0 ? (
                <Typography className="no-saved-jobs">No saved jobs yet.</Typography>
            ) : (
                <Swiper slidesPerView={3} spaceBetween={15} navigation pagination>
                    {savedJobs.map((job) => (
                        <SwiperSlide key={job.id}>
                            <Card className="saved-job-card">
                                <CardContent>
                                    <Box className="job-header">
                                        <Avatar src={job.companyLogo} className="job-avatar" />
                                        <Box>
                                            <Typography variant="h6">{job.title}</Typography>
                                            <Typography variant="body2">{job.company}</Typography>
                                        </Box>
                                    </Box>
                                    <Typography className="job-budget">💰 Budget: ${job.budget}</Typography>
                                    <IconButton className="remove-job-button" onClick={() => handleRemove(job.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </Box>
    );
};

export default ProfileClientSavedJobs;
