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
import { createProposal } from "../services/proposalService"; // ✅ Use backend

const TalentProfileSendFinalSubmitProposal = ({ job, open, onClose }) => {
    const [coverLetter, setCoverLetter] = useState("");
    const [file, setFile] = useState(null);

    if (!job) return null;

    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const clientId = job.clientId;

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmitProposal = async () => {
        if (!coverLetter.trim()) return;

        const newProposal = {
            jobId: job.id,
            jobTitle: job.title,
            clientId: job.clientId,
            clientName: job.user || "Unknown Client",
            talentId: storedUser.id,
            talentName: storedUser.name,
            talentProfilePic: storedUser.profilePicture || "/default-avatar.png",
            message: coverLetter,
            status: "Pending",
        };

        try {
            await createProposal(newProposal);
            alert("✅ Proposal submitted successfully!");
            setCoverLetter("");
            setFile(null);
            onClose();
        } catch (err) {
            console.error("❌ Failed to send proposal:", err);
            alert("Failed to send proposal");
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Send Proposal for {job?.title || "Unknown Job"}</DialogTitle>
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
