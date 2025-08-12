import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Footer from "../components/Footer";
import "../css/layout.css";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [position, setPosition] = useState("");
    const [salary, setSalary] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // Disable scroll di body biar background fixed
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleRegister = (e) => {
        e.preventDefault();

        const newUser = {
            username,
            password,
            role,
            position,
            salary,
            photo: `https://api.dicebear.com/6.x/adventurer/svg?seed=${username}`,
        };

        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const usernameExists = storedUsers.some((u) => u.username === username);

        if (usernameExists) {
            alert("Username sudah digunakan.");
            return;
        }

        localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));

        const employees = JSON.parse(localStorage.getItem("employees")) || [];
        const newEmployee = {
            id: Date.now(),
            name: username,
            email: "",
            position,
            salary: Number(salary) || 0,
            photo: `https://api.dicebear.com/6.x/adventurer/svg?seed=${username}`,
        };

        employees.push(newEmployee);
        localStorage.setItem("employees", JSON.stringify(employees));

        alert("Registrasi berhasil. Silakan login.");
        navigate("/login");
    };

    const registerBgStyle = {
        backgroundImage: "url('/img/bg-cyberpunk.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
    };

    return (
        <div style={registerBgStyle} className="d-flex flex-column min-vh-100">
            {/* Konten utama */}
            <main
                className="d-flex justify-content-center align-items-center flex-grow-1 p-3"
                style={{ minHeight: 0, overflowY: "auto" }}
            >
                <div
                    className="auth-container"
                    style={{
                        height: "100vh",
                        width: "100vw",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden", 
                        padding: "20px",
                        boxSizing: "border-box",
                    }}
                >
                    <h2 className="mb-3 text-center">Register</h2>
                    <form className="auth-form" onSubmit={handleRegister}>
                        <div style={{ display: "flex", gap: "1rem", marginBottom: "0.5rem" }}>
                            <div style={{ flex: 1 }}>
                                <p className="text-gray-400 mb-1">Username</p>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div style={{ flex: 1, position: "relative" }}>
                                <p className="text-gray-400 mb-1">Password</p>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control"
                                    required
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: "absolute",
                                        right: "10px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer",
                                        color: "#888",
                                    }}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>

                        <p className="text-gray-400 mb-1">Role</p>
                        <select
                            className="form-control mb-3"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>

                        <div style={{ display: "flex", gap: "1rem" }}>
                            <div style={{ flex: 1 }}>
                                <p className="text-gray-400 mb-1">Position</p>
                                <input
                                    type="text"
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <p className="text-gray-400 mb-1">Salary</p>
                                <input
                                    type="number"
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary w-100 my-3">
                            Register
                        </button>
                        <button
                            type="button"
                            className="btn btn-link w-100"
                            onClick={() => navigate("/forgot-password")}
                        >
                            Lupa Password?
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary w-100"
                            onClick={() => navigate("/login")}
                        >
                            Kembali ke Login
                        </button>
                    </form>
                </div>
            </main>

            {/* Footer dengan flex-shrink 0 agar tidak mengecil */}
            <Footer style={{ flexShrink: 0 }} />
        </div>
    );
};

export default Register;
