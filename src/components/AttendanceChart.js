import React from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AttendanceChart = () => {
    const data = {
        labels: ["Mon", "Tue", "wed", "Thu", "Fri"],
        datasets: [
            {
                label: "Daily Check",
                data: [8, 6, 10, 7, 9],
                backgroundColor: "#007bff",
                borderRadius: 5,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0,
                },
            },
        },
    };

    return (
        <div style={{ width: "100%", maxWidth: "600px", marginTop:"2rem" }}>
            <h5>Weekly Attendance</h5>
            <Bar data={data} options={options} />
        </div>
    );
};

export default AttendanceChart;