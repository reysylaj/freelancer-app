import {
    useState,
    useEffect
}

    from "react";

import {
    Box,
    Typography,
    Button
}

    from "@mui/material";

import {
    Bar
}

    from "react-chartjs-2";
import "chart.js/auto";
import "../styles/ProfileClientEarningsDashboard.css";

const ProfileClientEarningsDashboard = () => {
    const [filter,
        setFilter] = useState("monthly");
    const [chartData,
        setChartData] = useState(null);

    useEffect(() => {
        const fetchEarnings = () => {
            const savedEarnings = JSON.parse(localStorage.getItem("clientEarnings")) || {}

                ;
            setChartData(savedEarnings[filter] || generateDummyData());
        }

            ;
        fetchEarnings();
    }

        , [filter]);

    const generateDummyData = () => {
        return {

            labels: ["Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun"],
            datasets: [{
                label: "Total Spending ($)",
                data: [500, 800, 1200, 900, 1400, 1100],
                backgroundColor: "#00c4ff",
                borderRadius: 5,
            }

                ,
            ],
        }

            ;
    }

        ;

    return (<Box className="earnings-dashboard-container" > <Typography variant="h5" className="dashboard-title" >Earnings Dashboard</Typography> <Box className="filter-buttons" > <Button onClick={
        () => setFilter("weekly")
    }

        className={
            filter === "weekly" ? "active" : ""
        }

    >Weekly</Button> <Button onClick={
        () => setFilter("monthly")
    }

        className={
            filter === "monthly" ? "active" : ""
        }

    >Monthly</Button> <Button onClick={
        () => setFilter("yearly")
    }

        className={
            filter === "yearly" ? "active" : ""
        }

    >Yearly</Button> </Box> {
            chartData && (<Box className="chart-container" > <Bar data={
                chartData
            }

                options={
                    {
                        responsive: true
                    }
                }

            /> </Box>)
        }

    </Box>);
}

    ;

export default ProfileClientEarningsDashboard;