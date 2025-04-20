import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

const ClientProfilePopupViewCreatedPost = ({ open, job, onClose }) => {
    if (!job) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{job.title}</DialogTitle>
            <DialogContent>
                <Typography variant="body1"><strong>Description:</strong> {job.description}</Typography>
                <Typography variant="body2"><strong>Budget:</strong> {job.budget} ALL</Typography>
                <Typography variant="body2"><strong>Job Type:</strong> {job.jobType}</Typography>
                <Typography variant="body2"><strong>Seniority Level:</strong> {job.seniorityLevel}</Typography>
                <Typography variant="body2"><strong>Work Mode:</strong> {job.workMode}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ClientProfilePopupViewCreatedPost;
