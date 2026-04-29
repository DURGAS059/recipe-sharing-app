// import React from "react";
import { Link } from "react-router-dom";


export default function Dashboard({ username }) {
  return (
    
    <div className="dashboard-container">
      
      <section className="hero">
        <h1>Welcome back Durga{username}!</h1>
        <p>Access your recipes</p>
      </section>

      <section className="dashboard-options center">
        <div className="option-card">
          <h2>Search Recipes</h2>
          <p>Explore thousands of recipes and discover your next favorite dish.</p>
          <Link to="/recipes">
            <button className="cta-btn">Search Recipes</button>
          </Link>
        </div>

        <div className="option-card">
          <h2>My Recipes</h2>
          <p>View and manage your personal recipe collection.</p>
          <Link to="/myrecipes">
            <button className="cta-btn">View My Recipes</button>
          </Link>
        </div>

        <div className="option-card">
          <h2>Add Recipe</h2>
          <p>Share your own creations with the RecipeShare community.</p>
          <Link to="/add-recipe">
            <button className="cta-btn">Add Recipe</button>
          </Link>
        </div>
      </section>
      
    </div>
  );
}
