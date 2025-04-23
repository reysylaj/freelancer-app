// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
} from '../services/authService';
import { useNavigate } from 'react-router-dom'; // ✅ ADD THIS AT THE TOP


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // ✅ INIT NAVIGATION

    // ✅ Automatically check session from cookie on app load / refresh
    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await getCurrentUser(); // gets user from cookie session
                setAuthUser(res.data); // ✅ save session user
            } catch (err) {
                setAuthUser(null); // session expired or no cookie
            } finally {
                setLoading(false); // always stop loading
            }
        };
        checkSession();
    }, []);

    const register = async (formData) => {
        try {
            const response = await registerUser(formData); // sets cookie in backend
            setAuthUser(response.data); // update user context
            return response.data;
        } catch (error) {
            console.error("❌ Register failed:", error.response?.data || error.message);
            alert(
                error.response?.data?.message?.join('\n') ||
                error.response?.data?.message ||
                "Registration failed"
            );
            throw error;
        }
    };

    const login = async (formData) => {
        try {
            const response = await loginUser(formData); // sets cookie in backend
            setAuthUser(response.data); // update user context
            return response.data;
        } catch (error) {
            console.error("❌ Login failed:", error.response?.data || error.message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await logoutUser(); // clears JWT cookie from backend
            setAuthUser(null); // clears frontend context
            navigate('/'); // ✅ REDIRECT TO HOMEPAGE
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <AuthContext.Provider value={{ authUser, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
