import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography
} from "@mui/material";

const TalentProfileViewJobBeforeSubmitProposal = ({ job, open, onClose, onSendProposal }) => {
    const realJob = job?.job || job;
    if (!realJob) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>{realJob.title || "Job Details"}</DialogTitle>
            <DialogContent>
                <Typography><strong>Company:</strong> {realJob.clientName || "N/A"}</Typography>
                <Typography><strong>Description:</strong> {realJob.description || "No description provided"}</Typography>
                <Typography><strong>Budget:</strong> 💰 {realJob.budget ? `${realJob.budget} ALL` : "Not specified"}</Typography>
                <Typography><strong>Job Type:</strong> {realJob.jobType || "Not specified"}</Typography>
                <Typography><strong>Seniority Level:</strong> {realJob.seniorityLevel || "Not specified"}</Typography>
                <Typography><strong>Work Mode:</strong> {realJob.workMode || "Not specified"}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
                <Button onClick={() => onSendProposal(job)} variant="contained" color="primary">
                    Send Proposal
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TalentProfileViewJobBeforeSubmitProposal;
