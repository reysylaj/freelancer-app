import { useState, useEffect } from "react";
import { Box, Typography, FormControl, MenuItem, Select } from "@mui/material";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // Import chart.js auto for default settings
import "../styles/ProfileAgencyEarningsDashboard.css";

const ProfileAgencyEarningsDashboard = () => {
    const [timeframe, setTimeframe] = useState("month");
    const [earningsData, setEarningsData] = useState([]);

    useEffect(() => {
        const storedEarnings = JSON.parse(localStorage.getItem("agencyEarnings")) || [];
        setEarningsData(storedEarnings);
    }, []);

    const handleTimeframeChange = (event) => {
        setTimeframe(event.target.value);
    };

    // Generate chart data dynamically based on timeframe
    const generateChartData = () => {
        let filteredData = earningsData;
        if (timeframe === "week") {
            filteredData = earningsData.slice(-7);
        } else if (timeframe === "month") {
            filteredData = earningsData.slice(-30);
        } else if (timeframe === "year") {
            filteredData = earningsData.slice(-365);
        }

        return {
            labels: filteredData.map((entry) => entry.date),
            datasets: [
                {
                    label: "Earnings ($)",
                    data: filteredData.map((entry) => entry.amount),
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                },
            ],
        };
    };

    return (
        <Box className="earnings-dashboard-container">
            <Typography variant="h5" className="dashboard-title">Earnings Dashboard</Typography>

            <FormControl className="timeframe-select">
                <Select value={timeframe} onChange={handleTimeframeChange}>
                    <MenuItem value="week">Last 7 Days</MenuItem>
                    <MenuItem value="month">Last 30 Days</MenuItem>
                    <MenuItem value="year">Last 365 Days</MenuItem>
                </Select>
            </FormControl>

            <Box className="chart-container">
                <Bar data={generateChartData()} />
            </Box>
        </Box>
    );
};

export default ProfileAgencyEarningsDashboard;
