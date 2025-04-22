import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const updateClientProfile = async (id, data) => {
    return axios.patch(`${BASE_URL}/users/${id}`, data);
};

export const getClientById = async (id) => {
    return axios.get(`${BASE_URL}/users/${id}`);
};
