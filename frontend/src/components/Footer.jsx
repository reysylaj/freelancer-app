import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import "../styles/Footer.css";
import logo from "../assets/react.svg"; // Update with your actual logo path

const Footer = () => {
    return (
        <Box className="footer-container">
            <Box className="footer-content">
                {/* Column 1: Logo */}
                <Box className="footer-logo">
                    <img src={logo} alt="Logo" />
                </Box>

                {/* Column 2: First Text Block */}
                <Box className="footer-text">
                    <Typography variant="body2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>
                </Box>

                {/* Column 3: Second Text Block */}
                <Box className="footer-text">
                    <Typography variant="body2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut wisi enim ad minim veniam, quis nostrud exercitation.
                    </Typography>
                </Box>

                {/* Column 4: Social Links */}
                <Box className="footer-social">
                    <Typography variant="body2" className="follow-text">Na Ndiqni:</Typography>
                    <Box className="social-icons">
                        <Link to="https://www.linkedin.com/" target="_blank">
                            <LinkedInIcon className="social-icon" />
                        </Link>
                        <Link to="https://www.instagram.com/" target="_blank">
                            <InstagramIcon className="social-icon" />
                        </Link>
                    </Box>
                </Box>
            </Box>

            {/* COPYRIGHT */}
            <Box className="footer-bottom">
                <Typography variant="body2">COPYRIGHT 2024-2025 REY SYLAJ PRODUCTION</Typography>
            </Box>
        </Box>
    );
};

export default Footer;
