import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography
} from "@mui/material";
import { createProposal } from "../services/proposalService";
import { useAuth } from "../context/AuthContext";

const TalentProfileSendFinalSubmitProposal = ({ job, open, onClose }) => {
    const { authUser } = useAuth();
    const [coverLetter, setCoverLetter] = useState("");
    const [file, setFile] = useState(null);

    if (!job || !job.job || !authUser) return null;

    const realJob = job.job;

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmitProposal = async () => {
        if (!coverLetter.trim()) return;

        const newProposal = {
            jobId: realJob.id,
            jobTitle: realJob.title,
            clientId: realJob.clientId,
            clientName: realJob.clientName || "Unknown Client",
            talentId: authUser.id,
            talentName: authUser.name,
            talentProfilePic: authUser.profilePicture,
            message: coverLetter,
            status: "Pending",
        };

        try {
            await createProposal(newProposal);
            alert("✅ Proposal submitted successfully!");
            setCoverLetter("");
            setFile(null);
            window.dispatchEvent(new Event("proposalSent"));
            onClose();
        } catch (err) {
            console.error("❌ Failed to send proposal:", err);
            alert("Failed to send proposal");
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Send Proposal for {realJob.title || "Unknown Job"}</DialogTitle>
            <DialogContent>
                <Typography>Write a cover letter explaining why you are the best fit:</Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                />
                <Typography variant="body2" sx={{ mt: 2 }}>Attach File (optional):</Typography>
                <input type="file" onChange={handleFileUpload} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmitProposal} variant="contained" color="primary">
                    Submit Proposal
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TalentProfileSendFinalSubmitProposal;
