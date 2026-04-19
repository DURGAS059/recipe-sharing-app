import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/MyRecipes.css";

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadSavedRecipes();
  }, []);

  // ✅ Load recipes from localStorage
  const loadSavedRecipes = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const saved = JSON.parse(localStorage.getItem(`${user.username}_recipes`)) || [];
      setRecipes(saved);
    }
  };

  // ✅ Delete recipe
  const handleDelete = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    let saved = JSON.parse(localStorage.getItem(`${user.username}_recipes`)) || [];
    saved = saved.filter((recipe) => recipe.id !== id); // remove that recipe
    localStorage.setItem(`${user.username}_recipes`, JSON.stringify(saved));
    setRecipes(saved); // update UI
  };

  return (
    <div className="my-recipes">
      <h2>My Saved Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes saved yet.</p>
      ) : (
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.name} />
              <h2>{recipe.name}</h2>

              <div className="recipe-buttons">
                
                <button
                  className="view-btn"
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                >
                  View Making
                </button>

                
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(recipe.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
