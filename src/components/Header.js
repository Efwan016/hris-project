import React, { useState, useEffect, useRef } from "react";
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
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const updateBadgeCounts = (notifList) => {
        setPendingCount(notifList.filter(n => n.type === "Pending" && !n.read).length);
        setActiveTodayCount(notifList.filter(n => n.type === "Active" && !n.read).length);
        setUnpaidPayrollCount(notifList.filter(n => n.type === "Unpaid Payroll" && !n.read).length);
    };

    useEffect(() => {
        const updateUsername = () => {
            const storedProfile = JSON.parse(localStorage.getItem("profileData"));
            if (storedProfile?.username && typeof storedProfile.username === "string") {
                setUsername(storedProfile.username);
            } else {
                setUsername("User");
            }
        };

        updateUsername();
        window.addEventListener("profileUpdated", updateUsername);

        const storedProfile = JSON.parse(localStorage.getItem("profileData")) || {};
        const currentUsername = storedProfile.username || "";
        const currentRole = storedProfile.role || "user";

        let existingNotifs = JSON.parse(localStorage.getItem("notifications")) || [];
        
        const requests = JSON.parse(localStorage.getItem("leaveRequests")) || [];
        const newLeaveNotifs = requests
            .filter(req =>
                req.status === "Pending" ||
                (req.status === "Approved" &&
                    new Date(req.startDate) <= new Date() &&
                    new Date(req.endDate) >= new Date())
            )
            .map(req => {
                const existing = existingNotifs.find(n => n.id === `leave-${req.id}`);
                return {
                    id: `leave-${req.id}`,
                    message: req.status === "Pending"
                        ? `Leave request from ${req.name} is pending`
                        : `Active leave for ${req.name}`,
                    type: req.status === "Pending" ? "Pending" : "Active",
                    read: existing ? existing.read : false,
                    name: req.name,
                    startDate: req.startDate,
                    endDate: req.endDate
                };
            });

        const payrolls = JSON.parse(localStorage.getItem("payrolls")) || [];
        const newPayrollNotifs = payrolls
            .filter(p => p.status === "Unpaid" && (currentRole === "admin" || p.name === currentUsername))
            .map(p => {
                const existing = existingNotifs.find(n => n.id === `payroll-${p.id}`);
                return {
                    id: `payroll-${p.id}`,
                    message: `Unpaid payroll for ${p.name}`,
                    type: "Unpaid Payroll",
                    read: existing ? existing.read : false,
                    name: p.name,
                    month: p.month
                };
            });

        const mergedNotifs = [...newLeaveNotifs, ...newPayrollNotifs];
        setNotifications(mergedNotifs);
        updateBadgeCounts(mergedNotifs);
        localStorage.setItem("notifications", JSON.stringify(mergedNotifs));

        return () => {
            window.removeEventListener("profileUpdated", updateUsername);
        };
    }, []);

    const handleNotificationClick = (notifIndex, notif) => {
        const updatedNotifs = [...notifications];
        updatedNotifs[notifIndex].read = true;
        setNotifications(updatedNotifs);
        updateBadgeCounts(updatedNotifs);
        localStorage.setItem("notifications", JSON.stringify(updatedNotifs));

        if (notif.type === "Unpaid Payroll") {
            navigate("/payroll");
        } else {
            navigate("/leave-request");
        }
    };

    return (
        <nav className="navbar navbar-dark bg-dark px-3" style={{ position: "fixed", width: "100%", top: 0, zIndex: 100 }}>
            {showModal && (
                <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">📌 Notifications</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                {notifications.filter(n => !n.read).length === 0 ? (
                                    <p>No active or pending notifications.</p>
                                ) : (
                                    <ul className="list-group">
                                        {notifications.map((notif, index) => (
                                            <li
                                                key={notif.id || index}
                                                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${notif.read ? "bg-light text-muted" : "bg-white fw-bold"}`}
                                                style={{ cursor: "pointer" }}
                                                onClick={() => handleNotificationClick(index, notif)}
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
                                                    {notif.read && <span className="ms-2 text-success">✔</span>}
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
                <button className="btn-toggle me-2" onClick={onToggleSidebar}>
                    <FaBars />
                </button>
                <Link to="/" className="text-white text-decoration-none fw-bold">
                    Dashboard
                </Link>
            </div>

            <div className="ms-auto me-3 d-flex align-items-center gap-2 position-relative" ref={dropdownRef}>
                <button className="btn btn-sm btn-dark p-2 position-relative" type="button" onClick={() => setShowModal(true)}>
                    👤
                    {(pendingCount + activeTodayCount + unpaidPayrollCount) > 0 && (
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
                        >
                            {pendingCount + activeTodayCount + unpaidPayrollCount}
                        </span>
                    )}
                </button>

                <button
                    className="btn-toggle me-2 btn btn-sm btn-dark p-2"
                    type="button"
                    onClick={() => setDropdownOpen(prev => !prev)}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                >
                    {typeof username === "string" ? username : "User"}
                </button>

                {dropdownOpen && (
                    <ul
                        className="dropdown-menu dropdown-menu-end show custom-dropdown"
                        style={{ position: "absolute", top: "100%", right: 0 }}
                    >
                        <li>
                            <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/login"
                                className="dropdown-item"
                                onClick={() => {
                                    setDropdownOpen(false);
                                    handleLogout();
                                }}
                                style={{
                                    textDecoration: "none",
                                    width: "100%",
                                    display: "block",
                                    padding: "0.5rem 1rem"
                                }}
                            >
                                Logout
                            </Link>

                        </li>
                    </ul>
                )}

            </div>
        </nav>
    );
};

export default Header;
