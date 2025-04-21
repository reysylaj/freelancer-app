import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/ClientSideRegistration.css";

const ClientSideRegistration = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const selectedCategory = location.state?.category || sessionStorage.getItem("selectedClientCategory") || "General";

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        companyName: "",
    });

    useEffect(() => {
        if (!location.state?.category && !sessionStorage.getItem("selectedClientCategory")) {
            sessionStorage.setItem("selectedClientCategory", "General");
        }
    }, [selectedCategory, location.state]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Fjalëkalimet nuk përputhen!");
            return;
        }

        const userData = {
            name: formData.firstName,
            surname: formData.lastName,
            email: formData.email,
            password: formData.password,
            role: "client",
            category: selectedCategory,
            jobRole: "",
        };

        try {
            const registered = await register(userData); // ✅ await response from AuthContext
            navigate(`/client-profile/${registered.id}`); // ✅ Redirect to correct profile
        } catch (error) {
            console.error("❌ Error registering client:", error);

            alert(
                error.response?.data?.message?.join("\n") ||
                "Gabim gjatë regjistrimit të klientit!"
            );
        }
    };

    return (
        <>
            <Header />
            <Box className="registration-container">
                <Typography variant="h4" className="register-title">
                    VENDOS TE DHENAT E TUA PER TU REGJISTRUAR:
                </Typography>

                <Typography variant="body1" className="selected-category">
                    Kategoria e zgjedhur: <strong>{selectedCategory}</strong>
                </Typography>

                <form onSubmit={handleSubmit} className="registration-form">
                    <TextField
                        label="Emër"
                        name="firstName"
                        fullWidth
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        label="Mbiemër"
                        name="lastName"
                        fullWidth
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        label="Fjalëkalimi"
                        name="password"
                        type="password"
                        fullWidth
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        label="Përsërit Fjalëkalimin"
                        name="confirmPassword"
                        type="password"
                        fullWidth
                        required
                        onChange={handleChange}
                    />

                    <Button type="submit" className="submit-button">
                        REGJISTROHU
                    </Button>
                </form>
            </Box>
            <Footer />
        </>
    );
};

export default ClientSideRegistration;
