//savedJobService.js
import API from "./api";

// 🔹 Save job (TALENT SIDE)
export const saveJobToBackend = async (data) => {
    const response = await API.post("/saved/job", data, { withCredentials: true });
    return response.data;
};

// 🔹 Get saved jobs (TALENT SIDE)
export const getSavedJobs = async () => {
    const response = await API.get("/saved/job", { withCredentials: true });
    return response.data;
};

// 🔹 Remove saved job (TALENT SIDE)
export const removeSavedJobFromBackend = async (id) => {
    const response = await API.delete(`/saved/job/${id}`, { withCredentials: true });
    return response.data;
};
