import React from "react";
import { Link } from "react-router-dom";

import "./style/LandingPage.css"; // Optional: separate CSS for navbar

export default function Navbar() {
  return (
    
    
          <nav className="navbar">
            <div className="logo">
              <img src="/images/image.png" alt="Crisp Logo" className="logo-img" />
              <span className="logo-text">Crisp</span>
            </div>
    
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/recipes">Recipes</Link>
              <Link to="/categories">Categories</Link>
              <Link to="/about">About</Link>
              <Link to="/login">Login</Link>
              
            </div>
          </nav>
  );
}
