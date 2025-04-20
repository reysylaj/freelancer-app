import { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import "../styles/ForgotPassword.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`A password reset link has been sent to ${email}`);
    };

    return (
        <>
            <Header />
            <Box className="forgot-password-container">
                <Box className="forgot-password-box">
                    <Typography variant="h4" className="forgot-password-header">
                        Harrove Fjalëkalimin?
                    </Typography>
                    <Typography variant="body1" className="forgot-password-description">
                        Vendos emailin tuaj për të marrë një lidhje për të rivendosur fjalëkalimin.
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            fullWidth
                            required
                            value={email}
                            onChange={handleChange}
                            className="input-field"
                        />
                        <Button type="submit" className="submit-button">
                            Dërgo Lidhjen
                        </Button>
                    </form>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default ForgotPassword;
