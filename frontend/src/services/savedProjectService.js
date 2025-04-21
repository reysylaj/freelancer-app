//savedProjectService.js
import API from "./api";

// 🔸 Save project (CLIENT SIDE)
export const saveProjectToBackend = async (data) => {
    const response = await API.post("/saved/project", data, { withCredentials: true });
    return response.data;
};

// 🔸 Get saved projects (CLIENT SIDE)
export const getSavedProjects = async () => {
    const response = await API.get("/saved/project", { withCredentials: true });
    return response.data;
};

// 🔸 Remove saved project (CLIENT SIDE)
export const removeSavedProjectFromBackend = async (id) => {
    const response = await API.delete(`/saved/project/${id}`, { withCredentials: true });
    return response.data;
};
