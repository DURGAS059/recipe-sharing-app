import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThumbsUp, Bookmark } from "lucide-react";
import "./style/RecipesPage.css"; 


export default function CategoriesRecipesPage() {
  const { name } = useParams(); // category name from URL
  const [recipes, setRecipes] = useState([]);
  const [likes, setLikes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const allRecipes = JSON.parse(localStorage.getItem("dynamicRecipes")) || [];
    const filtered = allRecipes.filter(
      (recipe) => recipe.category.toLowerCase() === name.toLowerCase()
    );
    setRecipes(filtered);

    const storedLikes = JSON.parse(localStorage.getItem("recipeLikes")) || {};
    setLikes(storedLikes);
  }, [name]);

  const handleLike = (recipeId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }

    setLikes((prev) => {
      const currentLikes = prev[recipeId] || [];
      const updatedLikes = currentLikes.includes(user.username)
        ? currentLikes.filter((u) => u !== user.username)
        : [...currentLikes, user.username];

      const newLikes = { ...prev, [recipeId]: updatedLikes };
      localStorage.setItem("recipeLikes", JSON.stringify(newLikes));
      return newLikes;
    });
  };

  const handleSaveRecipe = (recipe) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }

    let savedRecipes =
      JSON.parse(localStorage.getItem(`${user.username}_recipes`)) || [];

    if (!savedRecipes.find((r) => r.id === recipe.id)) {
      savedRecipes.push(recipe);
      localStorage.setItem(`${user.username}_recipes`, JSON.stringify(savedRecipes));
      alert("Recipe saved!");
    } else {
      alert("Already saved!");
    }
  };

  return (
    <div>
      <h1>{name.charAt(0).toUpperCase() + name.slice(1)} Recipes</h1>

      {recipes.length > 0 ? (
        <div className="recipes-grid">
          {recipes.map((recipe) => {
            const recipeLikes = likes[recipe.id] || [];
            const user = JSON.parse(localStorage.getItem("user"));
            const likedByUser = user ? recipeLikes.includes(user.username) : false;

            return (
              <div key={recipe.id} className="recipe-card">
                {recipe.image && <img src={recipe.image} alt={recipe.name} />}
                <h2>{recipe.name}</h2>

                <div className="recipe-buttons">
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                  >
                    View Making
                  </button>

                  <div className="like-save-buttons">
                    <button
                      className={`like-btn ${likedByUser ? "liked" : ""}`}
                      onClick={() => handleLike(recipe.id)}
                    >
                      <ThumbsUp size={18} /> {recipeLikes.length}
                    </button>

                    <button
                      className="save-btn"
                      onClick={() => handleSaveRecipe(recipe)}
                    >
                      <Bookmark size={18} /> Save
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No recipes in this category yet.</p>
      )}
    </div>
  );
}
