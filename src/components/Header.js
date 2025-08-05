import React from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

const Header = ({ onToggleSidebar }) => {
    const navigate = useNavigate();
    const username = localStorage.getItem("username") || "User";

    const handleLogout = () => {
        localStorage.removeItem("auth");
        localStorage.removeItem("username");
        navigate("/login");
    };

    return (
        <nav
            className="navbar navbar-dark bg-dark px-3"
            style={{ position: "fixed", width: "100%", top: 0, zIndex: 100 }}
        >
            <div className="d-flex align-items-center">
                <button
                     className="btn-toggle me-2"
                    onClick={onToggleSidebar}
                >
                    <FaBars />
                </button>

                {/* 👇 Link ke Dashboard dengan nama user */}
                <Link to="/" className="text-white text-decoration-none fw-bold">
                    {username}
                </Link>
            </div>

            {/* 👇 Dropdown di kanan */}
            <div className="dropdown ms-auto me-3">
                <button
                     className="btn-toggle me-2"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    👤 {username}
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
