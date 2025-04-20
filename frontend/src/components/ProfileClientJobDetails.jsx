import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from "@mui/material";

const ProfileClientJobDetails = ({ selectedJob, onClose }) => {
    if (!selectedJob) return null;

    return (
        <Dialog open={Boolean(selectedJob)} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{selectedJob.title}</DialogTitle>
            <DialogContent>
                <Typography variant="body1"><strong>Description:</strong> {selectedJob.description}</Typography>
                <Typography variant="body2"><strong>Budget:</strong> ${selectedJob.budget}</Typography>
                <Typography variant="body2"><strong>Job Type:</strong> {selectedJob.jobType}</Typography>
                <Typography variant="body2"><strong>Work Mode:</strong> {selectedJob.workMode}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProfileClientJobDetails;
