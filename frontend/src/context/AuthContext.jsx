import { createContext, useContext, useEffect, useState } from 'react';
import {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
} from '../services/authService';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await API.get("/auth/profile", { withCredentials: true });
                setAuthUser(res.data);
                localStorage.setItem("user", JSON.stringify(res.data));
            } catch (err) {
                setAuthUser(null);
                localStorage.removeItem("user");
            } finally {
                setLoading(false); // ✅ This was missing!
            }
        };
        checkSession();
    }, []);

    const register = async (formData) => {
        try {
            const response = await registerUser(formData);
            setAuthUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
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
            const response = await loginUser(formData);
            setAuthUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            console.error("❌ Login failed:", error.response?.data || error.message);
            throw error;
        }
    };

    const logout = async () => {
        await logoutUser();
        localStorage.removeItem("user");
        localStorage.removeItem("talentProfileData");
        setAuthUser(null);
    };

    return (
        <AuthContext.Provider value={{ authUser, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
