import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Box, Typography, TextField, Button } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/LoginPage.css";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = await login(formData); // ✅ use backend login

            if (!user) {
                setError("Email ose fjalëkalimi i pasaktë!");
                return;
            }

            // Optional: route based on role
            if (user.role === "client") {
                navigate(`/client-profile/${user.id}`);
            } else if (user.role === "talent") {
                navigate(`/talent-profile/${user.id}`);
            } else if (user.role === "agency") {
                navigate("/agency-profile");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Dështoi lidhja me serverin ose kredencialet janë të pasakta.");
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
