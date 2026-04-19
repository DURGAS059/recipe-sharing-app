import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThumbsUp, Bookmark, Trash2 } from "lucide-react";
import "./style/RecipesPage.css";

const RecipesPage = () => {
  const [search, setSearch] = useState("");
  const [dynamicRecipes, setDynamicRecipes] = useState([]);
  const navigate = useNavigate();

  const staticRecipes = [
    { id: 1, name: "Pongal", image: "/images/pongal.avif" },
    { id: 2, name: "Chole Bhature", image: "/images/chole.avif" },
    { id: 3, name: "Biryani", image: "/images/biryani.webp" },
    { id: 4, name: "Dosa Chutney", image: "/images/dosa.webp" },
    { id: 5, name: "Paneer Butter Masala", image: "/images/paneer.png" },
    { id: 6, name: "Idli Sambar", image: "/images/idli.jpg" },
  ];

  
  const [likes, setLikes] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("recipeLikes")) || {};
    return stored;
  });

  useEffect(() => {
    localStorage.setItem("recipeLikes", JSON.stringify(likes));
  }, [likes]);

  const handleLike = (recipeId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }

    setLikes((prev) => {
      const currentLikes = prev[recipeId] || [];
      let updatedLikes;

      if (currentLikes.includes(user.username)) {
        // remove like
        updatedLikes = currentLikes.filter((u) => u !== user.username);
      } else {
        // add like
        updatedLikes = [...currentLikes, user.username];
      }

      return {
        ...prev,
        [recipeId]: updatedLikes,
      };
    });
  };

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem("dynamicRecipes")) || [];
    setDynamicRecipes(savedRecipes);
  }, []);

  const handleDelete = (id) => {
    const updated = dynamicRecipes.filter((r) => r.id !== id);
    setDynamicRecipes(updated);
    localStorage.setItem("dynamicRecipes", JSON.stringify(updated));
  };

  const handleSaveRecipe = (recipe) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }

    let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    
    if (!savedRecipes.find((r) => r.id === recipe.id)) {
      const recipeToSave = {
        id: recipe.id,
        name: recipe.name,
        image: recipe.image,
        username: recipe.username || 'anonymous',
        createdAt: recipe.createdAt || new Date().toISOString()
      };
      
      const updatedRecipes = [...savedRecipes, recipeToSave];
      localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
      
      // Also update the user's saved recipes for backward compatibility
      let userSavedRecipes = JSON.parse(localStorage.getItem(`${user.username}_recipes`)) || [];
      if (!userSavedRecipes.find(r => r.id === recipe.id)) {
        userSavedRecipes.push(recipeToSave);
        localStorage.setItem(`${user.username}_recipes`, JSON.stringify(userSavedRecipes));
      }
      
      // Trigger storage event to update ProfileScreen
      window.dispatchEvent(new Event('storage'));
      
      alert("Recipe saved!");
    } else {
      alert("Recipe already saved!");
    }
  };

  const allRecipes = [...staticRecipes, ...dynamicRecipes];

  const filteredRecipes = allRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="recipes-header">
        <h1>Recipes</h1>
        <input
          type="text"
          placeholder="Search Recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="recipes-search"
        />
      </div>

      <div className="recipes-grid">
        {filteredRecipes.map((recipe) => {
          const recipeLikes = likes[recipe.id] || [];
          const user = JSON.parse(localStorage.getItem("user"));
          const likedByUser = user ? recipeLikes.includes(user.username) : false;

          return (
            <div key={recipe.id} className="recipe-card">
              {dynamicRecipes.find((r) => r.id === recipe.id) && (
                <button
                  className="delete-circle"
                  onClick={() => handleDelete(recipe.id)}
                  title="Delete recipe"
                >
                  <Trash2 size={16} />
                </button>
              )}

              <img src={recipe.image} alt={recipe.name} />
              <h2>{recipe.name}</h2>
              
              <div className="recipe-buttons">
                <div className="button-and-meta">
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                  >
                    View Making
                  </button>
                  <div className="recipe-meta">
                    <span className="recipe-username">@{recipe.username || 'anonymous'}</span>
                    {recipe.createdAt && (
                      <span className="recipe-timestamp">
                        {new Date(recipe.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                </div>

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
    </div>
  );
};

export default RecipesPage;
