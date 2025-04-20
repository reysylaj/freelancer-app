import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { Box, Typography, TextField, Button } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import API from "../services/api"; // ✅ Axios API
import "../styles/LoginPage.css";

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data: allUsers } = await API.get("/users");

            const userData = allUsers.find(
                (user) => user.email === formData.email && user.password === formData.password
            );

            if (userData) {
                // 🔄 Clear existing sessions
                localStorage.removeItem("user");
                localStorage.removeItem("talentId");
                localStorage.removeItem("clientId");
                localStorage.removeItem("loggedInUser");
                localStorage.removeItem("talentProfileData");
                
                // 💾 Save current session
                localStorage.setItem("user", JSON.stringify(userData));
                if (userData.role === "client") localStorage.setItem("clientId", userData.id);
                if (userData.role === "talent") localStorage.setItem("talentId", userData.id);

                loginUser(userData);

                if (userData.role === "client") {
                    navigate(`/client-profile/${userData.id}`);
                } else if (userData.role === "talent") {
                    navigate(`/talent-profile/${userData.id}`);
                } else if (userData.role === "agency") {
                    navigate("/agency-profile");
                }
            } else {
                setError("Email ose fjalëkalimi i pasaktë!");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Dështoi lidhja me serverin.");
        }
    };

    return (
        <>
            <Header />
            <Box className="login-container">
                <Box className="login-box">
                    <Typography variant="h5" className="login-header">Identifikohu</Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    <form onSubmit={handleSubmit}>
                        <TextField label="Email" name="email" required fullWidth onChange={handleChange} />
                        <TextField label="Fjalëkalimi" name="password" type="password" required fullWidth onChange={handleChange} />
                        <Button type="submit" className="login-button">LOGIN</Button>
                    </form>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default Login;
