import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style/Categories.css";

const categories = [
  { id: 1, name: "Tea", description: "A warm beverage made by steeping tea leaves in water.", image: "./images/tea.avif" },
  { id: 2, name: "Coffee", description: "A warm beverage made by steeping coffee grounds in water.", image: "./images/coffee.avif" },
  { id: 3, name: "Tiffin", description: "Start your day with healthy and tasty breakfast recipes.", image: "./images/breakfast.avif" },
  { id: 4, name: "Meals", description: "Delicious lunch recipes to keep you energized.", image: "./images/lunch.jpg" },
  { id: 5, name: "Snacks", description: "Quick and easy snack recipes for anytime cravings.", image: "./images/snack.avif" },
  { id: 6, name: "Chicken", description: "Delicious chicken recipes for a hearty meal.", image: "./images/chicken.avif" },
  { id: 7, name: "Mutton", description: "Tender mutton recipes for a flavorful meal.", image: "./images/mutton.avif" },
  { id: 8, name: "Noodles", description: "Noodles recipes for a quick and delicious meal.", image: "./images/noodles.avif" },
  { id: 9, name: "Pasta", description: "Delicious pasta recipes for a hearty meal.", image: "./images/pasta.avif" },
  { id: 10, name: "Desserts", description: "Sweet treats and desserts to satisfy your sugar cravings.", image: "./images/desserts.avif" },
  { id: 11, name: "Soup", description: "Warm and comforting soup recipes for any occasion.", image: "./images/Soup.avif" },
];

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  // Load recipes from localStorage
  useEffect(() => {
    const dynamicRecipes = JSON.parse(localStorage.getItem("dynamicRecipes")) || [];
    setRecipes(dynamicRecipes);
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (categoryName) => {
    // Filter recipes by category and navigate to a new page
    const filteredRecipes = recipes.filter(
      (recipe) => recipe.category.toLowerCase() === categoryName.toLowerCase()
    );
    localStorage.setItem("filteredRecipes", JSON.stringify(filteredRecipes));
    navigate(`/category/${categoryName.toLowerCase()}`);
  };

  return (
    <div className="categories-page">
      <div className="categories-header">
        <h1>Explore Categories</h1>
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      <div className="categories-grid">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <div key={category.id} className="category-card">
              <img src={category.image} alt={category.name} />
              <h2>{category.name}</h2>
              <p>{category.description}</p>
              <button className="view-btn" onClick={() => handleClick(category.name)}>Recipes</button>
            </div>
          ))
        ) : (
          <p>No categories found.</p>
        )}
      </div>
    </div>
  );
}
