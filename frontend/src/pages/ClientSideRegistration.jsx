import API from "../services/api";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx"; // ✅ Import AuthContext
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const ClientSideRegistration = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const selectedCategory = location.state?.category || "Nuk u përzgjodh kategori";

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

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

        };

        try {
            const response = await API.post("/users", userData);
            const savedUser = response.data;

            // 🧹 Clean old localStorage entries
            localStorage.removeItem("loggedInUser");
            localStorage.removeItem("talentProfileData");

            // 💾 Save session
            localStorage.setItem("user", JSON.stringify(savedUser));
            localStorage.setItem("clientId", savedUser.id);

            loginUser(savedUser);
            navigate(`/client-profile/${savedUser.id}`);
        } catch (error) {
            console.error("❌ Failed to register client:", error);
            alert("Gabim gjatë regjistrimit!");
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
                    {selectedCategory}
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
                        SUBMIT
                    </Button>
                </form>
            </Box>
            <Footer />
        </>
    );
};

export default ClientSideRegistration;
