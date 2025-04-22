import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Avatar, Rating } from "@mui/material";
import "../styles/ProfileClientTestimonials.css";

const ProfileClientTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        setTestimonials(savedTestimonials);
    }, []);

    return (
        <Box className="testimonials-container">
            <Typography variant="h5" className="testimonials-title">Client Reviews</Typography>
            {testimonials.length === 0 ? (
                <Typography className="no-reviews">No reviews yet.</Typography>
            ) : (
                testimonials.map((testimonial, index) => (
                    <Card key={index} className="testimonial-card">
                        <CardContent>
                            <Box className="review-header">
                                <Avatar src={testimonial.avatar || "/default-avatar.png"} className="review-avatar" />
                                <Box>
                                    <Typography variant="h6">{testimonial.talentName}</Typography>
                                    <Rating value={testimonial.rating} readOnly />
                                </Box>
                            </Box>
                            <Typography className="review-text">{testimonial.review}</Typography>
                        </CardContent>
                    </Card>
                ))
            )}
        </Box>
    );
};

export default ProfileClientTestimonials;
