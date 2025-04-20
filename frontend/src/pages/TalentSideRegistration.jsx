import API from "../services/api";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext.jsx";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/TalentSideRegistration.css";

const TalentSideRegistration = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const selectedCategory = location.state?.category || sessionStorage.getItem("selectedTalentCategory") || "Nuk ka kategori të zgjedhur";

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        jobRole: "",
    });

    useEffect(() => {
        if (!location.state?.category) {
            sessionStorage.setItem("selectedTalentCategory", selectedCategory);
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

        const newTalent = {
            name: formData.firstName,
            surname: formData.lastName,
            email: formData.email,
            password: formData.password,
            role: "talent",
            category: selectedCategory,
            jobRole: formData.jobRole,
            skills: "",
            profilePicture: "",
        };

        try {
            const response = await API.post("/users", newTalent);
            const savedTalent = response.data;

            // 🧹 Clean old localStorage entries
            localStorage.removeItem("loggedInUser");
            localStorage.removeItem("talentProfileData");

            // 💾 Save session
            localStorage.setItem("user", JSON.stringify(savedTalent));
            localStorage.setItem("talentId", savedTalent.id);

            loginUser(savedTalent);
            navigate(`/talent-profile/${savedTalent.id}`);
        } catch (error) {
            console.error("❌ Failed to register talent:", error);
            alert("Gabim gjatë regjistrimit të talentit!");
        }
    };


    return (
        <>
            <Header />
            <Box className="registration-container">
                <Typography variant="h4" className="registration-title">VENDOS TE DHENAT E TUA PER TU REGJISTRUAR</Typography>
                <Typography variant="body1" className="selected-category">
                    Kategoria e zgjedhur: <strong>{selectedCategory}</strong>
                </Typography>
                <form onSubmit={handleSubmit} className="registration-form">
                    <TextField label="Emri" name="firstName" value={formData.firstName} onChange={handleChange} required fullWidth />
                    <TextField label="Mbiemri" name="lastName" value={formData.lastName} onChange={handleChange} required fullWidth />
                    <TextField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required fullWidth />
                    <TextField label="Roli i punës që kërkoni" name="jobRole" value={formData.jobRole} onChange={handleChange} required fullWidth />
                    <TextField label="Fjalëkalimi" type="password" name="password" value={formData.password} onChange={handleChange} required fullWidth />
                    <TextField label="Përsërit Fjalëkalimin" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required fullWidth />
                    <Button type="submit" className="submit-button">REGJISTROHU</Button>
                </form>
            </Box>
            <Footer />
        </>
    );
};

export default TalentSideRegistration;
