import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx"; // ✅ Import AuthContext
import Header from "../components/Header";
import Footer from "../components/Footer";

const RegisteringAsAgency = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const selectedCategory = location.state?.category || "Nuk u përzgjodh kategori";

    const [formData, setFormData] = useState({
        agencyName: "",
        ownerName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Fjalëkalimet nuk përputhen!");
            return;
        }

        // ✅ Save Correct Fields for Agency
        const agencyData = {
            agencyName: formData.agencyName,
            ownerName: formData.ownerName,
            email: formData.email,
            password: formData.password,
            role: "agency",
            category: selectedCategory,
        };

        console.log("User Data to be Saved:", agencyData);

        loginUser(agencyData); // ✅ Save user in Context
        localStorage.setItem("user", JSON.stringify(agencyData)); // ✅ Save in localStorage

        console.log("Stored User in localStorage:", localStorage.getItem("user"));

        navigate("/agency-profile");
    };



    return (
        <>
            <Header />
            <Box className="registration-container">
                <Typography variant="h4" className="register-title">
                    VENDOS TE DHENAT E AGENSISË PËR TU REGJISTRUAR:
                </Typography>

                <Typography variant="body1" className="selected-category">
                    {selectedCategory}
                </Typography>

                <form onSubmit={handleSubmit} className="registration-form">
                    <TextField
                        label="Emri i Agjensisë"
                        name="agencyName"
                        fullWidth
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        label="Emri i Pronarit"
                        name="ownerName"
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

export default RegisteringAsAgency;
