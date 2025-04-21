//jobService.js
import API from "./api"; // Axios instance

export const createJob = async (jobData) => {
    const response = await API.post("/jobs", jobData);
    return response.data;
};

export const getAllJobs = async () => {
    const response = await API.get("/jobs");
    return response.data;
};

export const getJobById = async (id) => {
    const response = await API.get(`/jobs/${id}`);
    return response.data;
};

export const getJobsByClientId = async (clientId) => {
    const response = await API.get(`/jobs/client/${clientId}`);
    return response.data;
};

export const deleteJob = async (id) => {
    const res = await API.delete(`/jobs/${id}`, { withCredentials: true });
    return res.data;
};
