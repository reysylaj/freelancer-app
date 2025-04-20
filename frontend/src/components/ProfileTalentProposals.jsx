import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Chip } from "@mui/material";
import "../styles/ProfileTalentProposals.css";

const ProfileTalentProposals = () => {
    const [proposals, setProposals] = useState([]);

    useEffect(() => {
        const storedProposals = JSON.parse(localStorage.getItem("proposals")) || [];
        setProposals(storedProposals);
    }, []);

    return (
        <Box className="proposals-container">
            <Typography variant="h6" className="proposals-title">
                📩 Total Proposals Sent: {proposals.length}
            </Typography>

            <Box className="proposals-list">
                {proposals.length > 0 ? (
                    proposals.map((proposal) => (
                        <Card key={proposal.id} className="proposal-card">
                            <CardContent>
                                <Typography variant="h6">{proposal.jobTitle}</Typography>
                                <Typography variant="body2" className="proposal-client">
                                    {proposal.client}
                                </Typography>
                                <Typography variant="body2" className="proposal-date">
                                    Sent on: {proposal.date}
                                </Typography>
                                <Chip
                                    label={proposal.status}
                                    className={`status-chip ${proposal.status.toLowerCase()}`}
                                />
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography>No proposals sent yet.</Typography>
                )}
            </Box>
        </Box>
    );
};

export default ProfileTalentProposals;
