// import { useContext } from "react";
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Use the custom hook instead of AuthContext
import logo from "../assets/react.svg";
import "../styles/Header.css";

const Header = () => {
    const { authUser, logout } = useAuth(); // ✅ Updated context usage
    console.log("💡 Logged in user:", authUser);

    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/'); // or navigate('/login')
    };

    return (
        <AppBar position="static" className="appbar">
            <Toolbar className="toolbar">
                {/* ✅ Logo */}
                <Box className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                </Box>

                {/* ✅ Navigation Buttons */}
                <Box className="nav-links">
                    <Button className="nav-button" component={Link} to="/">
                        Kryefaqja
                    </Button>
                    <Button className="nav-button" component={Link} to="/punet">
                        Punët e fundit
                    </Button>
                    <Button className="nav-button" component={Link} to="/projektet">
                        Projektet e fundit
                    </Button>

                    {authUser ? (
                        <>
                            {authUser.role === "client" && (
                                <Button className="nav-button" component={Link} to={`/client-profile/${authUser.id}`}>
                                    Hello, {authUser.name} {authUser.surname}
                                </Button>
                            )}
                            {authUser.role === "talent" && (
                                <Button className="nav-button" component={Link} to={`/talent-profile/${authUser.id}`}>
                                    Hello, {authUser.name} {authUser.surname}
                                </Button>
                            )}
                            {authUser.role === "agency" && (
                                <Button className="nav-button" component={Link} to={`/agency-profile/${authUser.id}`}>
                                    Hello, {authUser.agencyName}
                                </Button>
                            )}

                            <Button className="nav-button" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Button className="nav-button" component={Link} to="/identifikohu">
                            Identifikohu
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
