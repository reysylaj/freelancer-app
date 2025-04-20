// ✅ proposalService.js
import API from "./api";

// ✅ Create a proposal
export const createProposal = async (proposalData) => {
    const response = await API.post("/proposals", proposalData);
    return response.data;
};

// ✅ Get all proposals (admin or debug use)
export const getAllProposals = async () => {
    const response = await API.get("/proposals");
    return response.data;
};

// ✅ Get proposals by talentId
export const getProposalsByTalent = async (talentId) => {
    const response = await API.get(`/proposals/talent/${talentId}`);
    return response.data;
};

// ✅ Get proposals by clientId
export const getProposalsByClient = async (clientId) => {
    const response = await API.get(`/proposals/client/${clientId}`);
    return response.data;
};

// ✅ Update proposal status (Accepted, Rejected, Pending)
export const updateProposalStatus = async (proposalId, newStatus) => {
    const response = await API.patch(`/proposals/${proposalId}/status`, { status: newStatus });
    return response.data;
};

export const getProposalsByTalentId = async (talentId) => {
    const response = await API.get(`/proposals/talent/${talentId}`);
    return response.data;
};