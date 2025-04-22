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
    MenuItem
} from "@mui/material";
import { getProposalsByTalentId } from "../services/proposalService";
import "../styles/ProfileTalentTotalProposalsSent.css";

const ProfileTalentTotalProposalsSent = () => {
    const [proposals, setProposals] = useState([]);
    const [filter, setFilter] = useState("All");

    const { authUser } = useAuth();
    const talentId = storedUser.id;

    useEffect(() => {
        const fetchProposals = async () => {
            try {
                const data = await getProposalsByTalentId(talentId);
                setProposals(data);
            } catch (error) {
                console.error("Error loading proposals:", error);
            }
        };

        fetchProposals();
    }, [talentId]);

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
                                    <TableCell>{proposal.clientName}</TableCell>
                                    <TableCell>
                                        {new Date(proposal.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell
                                        className={`status-cell ${proposal.status.toLowerCase()}`}
                                    >
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
