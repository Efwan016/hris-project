import React from "react";
import { useNavigate } from "react-router-dom";
import AttendanceChart from "../components/AttendanceChart";
import 'bootstrap/dist/css/bootstrap.min.css';


const Dashboard = () => {
    const navigate = useNavigate();
    const auth = JSON.parse(localStorage.getItem("auth"));

    const HandleLogout = () => {
        localStorage.removeItem("auth");
        navigate("/login")
    };

    return (
        <div style={{ padding: "2rem" }}>
            <div className="d-flex align-items-center mb-4">
                <h2 className="me-auto">Welcome, {auth?.user || "User"}</h2>
                <button onClick={HandleLogout} className="btn btn-danger">
                    Logout
                </button>
            </div>

            <div className="row">
                {/* Nanti bisa ditambahkan statistik di sini */}
                <div className="col-md-4">
                    <div className="card text-white bg-primary mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Total Employees</h5>
                            <p className="card-text">12</p> {/* ganti dengan dynamic nanti */}
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-success mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Today’s Attendance</h5>
                            <p className="card-text">8</p> {/* dummy data */}
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-warning mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Pending Leaves</h5>
                            <p className="card-text">3</p> {/* dummy data */}
                        </div>
                    </div>
                </div>
                {/* Grafik dari Chart.js */}
                <div className="mt-4">
                    <AttendanceChart />
                </div>
            </div>
        </div>
    );
};
export default Dashboard;