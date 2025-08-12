import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const ForgotPassword = () => {
    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleCheckUser = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = users.find((u) => u.user === username);

        if (userExists) {
            setStep(2);
        } else {
            alert("Username tidak ditemukan!");
        }
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.map((u) =>
            u.username === username ? { ...u, password: newPassword } : u
        );

        localStorage.setItem("users", JSON.stringify(updatedUsers));
        alert("Password berhasil direset. Silakan login kembali.");
        navigate("/login");
    };

    const loginBgStyle = {
        backgroundImage: "url('/img/bg-cyberpunk.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
    };

    return (
        <div
            style={loginBgStyle}
            className="bg-content d-flex flex-column min-vh-100"
        >
            {/* Konten */}
            <div className="flex-grow-1 d-flex align-items-center justify-content-center">
                <div className="auth-container">
                    <h2>Lupa Password</h2>

                    {step === 1 && (
                        <form onSubmit={handleCheckUser}>
                            <p className="text-gray-400">Masukkan Username</p>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="form-control mb-3"
                                required
                            />
                            <button type="submit" className="btn btn-primary w-100 mb-2">
                                Cari Akun
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleResetPassword}>
                            <p className="text-gray-400">Masukkan Password Baru</p>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="form-control mb-3"
                                required
                            />
                            <button type="submit" className="btn btn-success w-100 mb-2">
                                Simpan Password
                            </button>
                        </form>
                    )}

                    <button
                        type="button"
                        className="btn btn-secondary w-100"
                        onClick={() => navigate("/login")}
                    >
                        Kembali ke Login
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ForgotPassword;
