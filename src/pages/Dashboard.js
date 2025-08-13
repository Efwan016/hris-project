import React, { useState, useEffect } from "react";
import AttendanceChart from "../components/AttendanceChart";
import 'bootstrap/dist/css/bootstrap.min.css';

const Card = ({ title, value, bgColor = "primary" }) => (
    <div className={`card text-white bg-${bgColor} mb-3`}>
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text fs-3">{value}</p>
        </div>
    </div>
);

const RecentActivities = ({ activities }) => (
    <div className="card mb-4">
        <div className="card-header">Recent Activities</div>
        <ul className="list-group list-group-flush">
            {activities.length === 0 ? (
                <li className="list-group-item">No recent activities.</li>
            ) : (
                activities.map((act, idx) => (
                    <li key={idx} className="list-group-item">
                        {act.type === "leave"
                            ? `${act.user} requested leave from ${act.startDate} to ${act.endDate} (${act.status})`
                            : act.type === "payroll"
                                ? `Payroll for ${act.user} (${act.month}) is ${act.status}`
                                : act.description
                        }
                    </li>
                ))
            )}
        </ul>
    </div>
);

const Dashboard = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const [username, setUsername] = useState("User");
    const [employees, setEmployees] = useState([]);
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [payrolls, setPayrolls] = useState([]);

    useEffect(() => {
        if (auth?.username) {
            setUsername(auth.username);
        } else {
            const profileData = JSON.parse(localStorage.getItem("profileData"));
            if (profileData?.username) {
                setUsername(profileData.username);
            }
        }

        setEmployees(JSON.parse(localStorage.getItem("employees")) || []);
        setLeaveRequests(JSON.parse(localStorage.getItem("leaveRequests")) || []);
        setPayrolls(JSON.parse(localStorage.getItem("payrolls")) || []);
    }, [auth?.username]); 


    // Statistik
    const totalEmployees = employees.length;
    const pendingLeaves = leaveRequests.filter(lr => lr.status === "Pending").length;
    const unpaidPayrolls = payrolls.filter(p => p.status === "Unpaid").length;
    const todayAttendance = employees.filter(e => e.isPresentToday).length;
    const recentActivities = [
        ...leaveRequests.map(lr => ({
            type: "leave",
            user: lr.user || lr.name || "Unknown",
            startDate: lr.startDate,
            endDate: lr.endDate,
            status: lr.status,
        })),
        ...payrolls.map(p => ({
            type: "payroll",
            user: p.user || p.name || "Unknown",
            month: p.month,
            status: p.status,
        })),
    ].slice(-5).reverse();

    return (
        <div style={{ padding: "2rem" }}>
            <div className="d-flex align-items-center mb-4">
                <h2 className="me-auto">Hi! Welcome, {auth?.username || { username }}</h2>
            </div>

            <div className="row">
                <div className="col-md-3">
                    <Card title="Total Employees" value={totalEmployees} bgColor="primary" />
                </div>
                <div className="col-md-3">
                    <Card title="Today's Attendance" value={todayAttendance} bgColor="success" />
                </div>
                <div className="col-md-3">
                    <Card title="Pending Leaves" value={pendingLeaves} bgColor="warning" />
                </div>
                <div className="col-md-3">
                    <Card title="Unpaid Payrolls" value={unpaidPayrolls} bgColor="danger" />
                </div>
            </div>

            <div className="mt-4">
                <AttendanceChart
                    employees={employees}
                    leaveRequests={leaveRequests}
                    payrolls={payrolls}
                />
            </div>

            <RecentActivities activities={recentActivities} />
        </div>
    );
};

export default Dashboard;
