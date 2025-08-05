import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceChart from "../components/AttendanceChart";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        const isAuth = localStorage.getItem("auth");
        if (!isAuth) {
            navigate("/login");
        }
    }, [navigate]);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <div>
            <Header onToggleSidebar={toggleSidebar} />

            {/* Overlay */}
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

            {/* Sidebar */}
            {showSidebar && (
                <Sidebar
                    style={{
                        position: "fixed",
                        top: 56, // tinggi navbar
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
                    marginTop: "56px", // karena navbar fixed
                    height: "100vh",
                    overflowY: "auto",  // ✅ supaya bisa scroll
                }}
            >
                <div className="container">
                    <h2>Hi!, Welcome</h2>
                    <div className="row mt-4">
                        <div className="col-md-4">
                            <div className="card text-white bg-primary mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">Total Employees</h5>
                                    <p className="card-text">12</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card text-white bg-success mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">Today’s Attendance</h5>
                                    <p className="card-text">8</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card text-white bg-warning mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">Pending Leaves</h5>
                                    <p className="card-text">3</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <AttendanceChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
