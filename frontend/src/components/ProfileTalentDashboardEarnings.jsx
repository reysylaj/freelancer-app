import { useState, useEffect } from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "../styles/ProfileTalentDashboardEarnings.css";

const ProfileTalentDashboardEarnings = () => {
    const [selectedFilter, setSelectedFilter] = useState("monthly");
    const [earningsData, setEarningsData] = useState([]);

    // Dummy Earnings Data (Replace with API later)
    useEffect(() => {
        const sampleEarnings = {
            daily: [50, 120, 200, 80, 150, 300, 220],
            weekly: [700, 850, 900, 1100, 1200],
            monthly: [3500, 4000, 4500, 5000, 6000],
            yearly: [42000, 50000, 60000, 75000, 90000],
        };
        setEarningsData(sampleEarnings[selectedFilter]);
    }, [selectedFilter]);

    // Handle filter change
    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value);
        const sampleEarnings = {
            daily: [50, 120, 200, 80, 150, 300, 220],
            weekly: [700, 850, 900, 1100, 1200],
            monthly: [3500, 4000, 4500, 5000, 6000],
            yearly: [42000, 50000, 60000, 75000, 90000],
        };
        setEarningsData(sampleEarnings[event.target.value]);
    };

    // Chart Data
    const chartData = {
        labels: selectedFilter === "daily"
            ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
            : selectedFilter === "weekly"
                ? ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"]
                : selectedFilter === "monthly"
                    ? ["Jan", "Feb", "Mar", "Apr", "May"]
                    : ["2020", "2021", "2022", "2023", "2024"],
        datasets: [
            {
                label: "Earnings ($)",
                data: earningsData,
                borderColor: "red",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
                fill: true,
            },
        ],
    };

    return (
        <Box className="earnings-container">
            <Typography variant="h5" className="earnings-title">Earnings Dashboard</Typography>

            {/* Filter Dropdown */}
            <Box className="filter-dropdown">
                <Typography variant="body1">Filter by:</Typography>
                <Select value={selectedFilter} onChange={handleFilterChange}>
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="yearly">Yearly</MenuItem>
                </Select>
            </Box>

            {/* Earnings Chart */}
            <Box className="earnings-chart">
                <Line data={chartData} />
            </Box>

            {/* Total Earnings Display */}
            <Typography variant="h6" className="total-earnings">
                Total Earnings: ${earningsData.reduce((a, b) => a + b, 0)}
            </Typography>
        </Box>
    );
};

export default ProfileTalentDashboardEarnings;
