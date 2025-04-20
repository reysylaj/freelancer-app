import API from "./api";

export const saveJobToBackend = async (data) => {
    const response = await API.post("/saved", data);
    return response.data;
};

export const getSavedJobs = async (talentId) => {
    const response = await API.get(`/saved/talent/${talentId}`);
    return response.data;
};

export const removeSavedJobFromBackend = async (id) => {
    const response = await API.delete(`/saved/${id}`);
    return response.data;
};
