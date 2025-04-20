import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Avatar, Rating } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/ProfileClientTalentHistory.css";

const ProfileClientTalentHistory = () => {
    const [talentHistory, setTalentHistory] = useState([]);

    useEffect(() => {
        const storedTalentHistory = JSON.parse(localStorage.getItem("clientTalentHistory")) || [];
        setTalentHistory(storedTalentHistory);
    }, []);

    // Slider settings
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <Box className="talent-history-container">
            <Typography variant="h5" className="talent-history-title">Talent Collaboration History</Typography>

            {talentHistory.length === 0 ? (
                <Typography className="no-history">No past collaborations yet.</Typography>
            ) : (
                <Slider {...settings}>
                    {talentHistory.map((talent, index) => (
                        <Card key={index} className="talent-card">
                            <CardContent>
                                <Box className="talent-header">
                                    <Avatar src={talent.profilePicture} className="talent-avatar" />
                                    <Box>
                                        <Typography variant="h6">{talent.name}</Typography>
                                        <Typography variant="body2" className="talent-skill">{talent.skill}</Typography>
                                    </Box>
                                </Box>

                                <Typography variant="body2">
                                    <strong>Position:</strong> {talent.position}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Payment Status:</strong> {talent.paymentStatus}
                                </Typography>
                                <Box className="rating-container">
                                    <Typography variant="body2"><strong>Rating:</strong></Typography>
                                    <Rating value={talent.rating} readOnly />
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Slider>
            )}
        </Box>
    );
};

export default ProfileClientTalentHistory;
