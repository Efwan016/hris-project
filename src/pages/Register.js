import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();

        const newUser = {
            user: username,
            password: password,
        };

        // Ambil data user yang sudah ada
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

        // Cek apakah username sudah dipakai
        const usernameExists = storedUsers.some((u) => u.user === username);
        if (usernameExists) {
            alert("Username sudah digunakan.");
            return;
        }

        // Tambah user baru
        const updatedUsers = [...storedUsers, newUser];

        // Simpan ke localStorage
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        // 🔹 Tambahan: otomatis masuk ke employee list
        const employees = JSON.parse(localStorage.getItem("employees")) || [];

        const newEmployee = {
            id: Date.now(), // ID unik
            name: username,
            email: "", // Email bisa diisi nanti di Profile
            position: "", // Posisi default
            salary: 0, // Gaji default
            photo: `https://api.dicebear.com/6.x/adventurer/svg?seed=${username}`, // Avatar default
        };

        // Simpan ke employees
        employees.push(newEmployee);
        localStorage.setItem("employees", JSON.stringify(employees));
        alert("Registrasi berhasil. Silakan login.");
        navigate("/login");
    };



    const registerBgStyle = {
        backgroundImage: "url('/img/bg-cyberpunk.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
    };

    return (
        <div style={registerBgStyle}>
            <div className="auth-container" style={{ maxWidth: "400px", margin: "100px auto", position: "relative" }}>
                <h2>Register</h2>
                <form className="auth-form" onSubmit={handleRegister}>
                    <p className="text-gray-400">Username</p>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control mb-3"
                        required
                    />
                    <p className="text-gray-400">Password</p>
                    <div style={{ position: "relative" }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
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

                    <button type="submit" className="btn btn-primary w-100 my-3">
                        Register
                    </button>

                    <button className="btn btn-secondary w-100" onClick={() => navigate("/login")}>
                        Kembali ke Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
