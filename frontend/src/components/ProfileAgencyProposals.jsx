import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Avatar,
    Chip
} from "@mui/material";
import "../styles/ProfileAgencyProposals.css";

const ProfileAgencyProposals = () => {
    const [proposals, setProposals] = useState([]);

    useEffect(() => {
        const storedProposals = JSON.parse(localStorage.getItem("agencyProposals")) || [];
        setProposals(storedProposals);
    }, []);

    return (
        <Box className="agency-proposals-container">
            <Typography variant="h5" className="agency-proposals-title">Proposals Sent</Typography>

            {proposals.length === 0 ? (
                <Typography className="no-proposals">No proposals sent yet.</Typography>
            ) : (
                <Box className="proposals-grid">
                    {proposals.map((proposal, index) => (
                        <Card key={index} className="proposal-card">
                            <CardContent>
                                <Box className="proposal-header">
                                    <Avatar src={proposal.clientProfile} className="proposal-avatar" />
                                    <Box>
                                        <Typography variant="h6">{proposal.clientName}</Typography>
                                        <Typography variant="body2" className="proposal-date">{proposal.dateSent}</Typography>
                                    </Box>
                                </Box>
                                <Typography variant="body1" className="proposal-text">{proposal.message}</Typography>
                                <Chip
                                    label={proposal.status}
                                    className={`proposal-status ${proposal.status.toLowerCase()}`}
                                />
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    href={proposal.jobLink}
                                    target="_blank"
                                >
                                    View Job Post
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default ProfileAgencyProposals;
