import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography
} from "@mui/material";

const TalentProfileViewJobBeforeSubmitProposal = ({ job, open, onClose, onSendProposal }) => {
    if (!job || !job.job) return null; // ✅ Check nested job

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>{job.job.title || "Job Details"}</DialogTitle>
            <DialogContent>
                <Typography><strong>Company:</strong> {job.job.clientName || "N/A"}</Typography>
                <Typography><strong>Description:</strong> {job.job.description || "No description provided"}</Typography>
                <Typography><strong>Budget:</strong> 💰 {job.job.budget ? `${job.job.budget} ALL` : "Not specified"}</Typography>
                <Typography><strong>Job Type:</strong> {job.job.jobType || "Not specified"}</Typography>
                <Typography><strong>Seniority Level:</strong> {job.job.seniorityLevel || "Not specified"}</Typography>
                <Typography><strong>Work Mode:</strong> {job.job.workMode || "Not specified"}</Typography>
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
