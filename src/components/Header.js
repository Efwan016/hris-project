import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

const Header = ({ onToggleSidebar }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("auth");
        localStorage.removeItem("username");
        navigate("/login");
    };

    const [username, setUsername] = useState("User");
    useEffect(() => {
        const updateUsername = () => {
            const storedProfile = JSON.parse(localStorage.getItem("profileData"));
            if (storedProfile && storedProfile.username) {
                setUsername(storedProfile.username);
            }
        };

        // Pertama kali load
        updateUsername();

        // Dengarkan perubahan dari halaman lain
        window.addEventListener("profileUpdated", updateUsername);

        // Cleanup event listener saat unmount
        return () => {
            window.removeEventListener("profileUpdated", updateUsername);
        };
    }, []);

    const [pendingCount, setPendingCount] = useState(0);
    const [activeTodayCount, setActiveTodayCount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [notifications, setNotifications] = useState([]);


    useEffect(() => {
        const updateUsername = () => {
            const storedProfile = JSON.parse(localStorage.getItem("profileData"));
            if (storedProfile && storedProfile.username) {
                setUsername(storedProfile.username);
            }
        };

        updateUsername();
        window.addEventListener("profileUpdated", updateUsername);

        const requests = JSON.parse(localStorage.getItem("leaveRequests")) || [];

        const pending = requests.filter(req => req.status === "Pending").length;
        const active = requests.filter(req => {
            const start = new Date(req.startDate);
            const end = new Date(req.endDate);
            const now = new Date();
            return req.status === "Approved" && start <= now && end >= now;
        }).length;

        setPendingCount(pending);
        setActiveTodayCount(active);

        const notifList = [];

        requests.forEach((req) => {
            const start = new Date(req.startDate);
            const end = new Date(req.endDate);
            const now = new Date();

            if (req.status === "Pending") {
                notifList.push({ ...req, type: "Pending" });
            } else if (req.status === "Approved" && start <= now && end >= now) {
                notifList.push({ ...req, type: "Active" });
            }
        });

        setNotifications(notifList);


        return () => {
            window.removeEventListener("profileUpdated", updateUsername);
        };
    }, []);



    return (
        <nav
            className="navbar navbar-dark bg-dark px-3"
            style={{ position: "fixed", width: "100%", top: 0, zIndex: 100 }}
        >
            {showModal && (
                <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">📌 Leave Notifications</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                {notifications.length === 0 ? (
                                    <p>No active or pending leaves.</p>
                                ) : (
                                    <ul className="list-group">
                                        {notifications.map((notif) => (
                                            <li
                                                key={notif.id}
                                                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    setShowModal(false);
                                                    navigate("/leave-request");
                                                }}
                                            >
                                                <div>
                                                    <strong>{notif.type === "Pending" ? "🕒 Pending" : "🟢 Active"}:</strong>{" "}
                                                    {notif.type} Leave from <strong>{notif.startDate}</strong> to <strong>{notif.endDate}</strong>
                                                </div>
                                                <span className="badge bg-secondary">{notif.type}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="d-flex align-items-center">
                <button
                    className="btn-toggle me-2"
                    onClick={onToggleSidebar}
                >
                    <FaBars />
                </button>

                <Link to="/" className="text-white text-decoration-none fw-bold">
                    {username}
                </Link>
            </div>

            <div className="dropdown ms-auto me-3 d-flex align-items-center gap-2">
                <button
                    className="btn btn-sm btn-dark p-2"
                    type="button"
                    style={{ position: "relative" }}
                    onClick={() => setShowModal(true)} // trigger modal langsung
                >
                    👤
                    {(pendingCount > 0 || activeTodayCount > 0) && (
                        <span
                            className="badge bg-danger rounded-pill"
                            title="Click to view leave notifications"
                            style={{
                                position: "absolute",
                                top: "2px",
                                right: "-5px",
                                fontSize: "0.7rem",
                                transform: "translate(50%, -50%)",
                                cursor: "pointer",
                            }}
                            onClick={(e) => {
                                e.stopPropagation(); // cegah toggle dropdown
                                setShowModal(true);  // buka modal
                            }}
                        >
                            {pendingCount + activeTodayCount}
                        </span>

                    )}
                </button>
                <button
                    className="btn-toggle me-2"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    {username}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                    <li>
                        <Link to="/profile" className="dropdown-item">Profile</Link>
                    </li>
                    <li>
                        <button className="dropdown-item" onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>

        </nav>
    );
};

export default Header;
