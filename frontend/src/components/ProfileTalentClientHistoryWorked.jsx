import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Avatar, Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import WorkIcon from "@mui/icons-material/Work";
import PaymentIcon from "@mui/icons-material/AttachMoney";
import "../styles/ProfileTalentClientHistoryWorked.css";

const ProfileTalentClientHistoryWorked = () => {
    const [clients, setClients] = useState(JSON.parse(localStorage.getItem("clientHistory")) || []);

    // Dummy Data (if no clients exist)
    useEffect(() => {
        if (clients.length === 0) {
            const dummyClients = [
                { id: 1, name: "John Doe", position: "Project Manager", paymentStatus: "Completed", rating: 5, photo: "https://randomuser.me/api/portraits/men/32.jpg", ongoing: false },
                { id: 2, name: "Jane Smith", position: "CEO", paymentStatus: "Ongoing", rating: 4, photo: "https://randomuser.me/api/portraits/women/44.jpg", ongoing: true },
                { id: 3, name: "Michael Johnson", position: "Marketing Director", paymentStatus: "Completed", rating: 5, photo: "https://randomuser.me/api/portraits/men/56.jpg", ongoing: false },
            ];
            setClients(dummyClients);
            localStorage.setItem("clientHistory", JSON.stringify(dummyClients));
        }
    }, []);

    return (
        <Box className="client-history-container">
            <Typography variant="h5" className="section-title">Client History</Typography>
            <Typography variant="body1" className="section-subtitle">Total Clients Worked With: {clients.length}</Typography>

            <Box className="clients-list">
                {clients.map((client) => (
                    <Card key={client.id} className={`client-card ${client.ongoing ? "ongoing" : ""}`}>
                        <CardContent>
                            <Avatar src={client.photo} className="client-avatar" />
                            <Typography variant="h6" className="client-name">{client.name}</Typography>
                            <Typography variant="body2" className="client-position">
                                <WorkIcon className="icon" /> {client.position}
                            </Typography>
                            <Typography variant="body2" className="client-payment">
                                <PaymentIcon className="icon" /> {client.paymentStatus}
                            </Typography>
                            <Box className="client-rating">
                                {[...Array(client.rating)].map((_, i) => (
                                    <StarIcon key={i} className="star-icon" />
                                ))}
                            </Box>
                            {client.ongoing && <Button className="ongoing-button">Ongoing Work</Button>}
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default ProfileTalentClientHistoryWorked;
