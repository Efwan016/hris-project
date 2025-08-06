import React from "react";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AttendanceChart = () => {
    const rawData = JSON.parse(localStorage.getItem("attendanceData")) || [];

    const attendanceData = rawData.map((entry) => {
        const date = entry.date.split("-").slice(1).join("/"); // e.g., "08/05"
        let hours = 0;

        if (entry.checkIn && entry.checkOut) {
            const [inHour, inMin] = entry.checkIn.split(":").map(Number);
            const [outHour, outMin] = entry.checkOut.split(":").map(Number);
            hours = (outHour + outMin / 60) - (inHour + inMin / 60);
        }

        return { label: date, hours: +hours.toFixed(2) };
    });

    const data = {
        labels: attendanceData.map((e) => e.label),
        datasets: [
            {
                label: "Work Hours",
                data: attendanceData.map((e) => e.hours),
                backgroundColor: "#0d6efd",
                borderRadius: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx) => `${ctx.raw} hours`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 1 },
                title: { display: true, text: "Hours Worked" }
            },
        },
    };

    return (
        <div className="chart-section">
            <h5 style={{ marginBottom: "1rem" }}>Weekly Attendance Overview</h5>
            <Bar data={data} options={options} />
        </div>
    );
};

export default AttendanceChart;
