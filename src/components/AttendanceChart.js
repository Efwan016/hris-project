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

    const allRecords = rawData.flatMap(user => user.records || []);

    const attendanceData = allRecords
        .filter(record => record.date && record.checkIn && record.checkOut)
        .map(record => {
            const date = record.date.split("-").slice(1).join("/");
            const [inHour, inMin] = record.checkIn.split(":").map(Number);
            const [outHour, outMin] = record.checkOut.split(":").map(Number);
            const hours = (outHour + outMin / 60) - (inHour + inMin / 60);
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
        <div className="card p-3" style={{ height: "300px" }}>
            <h6 className="text-center mb-3">Weekly Attendance Overview</h6>
            <div style={{ height: "100%" }}>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default AttendanceChart;
