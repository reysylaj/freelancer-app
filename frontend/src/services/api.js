import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true, // ✅ THIS is very important for cookies to be sent
});

export default API;
