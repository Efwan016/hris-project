import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

const Header = ({ onToggleSidebar }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("auth");
        localStorage.removeItem("username");
        localStorage.removeItem("profileData");
        navigate("/login", { replace: true });
    };


    const [username, setUsername] = useState("User");
    const [pendingCount, setPendingCount] = useState(0);
    const [activeTodayCount, setActiveTodayCount] = useState(0);
    const [unpaidPayrollCount, setUnpaidPayrollCount] = useState(0);
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

        // Payroll notifications
        const payrolls = JSON.parse(localStorage.getItem("payrolls")) || [];
        const unpaidPayrolls = payrolls.filter(p => p.status === "Unpaid");
        setUnpaidPayrollCount(unpaidPayrolls.length);

        unpaidPayrolls.forEach(p => {
            notifList.push({ ...p, type: "Unpaid Payroll" });
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
                                <h5 className="modal-title">📌 Notifications</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                {notifications.length === 0 ? (
                                    <p>No active or pending notifications.</p>
                                ) : (
                                    <ul className="list-group">
                                        {notifications.map((notif, index) => (
                                            <li
                                                key={notif.id || index}
                                                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    setShowModal(false);
                                                    if (notif.type === "Unpaid Payroll") {
                                                        navigate("/payroll");
                                                    } else {
                                                        navigate("/leave-request");
                                                    }
                                                }}
                                            >
                                                <div>
                                                    <strong>
                                                        {notif.type === "Pending"
                                                            ? "🕒 Pending"
                                                            : notif.type === "Active"
                                                                ? "🟢 Active"
                                                                : "💸 Unpaid"}
                                                        :
                                                    </strong>{" "}
                                                    {notif.type === "Unpaid Payroll"
                                                        ? `Payroll for ${notif.name} (${notif.month})`
                                                        : `Leave from ${notif.startDate} to ${notif.endDate}`}
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
                    Dashboard
                </Link>
            </div>

            <div className="dropdown ms-auto me-3 d-flex align-items-center gap-2">
                <button
                    className="btn btn-sm btn-dark p-2"
                    type="button"
                    style={{ position: "relative" }}
                    onClick={() => setShowModal(true)}
                >
                    👤
                    {(pendingCount > 0 || activeTodayCount > 0 || unpaidPayrollCount > 0) && (
                        <span
                            className="badge bg-danger rounded-pill"
                            title="Click to view notifications"
                            style={{
                                position: "absolute",
                                top: "2px",
                                right: "-5px",
                                fontSize: "0.7rem",
                                transform: "translate(50%, -50%)",
                                cursor: "pointer",
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowModal(true);
                            }}
                        >
                            {pendingCount + activeTodayCount + unpaidPayrollCount}
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
