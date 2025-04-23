import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    Box,
} from "@mui/material";

const ClientProposalListPopup = ({ proposals, open, onClose, onAccept, onDecline, onPending }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Proposal Details</DialogTitle>
            <DialogContent>
                {proposals.map((proposal) => (
                    <List key={proposal.id}>
                        <ListItem>
                            <ListItemText
                                primary={`${proposal.talentName} - ${proposal.jobTitle}`}
                                secondary={
                                    <Box>
                                        <Typography variant="body2">
                                            <strong>Status:</strong> {proposal.status}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            <strong>Cover Letter:</strong>
                                        </Typography>
                                        <Box sx={{ p: 2, background: "#f5f5f5", borderRadius: "5px" }}>
                                            <Typography variant="body1">
                                                {proposal.message || "No message provided."}
                                            </Typography>
                                        </Box>
                                    </Box>
                                }
                            />
                        </ListItem>
                        <ListItem>
                            <Button onClick={() => onAccept(proposal.id)} color="success" variant="contained">
                                Accept
                            </Button>
                            <Button onClick={() => onPending(proposal.id)} color="warning" variant="contained" sx={{ ml: 2 }}>
                                Pending
                            </Button>
                            <Button onClick={() => onDecline(proposal.id)} color="error" variant="contained" sx={{ ml: 2 }}>
                                Reject
                            </Button>
                        </ListItem>
                    </List>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ClientProposalListPopup;
