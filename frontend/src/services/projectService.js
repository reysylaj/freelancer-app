//projectService.js
import API from "./api";

export const createProject = async (data) => {
    const response = await API.post("/projects", data);
    return response.data;
};

export const getAllProjects = async () => {
    const response = await API.get("/projects");
    return response.data;
};

export const getProjectsByTalentId = async (talentId) => {
    const response = await API.get(`/projects/talent/${talentId}`, { withCredentials: true });
    return response.data;
};


export const deleteProject = async (id) => {
    const response = await API.delete(`/projects/${id}`);
    return response.data;
};
