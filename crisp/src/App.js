import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import CategoriesPage from "./components/CategoriesPage";
import Dashboard from "./components/Dashboard";
import RecipeList from "./components/RecipesDetail.jsx";
import DashboardCategories from "./components/DashboardCategories.jsx";
import RecipesPage from "./components/RecipesPage";
import MyRecipes from "./components/MyRecipes.jsx";
import RecipeDetail from "./components/RecipesDetail";
import About from "./components/About.jsx";
import Recipe from "./components/Recipe";
import AddRecipe from "./components/AddRecipe";

import CategoryRecipesPage from "./components/CategoriesRecipesPage";
import ProfileScreen from "./components/ProfileScreen";

// Navbars
import Navbar from "./components/Navbar";
import DashboardNavbar from "./components/DashboardNavbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // Sync localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      {isLoggedIn ? <DashboardNavbar /> : <Navbar />}

      <Routes>
        {/* Home: redirect to Dashboard if logged in */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <LandingPage />}
        />

        {/* Auth */}
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<RegisterPage setIsLoggedIn={setIsLoggedIn} />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-recipe"
          element={isLoggedIn ? <AddRecipe /> : <Navigate to="/login" />}
        />

        {/* Recipes / Categories */}
        <Route path="/categories" element={<CategoriesPage />} />
       
<Route path="/category/:name" element={<CategoryRecipesPage />} />
        <Route path="/categories/:categoryName" element={<RecipeList />} />
        <Route path="/categories/:categoryName/recipe" element={<Recipe />} />
        <Route path="/dashboardcategories" element={<DashboardCategories />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/myrecipes" element={<MyRecipes />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />

        {/* Contact */}
        <Route path="/about" element={<About />} />

        {/* Profile */}
        <Route
          path="/profile"
          element={isLoggedIn ? <ProfileScreen /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
