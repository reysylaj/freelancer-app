import { useContext } from "react";
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import logo from "../assets/react.svg"; // ✅ Correct image path
import "../styles/Header.css"; // ✅ Import external CSS

const Header = () => {
    const { user, logoutUser } = useContext(AuthContext); // ✅ Get user data

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

                    {/* ✅ Fix: Show correct name based on user role */}
                    {user ? (
                        <>
                            {user.role === "client" && (
                                <Button className="nav-button" component={Link} to={`/client-profile/${user.id}`}>
                                    Hello, {user.name} {user.surname}
                                </Button>
                            )}
                            {user.role === "talent" && (
                                <Button className="nav-button" component={Link} to={`/talent-profile/${user.id}`}>
                                    Hello, {user.name} {user.surname}
                                </Button>
                            )}
                            {user.role === "agency" && (
                                <Button className="nav-button" component={Link} to={`/agency-profile/${user.id}`}>
                                    Hello, {user.agencyName}
                                </Button>
                            )}

                            <Button className="nav-button" onClick={logoutUser}>
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
