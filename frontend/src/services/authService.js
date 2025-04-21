// authService.js
import API from "./api";

export const registerUser = (data) =>
    API.post('/auth/register', data, { withCredentials: true });

export const loginUser = (data) =>
    API.post('/auth/login', data, { withCredentials: true });

export const logoutUser = () =>
    API.post('/auth/logout', {}, { withCredentials: true });

export const getCurrentUser = () =>
    API.get('/auth/me', { withCredentials: true }); // 👈 This calls the /auth/me route
