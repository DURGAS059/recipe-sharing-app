import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style/AddRecipe.css";

const AddRecipe = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: "",
    category: "",
    image: null,
    instructions: [""],
  });

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setRecipe({ ...recipe, image: e.target.files[0] });
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...recipe.instructions];
    newInstructions[index] = value;
    setRecipe({ ...recipe, instructions: newInstructions });
  };

  const addInstructionStep = () => {
    setRecipe({ ...recipe, instructions: [...recipe.instructions, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", recipe.name);
      formData.append("description", recipe.description);
      formData.append("category", recipe.category);

      if (recipe.image) {
        formData.append("image", recipe.image);
      }

      const ingredientsArray = recipe.ingredients
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean);
      ingredientsArray.forEach((ing) => formData.append("ingredients", ing));

      recipe.instructions.forEach((step) => formData.append("instructions", step));

      
      await axios.post("http://localhost:5000/recipes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Recipe added successfully!");

        
      const existingDynamic = JSON.parse(localStorage.getItem("dynamicRecipes")) || [];
      
      // Convert image to base64 for persistent storage
      let imageBase64 = null;
      if (recipe.image) {
        imageBase64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(recipe.image);
        });
      }
      
      const user = JSON.parse(localStorage.getItem("user"));
      const newRecipe = {
            id: Date.now(), // unique id
            name: recipe.name,
            description: recipe.description,
            ingredients: ingredientsArray,
            category: recipe.category,
            instructions: recipe.instructions,
            image: imageBase64,
            username: user ? user.username : 'anonymous',
            createdAt: new Date().toISOString()
        };
        localStorage.setItem(
            "dynamicRecipes",
            JSON.stringify([...existingDynamic, newRecipe])
        );

      
      setRecipe({
        name: "",
        description: "",
        ingredients: "",
        category: "",
        image: null,
        instructions: [""],
      });

      // Redirect to recipes page
      navigate("/recipes");
    } catch (err) {
      console.error(err);
      alert("Error adding recipe");
    }
  };

  return (
    <div className="add-recipe-container">
      <h2>Add New Recipe</h2>
      <form className="add-recipe-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Recipe Name"
          value={recipe.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={recipe.description}
          onChange={handleChange}
          required
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          value={recipe.ingredients}
          onChange={handleChange}
          required
        />
        <select
  name="category"
  value={recipe.category}
  onChange={handleChange}
  required
>
  <option value="">Select Category</option>
  <option value="Tea">Tea</option>
  <option value="Coffee">Coffee</option>
  <option value="Breakfast">Breakfast</option>
  <option value="Meals">Meals</option>
  <option value="Snacks">Snacks</option>
  <option value="Chicken">Chicken</option>
  <option value="Mutton">Mutton</option>
  <option value="Noodles">Noodles</option>
  <option value="Pasta">Pasta</option>
  <option value="Desserts">Desserts</option>
  <option value="Soup">Soup</option>
</select>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <div className="instructions-section">
          <label>Instructions:</label>
          {recipe.instructions.map((step, index) => (
            <div key={index} className="instruction-step">
              <span>{index + 1}.</span>
              <textarea
                value={step}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                placeholder={`Step ${index + 1}`}
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addInstructionStep}
            className="add-step-btn"
          >
            + Add Step
          </button>
        </div>

        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
