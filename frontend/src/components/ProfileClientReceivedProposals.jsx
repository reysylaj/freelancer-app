import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Avatar, Button, Pagination, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ new import
import ClientProposalListPopup from "./ClientProposalListPopup";
import { getProposalsByClient, updateProposalStatus as updateStatusBackend } from "../services/proposalService";
import "../styles/ProfileClientReceivedProposals.css";

const ITEMS_PER_PAGE = 4;

const ProfileClientReceivedProposals = () => {
    const { authUser } = useAuth(); // ✅ use the context
    const clientId = authUser?.id; // ✅ instead of localStorage
    const navigate = useNavigate();

    const [proposals, setProposals] = useState([]);
    const [selectedProposal, setSelectedProposal] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [page, setPage] = useState(1);
    const [paginatedProposals, setPaginatedProposals] = useState([]);

    useEffect(() => {
        const loadProposals = async () => {
            try {
                if (!clientId) return;
                const clientProposals = await getProposalsByClient(clientId);
                setProposals(clientProposals);
                updatePaginated(clientProposals, 1);
            } catch (error) {
                console.error("Failed to fetch proposals:", error);
            }
        };

        loadProposals();
    }, [clientId]);

    const updatePaginated = (data, page) => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        setPaginatedProposals(data.slice(start, end));
        setPage(page);
    };

    const handlePageChange = (event, value) => {
        updatePaginated(proposals, value);
    };

    const handleOpenPopup = (proposal) => {
        setSelectedProposal(proposal);
        setOpenPopup(true);
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
        setSelectedProposal(null);
    };

    const updateProposalStatus = async (proposalId, newStatus) => {
        try {
            await updateStatusBackend(proposalId, newStatus);
            const updated = proposals.map(p => p.id === proposalId ? { ...p, status: newStatus } : p);
            setProposals(updated);
            updatePaginated(updated, page);
            setSelectedProposal(prev => prev ? { ...prev, status: newStatus } : null);
        } catch (error) {
            console.error("Error updating proposal status:", error);
        }
    };

    const handleViewTalentProfile = (talentId) => {
        navigate(`/view-talent-profile/${proposal.talentId}`);
    };

    return (
        <Box className="received-proposals-container">
            <Typography variant="h5" className="received-proposals-title">Proposals Received</Typography>

            {paginatedProposals.length === 0 ? (
                <Typography>No proposals received yet.</Typography>
            ) : (
                <Box className="cards-container">
                    {paginatedProposals.map((proposal) => (
                        <Card key={proposal.id} className="proposal-card">
                            <CardContent>
                                <Avatar src={proposal.talentProfilePic || "/default-avatar.png"} className="proposal-avatar" />
                                <Typography variant="h6">{proposal.talentName}</Typography>
                                <Typography variant="body2">
                                    {proposal.coverLetter?.length > 100
                                        ? proposal.coverLetter.substring(0, 100) + "..."
                                        : proposal.coverLetter}
                                </Typography>

                                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                                    <Button size="small" variant="outlined" onClick={() => handleOpenPopup(proposal)}>
                                        View Proposal
                                    </Button>
                                    <Button size="small" variant="outlined" onClick={() => handleViewTalentProfile(proposal.talentId)}>
                                        View Talent Profile
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}

            <Box className="pagination-controls">
                <Pagination
                    count={Math.ceil(proposals.length / ITEMS_PER_PAGE)}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    shape="rounded"
                />
            </Box>

            <ClientProposalListPopup
                proposals={selectedProposal ? [selectedProposal] : []}
                open={openPopup}
                onClose={handleClosePopup}
                onAccept={(id) => updateProposalStatus(id, "Accepted")}
                onDecline={(id) => updateProposalStatus(id, "Rejected")}
                onPending={(id) => updateProposalStatus(id, "Pending")}
            />
        </Box>
    );
};

export default ProfileClientReceivedProposals;
