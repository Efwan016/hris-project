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
        document.body.style.overflow = "hidden"; // disable scroll
        return () => {
            document.body.style.overflow = "auto"; // enable scroll on unmount
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
    };

    return (
        <div
            style={{ ...registerBgStyle, height: "100vh" }}
            className="d-flex flex-column bg-content"
        >
            <main
                className="flex-grow-1 d-flex justify-content-center align-items-center p-3"
                style={{ overflowY: "auto" }}
            >
                <div
                    className="auth-container rounded shadow p-4"
                    style={{ maxWidth: 480, width: "100%" }}           >
                    <h2 className="mb-4 text-center">Register</h2>
                    <form onSubmit={handleRegister}>
                        <div className="d-flex gap-3 mb-3">
                            <div className="flex-grow-1">
                                <label className="form-label text-secondary">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="flex-grow-1 position-relative">
                                <label className="form-label text-secondary">Password</label>
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
                                        right: 12,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer",
                                        color: "#888",
                                        userSelect: "none",
                                    }}
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>

                        <label className="form-label text-secondary mb-1">Role</label>
                        <select
                            className="form-control mb-3"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>

                        <div className="d-flex gap-3 mb-3">
                            <div className="flex-grow-1">
                                <label className="form-label text-secondary">Position</label>
                                <input
                                    type="text"
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div className="flex-grow-1">
                                <label className="form-label text-secondary">Salary</label>
                                <input
                                    type="number"
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                    className="form-control"
                                    min={0}
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary w-100 mb-3">
                            Register
                        </button>

                        <button
                            type="button"
                            className="btn btn-link w-100 mb-2"
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

            <Footer />
        </div>
    );
};

export default Register;
