import React from "react";
import { useParams } from "react-router-dom";
import "./style/Recipes.css"; // Create CSS for styling

// Sample recipes data
const allRecipes = {
  tea: [
    { id: 1, name: "Masala Tea", description: "Spiced Indian tea", image: "./images/masala-tea.avif" },
    { id: 2, name: "Green Tea", description: "Healthy green tea", image: "./images/green-tea.avif" },
  ],
  coffee: [
    { id: 1, name: "Espresso", description: "Strong and bold coffee", image: "./images/espresso.avif" },
    { id: 2, name: "Cappuccino", description: "Creamy coffee with milk foam", image: "./images/cappuccino.avif" },
  ],
  breakfast: [
    { id: 1, name: "Pancakes", description: "Fluffy pancakes with syrup", image: "./images/pancakes.avif" },
  ],
  // Add similar arrays for other categories
};

export default function Recipe() {
  const { categoryName } = useParams(); // Get category from URL
  const recipes = allRecipes[categoryName] || []; // Get recipes for category

  return (
    <div className="recipe-page">
      <h1>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Recipes</h1>
      <div className="recipe-grid">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.name} />
              <h2>{recipe.name}</h2>
              <p>{recipe.description}</p>
            </div>
          ))
        ) : (
          <p>No recipes available for this category.</p>
        )}
      </div>
    </div>
  );
}
