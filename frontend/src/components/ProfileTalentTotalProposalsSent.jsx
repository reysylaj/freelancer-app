import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Select,
    MenuItem,
} from "@mui/material";
import { getProposalsByTalentId } from "../services/proposalService";
import "../styles/ProfileTalentTotalProposalsSent.css";
import { useAuth } from "../context/AuthContext";

const ProfileTalentTotalProposalsSent = () => {
    const [proposals, setProposals] = useState([]);
    const [filter, setFilter] = useState("All");

    const { authUser } = useAuth();
    const talentId = authUser?.id;

    const fetchProposals = async () => {
        try {
            const data = await getProposalsByTalentId(talentId);
            setProposals(data);
        } catch (error) {
            console.error("Error loading proposals:", error);
        }
    };

    useEffect(() => {
        fetchProposals();
    }, [talentId]);

    useEffect(() => {
        const listener = () => fetchProposals();
        window.addEventListener("proposalSent", listener);
        return () => window.removeEventListener("proposalSent", listener);
    }, []);

    const filteredProposals =
        filter === "All"
            ? proposals
            : proposals.filter((p) => p.status === filter);

    return (
        <Box className="proposals-container">
            <Typography variant="h5" className="section-title">
                Total Proposals Sent
            </Typography>
            <Typography variant="h6" className="total-proposals">
                Total: {filteredProposals.length}
            </Typography>

            <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="filter-dropdown"
            >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Accepted">Accepted</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>

            <TableContainer component={Paper} className="proposals-table">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Job Title</TableCell>
                            <TableCell>Client</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProposals.length > 0 ? (
                            filteredProposals.map((proposal) => (
                                <TableRow key={proposal.id}>
                                    <TableCell>{proposal.jobTitle}</TableCell>
                                    <TableCell>{proposal.clientName || "Unknown"}</TableCell>
                                    <TableCell>
                                        {proposal.submittedAt
                                            ? new Date(proposal.submittedAt).toLocaleDateString()
                                            : "Unknown"}
                                    </TableCell>
                                    <TableCell className={`status-cell ${proposal.status.toLowerCase()}`}>
                                        {proposal.status}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="no-data">
                                    No proposals found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ProfileTalentTotalProposalsSent;
