import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceChart from "../components/AttendanceChart";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/layout.css';
import LeaveChart from "../components/LeaveChart";


const Dashboard = () => {
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);
    const [username, setUsername] = useState("User");

    const toggleSidebar = () => {
        setShowSidebar((prev) => !prev);
    };

    useEffect(() => {
        const isAuth = localStorage.getItem("auth");
        if (!isAuth) {
            navigate("/login");
        }

        const storedProfile = JSON.parse(localStorage.getItem("profileData"));
        if (storedProfile?.username) {
            setUsername(storedProfile.username);
        }

        const handleProfileUpdate = () => {
            const updatedProfile = JSON.parse(localStorage.getItem("profileData"));
            if (updatedProfile?.username) {
                setUsername(updatedProfile.username);
            }
        };

        window.addEventListener("profileUpdated", handleProfileUpdate);
        return () => {
            window.removeEventListener("profileUpdated", handleProfileUpdate);
        };
    }, [navigate]);

    const [employeeCount, setEmployeeCount] = useState(0);
    const [leaveStats, setLeaveStats] = useState({
        pending: 0,
        approved: 0,
        rejected: 0,
        activeToday: 0,
    });

    useEffect(() => {
        const empData = JSON.parse(localStorage.getItem("employees")) || [];
        setEmployeeCount(empData.length);

        const leaveData = JSON.parse(localStorage.getItem("leaveRequests")) || [];

        const today = new Date();

        const stats = {
            pending: 0,
            approved: 0,
            rejected: 0,
            activeToday: 0,
        };

        leaveData.forEach((req) => {
            if (req.status === "Pending") stats.pending++;
            if (req.status === "Approved") stats.approved++;
            if (req.status === "Rejected") stats.rejected++;

            const start = new Date(req.startDate);
            const end = new Date(req.endDate);
            if (req.status === "Approved" && start <= today && end >= today) {
                stats.activeToday++;
            }
        });

        setLeaveStats(stats);
    }, []);


    return (
        <div>
            <Header onToggleSidebar={toggleSidebar} />
            {showSidebar && (
                <div
                    onClick={toggleSidebar}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.3)",
                        zIndex: 98,
                    }}
                />
            )}

            {showSidebar && (
                <Sidebar
                    style={{
                        position: "fixed",
                        top: 56,
                        left: 0,
                        width: "250px",
                        height: "100%",
                        backgroundColor: "#222",
                        color: "#fff",
                        zIndex: 99,
                        padding: "20px",
                    }}
                />
            )}

            {/* Main Content */}
            <div
                style={{
                    marginLeft: showSidebar ? "250px" : "0",
                    padding: "20px",
                    transition: "margin-left 0.3s",
                    marginTop: "56px",
                    height: "100vh",
                    overflowY: "auto",
                }}
            >
                <div className="container">
                    <h2>Hi!, Welcome 👤 {username}</h2>
                    <div className="row mt-4">
                        <div className="col-md-4">
                            <div className="card text-white bg-primary mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">Total Employees</h5>
                                    <p className="card-text">{employeeCount}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-white bg-info mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">Active Leave Today</h5>
                                    <p className="card-text">{leaveStats.activeToday}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-white bg-warning mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">Pending Leaves</h5>
                                    <p className="card-text">{leaveStats.pending}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-white bg-success mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">Approved Leaves</h5>
                                    <p className="card-text">{leaveStats.approved}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-white bg-danger mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">Rejected Leaves</h5>
                                    <p className="card-text">{leaveStats.rejected}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row mt-4">
                    <div className="col-md-6 mb-4">
                        <div className="p-2 shadow-sm rounded bg-white h-100">
                            <div className="attendance-container">
                            <AttendanceChart />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="p-2 shadow-sm rounded bg-white h-100">
                            <div className="leave-chart">
                            <LeaveChart
                                pending={leaveStats.pending}
                                approved={leaveStats.approved}
                                rejected={leaveStats.rejected}
                            />
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    );
};

export default Dashboard;
