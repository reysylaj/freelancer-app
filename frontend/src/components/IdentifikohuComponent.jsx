import { useState } from "react";
import { Box, Typography, Button, Card, CardContent, IconButton, Tooltip } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useNavigate, Link } from "react-router-dom";
import "../styles/IdentifikohuComponent.css";

const RegisterComponent = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [infoText, setInfoText] = useState(""); // 🔥 Red text appears only when clicking "?"

    const navigate = useNavigate();

    // Function to set the selected category
    const handleCardClick = (category) => {
        setSelectedCategory(category);
    };

    // Function to show red text only when clicking ?
    const handleInfoClick = (info) => {
        setInfoText(info);
    };

    // Function to handle registration
    const handleRegisterClick = () => {
        if (!selectedCategory) {
            alert("Ju lutemi zgjidhni një kategori për të vazhduar!");
            return;
        }

        switch (selectedCategory) {
            case "Talent":
                navigate("/registering-as-talent");
                break;
            case "Klient":
                navigate("/registering-as-client");
                break;
            case "Agjensi":
                navigate("/registering-as-agency");
                break;
            default:
                alert("Zgjidhni një kategori të vlefshme!");
        }
    };

    return (
        <Box className="register-container">
            {/* Title */}
            <Typography variant="h4" className="register-title">
                REGJISTROHU NE PLATFORMEN TONE
            </Typography>

            {/* Description */}
            <Typography variant="body1" className="register-description">
                Nese jeni te paqarte se ciles kategori i perkisni, klikoni tek simboli{" "}
                <Tooltip title="Kliko tek ? e secilës kategori për më shumë info">
                    <HelpOutlineIcon className="info-icon" />
                </Tooltip>{" "}
                dhe do informoheni me shume.
            </Typography>

            {/* Cards Container */}
            <Box className="cards-container">
                {/* Talent Card */}
                <Card className={`register-card ${selectedCategory === "Talent" ? "selected-card" : ""}`}
                    onClick={() => handleCardClick("Talent")}>
                    <CardContent className="card-content">
                        <Typography variant="h6" className="card-title">Talent</Typography>
                        <Box className="icon-container">
                            <PersonIcon className="card-icon" />
                        </Box>
                        <Box className="card-bottom">
                            <IconButton
                                onClick={() => handleInfoClick("Talenti është një punëtor i pavarur.")}>
                                <HelpOutlineIcon className="info-icon" />
                            </IconButton>
                        </Box>
                    </CardContent>
                </Card>

                {/* Agjensi Card */}
                {/* <Card className={`register-card ${selectedCategory === "Agjensi" ? "selected-card" : ""}`}
                    onClick={() => handleCardClick("Agjensi")}>
                    <CardContent className="card-content">
                        <Typography variant="h6" className="card-title">Agjensi</Typography>
                        <Box className="icon-container">
                            <BusinessIcon className="card-icon" />
                        </Box>
                        <Box className="card-bottom">
                            <IconButton
                                onClick={() => handleInfoClick("Agjensia ofron shërbime për klientët.")}>
                                <HelpOutlineIcon className="info-icon" />
                            </IconButton>
                        </Box>
                    </CardContent>
                </Card> */}

                {/* Klient Card */}
                <Card className={`register-card ${selectedCategory === "Klient" ? "selected-card" : ""}`}
                    onClick={() => handleCardClick("Klient")}>
                    <CardContent className="card-content">
                        <Typography variant="h6" className="card-title">Klient</Typography>
                        <Box className="icon-container">
                            <StorefrontIcon className="card-icon" />
                        </Box>
                        <Box className="card-bottom">
                            <IconButton
                                onClick={() => handleInfoClick("Klienti kërkon shërbime nga talentët dhe agjensitë.")}>
                                <HelpOutlineIcon className="info-icon" />
                            </IconButton>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            {/* Info Box - Shows only when clicking ? */}
            {infoText && (
                <Box className="info-box">
                    <Typography variant="body1">{infoText}</Typography>
                </Box>
            )}

            {/* Register Button */}
            <Button className="register-button" onClick={handleRegisterClick}>
                REGJISTROHU
            </Button>

            {/* Login Link */}
            <Typography variant="body1" className="login-text">
                Nese keni nje llogari me ne jeni te lutur te beni login{" "}
                <Link to="/login" className="login-link">
                    ketu
                </Link>
                .
            </Typography>
        </Box>
    );
};

export default RegisterComponent;
