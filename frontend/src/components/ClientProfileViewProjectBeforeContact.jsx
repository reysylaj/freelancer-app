import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import CloseIcon from "@mui/icons-material/Close";

const ClientProfileViewProjectBeforeContact = ({ project, open, onClose }) => {
    const navigate = useNavigate(); // ✅ Initialize navigation

    if (!project) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">{project.title}</Typography>
                    <Button onClick={onClose}><CloseIcon /></Button>
                </Box>
            </DialogTitle>

            <DialogContent>
                <Typography variant="body1"><strong>Description:</strong> {project.description || "No description provided"}</Typography>
                <Typography variant="body2"><strong>Role:</strong> {project.role}</Typography>

                {/* 🛠️ Tools Used */}
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: 1 }}>
                    {project.tools?.length > 0 ? (
                        project.tools.map((tool) => <Chip key={tool} label={tool} />)
                    ) : (
                        <Typography>No tools specified</Typography>
                    )}
                </Box>

                {/* 🔗 Project Links */}
                {project.links?.length > 0 && (
                    <>
                        <Typography variant="body2" sx={{ marginTop: 2 }}><strong>Project Links:</strong></Typography>
                        {project.links.map((link, index) => (
                            <Typography key={index} component="a" href={link} target="_blank" rel="noopener noreferrer" sx={{ display: "block", color: "blue" }}>
                                {link}
                            </Typography>
                        ))}
                    </>
                )}

                {/* 📸 Media Preview */}
                {project.media && (
                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="body2"><strong>Attached Media:</strong></Typography>
                        <img src={project.media} alt="Project" width="100%" />
                    </Box>
                )}
            </DialogContent>

            <DialogActions>
                {/* 🔹 Talent Profile Button - Redirect to /talent-profile/{talentId} */}
                <Button variant="contained" color="primary" onClick={() => navigate(`/view-talent-profile/${project.talentId}`)}>
                    View Talent Profile
                </Button>

                {/* ❌ Close Button */}
                <Button variant="outlined" color="secondary" onClick={onClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ClientProfileViewProjectBeforeContact;
