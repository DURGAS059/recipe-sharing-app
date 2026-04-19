import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./style/Auth.css";

export default function RegisterPage({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  // Background password validation
  const validatePassword = (pwd) => {
    return (
      pwd.length >= 8 &&
      /[A-Z]/.test(pwd) &&
      /[a-z]/.test(pwd) &&
      /[0-9]/.test(pwd) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate password in background
    if (!validatePassword(password)) {
      setErrorMsg(
        "Password must contain: 1 uppercase, 1 lowercase, 1 digit, 1 special character, and be at least 8 characters long."
      );
      return;
    }

    setErrorMsg(""); // Clear error

    try {
      const res = await axios.post("http://localhost:5000/register", {
        username,
        password,
      });

      // Save to local storage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify({ username }));
      localStorage.setItem("isNewUser", "true");

      setIsLoggedIn(true);
      alert("Registered successfully!");

      
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-card">
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Single error message */}
        {errorMsg && <p className="error-text">{errorMsg}</p>}

        <button type="submit">Register</button>
      </form>

      <p className="auth-footer">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
