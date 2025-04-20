import { useState, useEffect } from "react";
import { Box, Typography, Avatar, Button, TextField, MenuItem, Select } from "@mui/material";
import "../styles/ProfileTalentTestimonial.css";

const ProfileTalentTestimonial = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [selectedSort, setSelectedSort] = useState("newest");
    const [replyText, setReplyText] = useState("");
    const [selectedReview, setSelectedReview] = useState(null);

    // Dummy Testimonials Data (Replace with API later)
    useEffect(() => {
        const sampleTestimonials = [
            { id: 1, client: "John Doe", avatar: "https://via.placeholder.com/40", rating: 5, comment: "Great work!", date: "2024-03-01", reply: "" },
            { id: 2, client: "Jane Smith", avatar: "https://via.placeholder.com/40", rating: 4, comment: "Very professional!", date: "2024-02-25", reply: "" },
            { id: 3, client: "Startup Inc.", avatar: "https://via.placeholder.com/40", rating: 3, comment: "Could improve in communication.", date: "2024-02-15", reply: "" },
        ];
        setTestimonials(sampleTestimonials);
    }, []);

    // Handle sorting
    const handleSortChange = (event) => {
        setSelectedSort(event.target.value);
        let sortedTestimonials = [...testimonials];

        if (event.target.value === "highest") {
            sortedTestimonials.sort((a, b) => b.rating - a.rating);
        } else if (event.target.value === "lowest") {
            sortedTestimonials.sort((a, b) => a.rating - b.rating);
        } else {
            sortedTestimonials.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        setTestimonials(sortedTestimonials);
    };

    // Handle reply
    const handleReplySubmit = () => {
        if (!selectedReview) return;
        const updatedTestimonials = testimonials.map(testimonial =>
            testimonial.id === selectedReview.id
                ? { ...testimonial, reply: replyText }
                : testimonial
        );

        setTestimonials(updatedTestimonials);
        setReplyText("");
        setSelectedReview(null);
    };

    return (
        <Box className="testimonial-container">
            <Typography variant="h5" className="testimonial-title">Client Testimonials</Typography>

            {/* Sorting Dropdown */}
            <Box className="sort-dropdown">
                <Typography variant="body1">Sort by:</Typography>
                <Select value={selectedSort} onChange={handleSortChange}>
                    <MenuItem value="newest">Newest</MenuItem>
                    <MenuItem value="highest">Highest Rated</MenuItem>
                    <MenuItem value="lowest">Lowest Rated</MenuItem>
                </Select>
            </Box>

            {/* Testimonials List */}
            <Box className="testimonial-list">
                {testimonials.map((testimonial) => (
                    <Box key={testimonial.id} className="testimonial-card">
                        <Avatar src={testimonial.avatar} alt={testimonial.client} />
                        <Box className="testimonial-content">
                            <Typography variant="h6">{testimonial.client}</Typography>
                            <Box className="stars">
                                {"⭐".repeat(testimonial.rating)}
                            </Box>
                            <Typography variant="body1" className="testimonial-text">{testimonial.comment}</Typography>
                            <Typography variant="caption" className="testimonial-date">{testimonial.date}</Typography>

                            {/* Reply Section */}
                            {testimonial.reply ? (
                                <Typography variant="body2" className="testimonial-reply">Reply: {testimonial.reply}</Typography>
                            ) : (
                                <Button className="reply-button" onClick={() => setSelectedReview(testimonial)}>
                                    Reply
                                </Button>
                            )}
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* Reply Input Field */}
            {selectedReview && (
                <Box className="reply-box">
                    <Typography variant="body1">Reply to {selectedReview.client}:</Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Write your reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                    />
                    <Button className="submit-reply-button" onClick={handleReplySubmit}>
                        Submit Reply
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default ProfileTalentTestimonial;
