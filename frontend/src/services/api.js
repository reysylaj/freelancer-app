import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000', // Change this to your backend URL if deployed
});

export default API;
