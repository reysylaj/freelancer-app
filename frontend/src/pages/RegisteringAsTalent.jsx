import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Card, CardContent, IconButton, Tooltip } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/RegisteringAsTalent.css";

const RegisteringAsTalent = () => {
    const [infoText, setInfoText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();

    const handleInfoClick = (text) => {
        setInfoText(text);
    };

    const handleCardClick = (category) => {
        setSelectedCategory(category);
    };

    // ✅ Redirect to Talent Registration Form instead of skipping details
    const handleRegister = () => {
        if (!selectedCategory) {
            alert("Ju lutem zgjidhni një kategori para se të vazhdoni.");
            return;
        }

        // ✅ Store selected category temporarily in `sessionStorage` (not saved permanently)
        sessionStorage.setItem("selectedTalentCategory", selectedCategory);

        // ✅ Redirect to Talent Registration Form
        navigate("/talent-registration");
    };

    return (
        <>
            <Header />
            <Box className="register-container">
                <Typography variant="h4" className="register-title">JU ZGJODHET TE REGJISTROHENI SI TALENT</Typography>

                <Typography variant="body1" className="register-description">
                    Jeni të lutur të zgjidhni kategorinë ku ndiheni të përfshirë. Klikoni{" "}
                    <Tooltip title="Kliko për më shumë info">
                        <HelpOutlineIcon className="info-icon" />
                    </Tooltip>{" "}
                    për t'u informuar më shumë.
                </Typography>

                {/* Talent Category Selection */}
                <Box className="cards-container">
                    <Card className={`register-card ${selectedCategory === "Jam student dhe kerkoj pune internship" ? "selected-card" : ""}`}
                        onClick={() => handleCardClick("Jam student dhe kerkoj pune internship")}>
                        <CardContent>
                            <Typography variant="h6" className="card-title">Talent/</Typography>
                            <Box className="icon-container"><SchoolIcon className="card-icon" /></Box>
                            <Typography variant="body2" className="card-text">Jam student dhe kerkoj pune internship</Typography>
                        </CardContent>
                    </Card>

                    <Card className={`register-card ${selectedCategory === "Kerkoj nje pune te dyte/projekte" ? "selected-card" : ""}`}
                        onClick={() => handleCardClick("Kerkoj nje pune te dyte/projekte")}>
                        <CardContent>
                            <Typography variant="h6" className="card-title">Talent/</Typography>
                            <Box className="icon-container"><WorkIcon className="card-icon" /></Box>
                            <Typography variant="body2" className="card-text">Kerkoj nje pune te dyte/projekte</Typography>
                        </CardContent>
                    </Card>

                    <Card className={`register-card ${selectedCategory === "Kam ndjekës dhe dua pagesa online" ? "selected-card" : ""}`}
                        onClick={() => handleCardClick("Kam ndjekës dhe dua pagesa online")}>
                        <CardContent>
                            <Typography variant="h6" className="card-title">Talent/</Typography>
                            <Box className="icon-container"><PaymentIcon className="card-icon" /></Box>
                            <Typography variant="body2" className="card-text">Kam ndjekës dhe dua pagesa online</Typography>
                        </CardContent>
                    </Card>

                    <Card className={`register-card ${selectedCategory === "Jam i papunë dhe kerkoj pune urgjente" ? "selected-card" : ""}`}
                        onClick={() => handleCardClick("Jam i papunë dhe kerkoj pune urgjente")}>
                        <CardContent>
                            <Typography variant="h6" className="card-title">Talent/</Typography>
                            <Box className="icon-container"><PersonOffIcon className="card-icon" /></Box>
                            <Typography variant="body2" className="card-text">Jam i papunë dhe kerkoj pune urgjente</Typography>
                        </CardContent>
                    </Card>
                </Box>

                {/* Register Button */}
                <Button className="register-button" onClick={handleRegister}>REGJISTROHU</Button>

                {/* Login Link */}
                <Typography variant="body1" className="login-text">
                    Nëse keni një llogari, jeni të lutur të bëni login{" "}
                    <Link to="/login" className="login-link">këtu</Link>.
                </Typography>
            </Box>
            <Footer />
        </>
    );
};

export default RegisteringAsTalent;
