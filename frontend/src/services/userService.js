import API from "./api";

export const getUserById = async (id) => {
    const response = await API.get(`/users/${id}`, { withCredentials: true });
    return response.data;
};
