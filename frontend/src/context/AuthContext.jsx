import { createContext, useState, useEffect } from "react";

// Create Context
export const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("loggedInUser");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const loginUser = (userData) => {
        setUser(userData);
        localStorage.setItem("loggedInUser", JSON.stringify(userData)); // ✅ Store only logged-in user
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem("loggedInUser"); // ✅ Only remove session user, not all users
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};
