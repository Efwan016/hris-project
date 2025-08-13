import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Footer from "../components/Footer";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
  const scrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';

  return () => {
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, scrollY);
  };
}, []);


  const handleLogin = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = storedUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      const authData = {
        isLoggedIn: true,
        username: foundUser.username,
        email: foundUser.email || "",
        role: foundUser.role,
        position: foundUser.position,
        salary: foundUser.salary,
        photo: foundUser.photo,
        token: "dummy-token-123",
        loginTime: Date.now(),
      };
      localStorage.setItem("auth", JSON.stringify(authData));
      navigate("/");
    } else {
      alert("Username atau password salah.");
    }
  };

  const loginBgStyle = {
    backgroundImage: "url('/img/bg-cyberpunk.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    overflow: "hidden"
  };

  return (
    <div
      style={loginBgStyle}
            className="bg-content d-flex flex-column min-vh-100"
    >
      {/* Konten login */}
      <div
        style={{ flex: 1 }}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="auth-container">
          <h2>Login</h2>
          <form className="auth-form" onSubmit={handleLogin}>
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

          <button
            className="btn btn-secondary w-100"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
          <button
            className="btn btn-link w-100"
            onClick={() => navigate("/forgot-password")}
          >
            Lupa Password?
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;