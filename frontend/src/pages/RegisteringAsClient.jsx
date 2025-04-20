import { useState } from "react";
import { Box, Typography, Button, Card, CardContent, IconButton, Tooltip } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import BusinessIcon from "@mui/icons-material/Business";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/RegisteringAsClient.css";

const RegisteringAsClient = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [infoText, setInfoText] = useState("");

    // Handle category selection
    const handleCardClick = (category) => {
        setSelectedCategory(category);
    };

    // Handle info box click
    const handleInfoClick = (text) => {
        setInfoText(text);
    };

    // Handle registration
    const handleRegister = () => {
        if (selectedCategory) {
            navigate("/client-registration", { state: { category: selectedCategory } });
        }
    };

    return (
        <>
            <Header />
            <Box className="register-container">
                {/* Title */}
                <Typography variant="h4" className="register-title">
                    JU ZGJODHET TE REGJISTROHENI SI KLIENT
                </Typography>

                {/* Description */}
                <Typography variant="body1" className="register-description">
                    Jeni te lutur te zgjidhni kategorine qe ndiheni te perfshire. Klikoni{" "}
                    <Tooltip title="Kliko për më shumë info">
                        <HelpOutlineIcon className="info-icon" />
                    </Tooltip>{" "}
                    per tu informuar me shume.
                </Typography>

                {/* Cards Container */}
                <Box className="cards-container">
                    {/* First Card - Simple Client */}
                    <Card
                        className={`register-card ${selectedCategory === "Kerkon thjesht 1 punetor per t’iu ndihmuar" ? "selected-card" : ""}`}
                        onClick={() => handleCardClick("Kerkon thjesht 1 punetor per t’iu ndihmuar")}
                    >
                        <CardContent>
                            <Typography variant="h6" className="card-title">Klient/</Typography>
                            <Box className="icon-container"><PersonIcon className="card-icon" /></Box>
                            <Typography variant="body2" className="card-text">
                                Kerkon thjesht 1 punetor per t’iu ndihmuar
                            </Typography>
                            <Box className="card-bottom">
                                <IconButton onClick={() => handleInfoClick("Ky klient kërkon vetëm një punëtor për ndihmë të thjeshtë.")} className="info-button">
                                    <HelpOutlineIcon className="info-icon" />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Second Card - Freelancer Team */}
                    <Card
                        className={`register-card ${selectedCategory === "Kerkon shok skuadre per 1 pune freelancing dhe sje kompani" ? "selected-card" : ""}`}
                        onClick={() => handleCardClick("Kerkon shok skuadre per 1 pune freelancing dhe sje kompani")}
                    >
                        <CardContent>
                            <Typography variant="h6" className="card-title">Klient/</Typography>
                            <Box className="icon-container"><GroupIcon className="card-icon" /></Box>
                            <Typography variant="body2" className="card-text">
                                Kerkon shok skuadre per 1 pune freelancing dhe sje kompani
                            </Typography>
                            <Box className="card-bottom">
                                <IconButton onClick={() => handleInfoClick("Ky klient kërkon bashkëpunëtorë për projekte freelance.")} className="info-button">
                                    <HelpOutlineIcon className="info-icon" />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Third Card - Company Hiring */}
                    <Card
                        className={`register-card ${selectedCategory === "Kompani qe kerkon staf. qofte 1 apo me shume punetor" ? "selected-card" : ""}`}
                        onClick={() => handleCardClick("Kompani qe kerkon staf. qofte 1 apo me shume punetor")}
                    >
                        <CardContent>
                            <Typography variant="h6" className="card-title">Klient/</Typography>
                            <Box className="icon-container"><BusinessIcon className="card-icon" /></Box>
                            <Typography variant="body2" className="card-text">
                                Kompani qe kerkon staf. qofte 1 apo me shume punetor
                            </Typography>
                            <Box className="card-bottom">
                                <IconButton onClick={() => handleInfoClick("Kjo kompani po kërkon staf të ri për punësim.")} className="info-button">
                                    <HelpOutlineIcon className="info-icon" />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Fourth Card - Outsourcing */}
                    <Card
                        className={`register-card ${selectedCategory === "Ndermjetes midis 1 kompanie dhe 1 punonjesi. outsource, gjen staf per kompanine" ? "selected-card" : ""}`}
                        onClick={() => handleCardClick("Ndermjetes midis 1 kompanie dhe 1 punonjesi. outsource, gjen staf per kompanine")}
                    >
                        <CardContent>
                            <Typography variant="h6" className="card-title">Klient/</Typography>
                            <Box className="icon-container"><SupervisorAccountIcon className="card-icon" /></Box>
                            <Typography variant="body2" className="card-text">
                                Ndermjetes midis 1 kompanie dhe 1 punonjesi. outsource, gjen staf per kompanine
                            </Typography>
                            <Box className="card-bottom">
                                <IconButton onClick={() => handleInfoClick("Kjo kompani ndihmon në gjetjen e stafit për kompani të tjera.")} className="info-button">
                                    <HelpOutlineIcon className="info-icon" />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                {/* Info Box */}
                {infoText && (
                    <Box className="info-box">
                        <Typography variant="body1">{infoText}</Typography>
                    </Box>
                )}

                {/* Register Button - Disabled if no category is selected */}
                <Button onClick={handleRegister} disabled={!selectedCategory} className="register-button">
                    REGJISTROHU
                </Button>

                {/* Login Link */}
                <Typography variant="body1" className="login-text">
                    Nese keni nje llogari me ne jeni te lutur te beni login{" "}
                    <Link to="/login" className="login-link">ketu</Link>.
                </Typography>
            </Box>
            <Footer />
        </>
    );
};

export default RegisteringAsClient;
