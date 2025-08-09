import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ onLinkClick }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("auth");
        navigate("/login");
    };

    const linkStyle = ({ isActive }) => ({
        display: "block",
        padding: "10px 15px",
        color: isActive ? "white" : "#ddd",
        backgroundColor: isActive ? "#0d6efd" : "transparent",
        textDecoration: "none",
    });

    return (
        <div
            style={{
                width: "200px",
                height: "100vh",
                backgroundColor: "#343a40",
                color: "#fff",
                position: "fixed",
                top: "60px",
                left: 0,
                paddingTop: "10px",
                zIndex: 999,
            }}
        >
            <NavLink to="/" style={linkStyle} onClick={onLinkClick}>Dashboard</NavLink>
            <NavLink to="/attendance" style={linkStyle} onClick={onLinkClick}>Attendance</NavLink>
            <NavLink to="/employees" style={linkStyle} onClick={onLinkClick}>👥 Employees</NavLink>
            <NavLink to="/leave-request" style={linkStyle}>📋 Leave Request</NavLink>
             <NavLink to="/payroll" style={linkStyle}>💰 Payroll</NavLink>

            <button
                onClick={() => {
                    handleLogout();
                    if (onLinkClick) onLinkClick();
                }}
                style={{
                    display: "block",
                    padding: "10px 15px",
                    color: "#fff",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    width: "100%",
                    cursor: "pointer",
                }}
            >
                Logout
            </button>
        </div>
    );
};

export default Sidebar;
