import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Rating, Card, CardContent, Avatar } from "@mui/material";
import "../styles/ProfileAgencyTestimonials.css";

const ProfileAgencyTestimonials = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {
        name: "Agency Name",
        profilePicture: "/default-avatar.png",
    };

    const [testimonials, setTestimonials] = useState([]);
    const [newTestimonial, setNewTestimonial] = useState({
        clientName: "",
        rating: 0,
        comment: "",
    });

    useEffect(() => {
        const savedTestimonials = JSON.parse(localStorage.getItem("agencyTestimonials")) || [];
        setTestimonials(savedTestimonials);
    }, []);

    const handleAddTestimonial = () => {
        if (!newTestimonial.clientName || !newTestimonial.comment || newTestimonial.rating === 0) return;

        const updatedTestimonials = [
            ...testimonials,
            { ...newTestimonial, date: new Date().toLocaleDateString() },
        ];
        setTestimonials(updatedTestimonials);
        localStorage.setItem("agencyTestimonials", JSON.stringify(updatedTestimonials));

        setNewTestimonial({ clientName: "", rating: 0, comment: "" });
    };

    return (
        <Box className="testimonials-container">
            <Typography variant="h5" className="testimonials-title">Client Testimonials</Typography>

            {/* Display Testimonials */}
            <Box className="testimonials-list">
                {testimonials.length === 0 ? (
                    <Typography className="no-testimonials">No testimonials yet.</Typography>
                ) : (
                    testimonials.map((testimonial, index) => (
                        <Card key={index} className="testimonial-card">
                            <CardContent>
                                <Avatar src={storedUser.profilePicture} className="testimonial-avatar" />
                                <Typography variant="h6">{testimonial.clientName}</Typography>
                                <Rating value={testimonial.rating} readOnly className="testimonial-rating" />
                                <Typography variant="body2" className="testimonial-comment">"{testimonial.comment}"</Typography>
                                <Typography variant="caption" className="testimonial-date">{testimonial.date}</Typography>
                            </CardContent>
                        </Card>
                    ))
                )}
            </Box>

            {/* Add New Testimonial */}
            <Box className="testimonial-input">
                <Typography variant="h6">Leave a Review</Typography>
                <TextField
                    label="Your Name"
                    fullWidth
                    value={newTestimonial.clientName}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, clientName: e.target.value })}
                    className="input-field"
                />
                <Rating
                    value={newTestimonial.rating}
                    onChange={(e, newValue) => setNewTestimonial({ ...newTestimonial, rating: newValue })}
                    className="testimonial-rating-input"
                />
                <TextField
                    label="Your Feedback"
                    fullWidth
                    multiline
                    rows={3}
                    value={newTestimonial.comment}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, comment: e.target.value })}
                    className="input-field"
                />
                <Button onClick={handleAddTestimonial} className="submit-button">Submit Review</Button>
            </Box>
        </Box>
    );
};

export default ProfileAgencyTestimonials;
