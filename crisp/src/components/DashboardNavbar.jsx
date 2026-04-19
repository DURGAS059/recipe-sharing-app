
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style/LandingPage.css"; 

export default function DashboardNavbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username) {
      setUsername(user.username);
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        {/* <img src="#" alt=".." className="logo-img" /> */}
        <span className="logo-text">Crisp</span>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/recipes">Recipes</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/about">About</Link>

        {username ? (
          <div className="profile-dropdown">
            <button className="profile-btn" onClick={() => navigate("/profile")}>
              👤
            </button>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
