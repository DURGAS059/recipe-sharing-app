import React from "react";
import { Link } from "react-router-dom";
import "./style/LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-page">
      
    

      <section className="hero">
        <h1>Share & Discover Amazing Recipes</h1>
        <p>
          Explore delicious recipes from around the world. Share your own
          cooking secrets and connect with food lovers!
        </p>
        <Link to="/register">
          <button className="cta-btn">Get Started</button>
        </Link>
      </section>
    </div>
  );
}
