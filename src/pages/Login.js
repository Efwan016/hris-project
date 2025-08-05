import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // Ambil daftar user dari localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Cek apakah ada user yang cocok
    const foundUser = storedUsers.find(
      (user) => user.user === email && user.password === password
    );

    if (foundUser) {
      localStorage.setItem("auth", JSON.stringify({ isLoggedIn: true, user: email }));
      navigate("/");
    } else {
      alert("Email atau password salah.");
    }
  };

  const loginBgStyle = {
    backgroundImage: "url('/img/bg-cyberpunk.jpeg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  };

  return (
    <div style={loginBgStyle}>
      <div className="auth-container" style={{ maxWidth: "400px", margin: "100px auto" }}>
        <h2>Login</h2>
        <form className="auth-form" onSubmit={handleLogin}>
          <p className="text-gray-400">Username</p>
          <input
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mb-3"
            required
          />
          <p className="text-gray-400">Password</p>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
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
            Login
          </button>
        </form>

        <button className="btn btn-secondary w-100 my-3" disabled>
          Login Via Google (Nonaktif)
        </button>

        <button className="btn btn-secondary w-100" onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
