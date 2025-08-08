import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const LeaveChart = ({ pending, approved, rejected }) => {
    const data = {
        labels: ["Pending", "Approved", "Rejected"],
        datasets: [
            {
                label: "Leave Requests",
                data: [pending, approved, rejected],
                backgroundColor: [
                    "rgba(255, 206, 86, 0.8)",
                    "rgba(75, 192, 192, 0.8)",
                    "rgba(255, 99, 132, 0.8)",
                ],
                borderWidth: 1,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                }

            },
        ],
    };

    return (
        <div className="mt-5">
            <h5 className="fw-semibold mb-3">📊 Leave Request Distribution</h5>
            <Pie data={data} />
        </div>
    );
};

export default LeaveChart;
