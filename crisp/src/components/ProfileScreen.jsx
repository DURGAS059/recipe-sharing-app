import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./style/ProfileScreen.css";

const ProfileScreen = () => {
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("postedRecipes");
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [postedRecipes, setPostedRecipes] = useState([]);
  const navigate = useNavigate();

  const loadSavedRecipes = useCallback(() => {
    const saved = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    console.log('Loading saved recipes:', saved);
    setSavedRecipes(saved);
  }, []);

  const loadLikedRecipes = useCallback(() => {
    const allLikes = JSON.parse(localStorage.getItem("recipeLikes")) || {};
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user) {
      // Get all recipe IDs that the user has liked
      const likedRecipeIds = Object.entries(allLikes)
        .filter(([_, usernames]) => usernames.includes(user.username))
        .map(([id]) => parseInt(id));
      
      // Get all recipes (static + dynamic)
      const staticRecipes = [
        { id: 1, name: "Pongal", image: "/images/pongal.avif" },
        { id: 2, name: "Chole Bhature", image: "/images/chole.avif" },
        { id: 3, name: "Biryani", image: "/images/biryani.webp" },
        { id: 4, name: "Dosa Chutney", image: "/images/dosa.webp" },
        { id: 5, name: "Paneer Butter Masala", image: "/images/paneer.png" },
        { id: 6, name: "Idli Sambar", image: "/images/idli.jpg" },
      ];
      const dynamicRecipes = JSON.parse(localStorage.getItem("dynamicRecipes")) || [];
      const allRecipes = [...staticRecipes, ...dynamicRecipes];
      
      // Filter recipes to only include liked ones
      const userLikedRecipes = allRecipes.filter(recipe => 
        likedRecipeIds.includes(recipe.id)
      );
      
      setLikedRecipes(userLikedRecipes);
    }
  }, []);

  const loadPostedRecipes = useCallback(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const dynamicRecipes = JSON.parse(localStorage.getItem("dynamicRecipes")) || [];
      // Filter recipes posted by the current user
      const userPostedRecipes = dynamicRecipes.filter(
        recipe => recipe.username === user.username
      );
      setPostedRecipes(userPostedRecipes);
    }
  }, []);

  const loadAllData = useCallback(() => {
    loadSavedRecipes();
    loadLikedRecipes();
    loadPostedRecipes();
  }, [loadSavedRecipes, loadLikedRecipes, loadPostedRecipes]);

  // Load data when component mounts
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
    const user = JSON.parse(localStorage.getItem("user"));
    if (storedProfile) {
      setProfile(storedProfile);
    } else if (user) {
      // Fallback to user data if profile not set up
      setProfile({ username: user.username, profilePic: null, bio: "" });
    }
    
    // Load all data on initial load
    loadAllData();
    
    // Add event listener for storage changes
    const handleStorageChange = () => {
      console.log('Storage changed, reloading data...');
      loadAllData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [loadAllData]);

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedProfile = { ...profile, profilePic: reader.result };
        setProfile(updatedProfile);
        localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
        setShowPhotoModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    const updatedProfile = { ...profile, profilePic: null };
    setProfile(updatedProfile);
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
    setShowPhotoModal(false);
  };

  const createRipple = useCallback((event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    // Create ripple element
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size/2}px`;
    ripple.style.top = `${event.clientY - rect.top - size/2}px`;
    
    // Add ripple to button
    button.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }, []);

  const handleLogout = (e) => {
    createRipple(e);
    setTimeout(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/");
      window.location.reload();
    }, 300);
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="profile-screen-wrapper">
      <div className="profile-screen-container">
        <div className="profile-top-section">
          <div className="profile-header">
            <div className="profile-pic-container">
              <input
                type="file"
                id="profile-pic-input"
                accept="image/*"
                onChange={handleProfilePicUpload}
                style={{ display: "none" }}
              />
              <div className="profile-pic-label" onClick={() => setShowPhotoModal(true)}>
                {profile.profilePic ? (
                  <img
                    src={profile.profilePic}
                    alt="profile"
                    className="profile-pic"
                  />
                ) : (
                  <div className="profile-pic-placeholder">
                    <span className="plus-symbol">+</span>
                  </div>
                )}
              </div>

              <div className={`modal-overlay ${showPhotoModal ? 'show' : ''}`} onClick={() => setShowPhotoModal(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <h2>Update Profile Photo</h2>
                  <p>Choose a new photo or remove the current one</p>
                  
                  <div className="modal-buttons">
                    <label 
                      htmlFor="profile-pic-input" 
                      className="modal-button upload-btn"
                      onClick={createRipple}
                    >
                      <i className="fas fa-upload"></i> Upload New Photo
                    </label>
                    
                    {profile.profilePic && (
                      <button 
                        className="modal-button remove-btn" 
                        onClick={(e) => {
                          createRipple(e);
                          handleRemovePhoto();
                        }}
                      >
                        <i className="fas fa-trash-alt"></i> Remove Photo
                      </button>
                    )}
                    
                    <button 
                      className="modal-button cancel-btn" 
                      onClick={(e) => {
                        createRipple(e);
                        setShowPhotoModal(false);
                      }}
                    >
                      <i className="fas fa-times"></i> Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-info">
              <div className="profile-header-top">
                <div className="username-section">
                  <h1>@{profile.username}</h1>
                </div>
                <button className="logout-btn-top" onClick={handleLogout}>
                  Logout
                </button>
              </div>

              <div className="stats">
                <div className="stat">
                  <span className="stat-number">{postedRecipes.length}</span>
                  <span className="stat-label">posts</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{savedRecipes.length}</span>
                  <span className="stat-label">saved</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{likedRecipes.length}</span>
                  <span className="stat-label">liked</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tabs-container">
          <div className="tabs">
            <button
              className={activeTab === "postedRecipes" ? "active" : ""}
              onClick={() => setActiveTab("postedRecipes")}
            >
              Posted Recipes
            </button>
            <button
              className={activeTab === "savedRecipes" ? "active" : ""}
              onClick={() => setActiveTab("savedRecipes")}
            >
              Saved Recipes
            </button>
            <button
              className={activeTab === "likedRecipes" ? "active" : ""}
              onClick={() => setActiveTab("likedRecipes")}
            >
              Liked Recipes
            </button>
          </div>
        </div>

        <div className="tab-content">
          {activeTab === "postedRecipes" && (
            <div className="saved-recipes-container">
              <h2>Posted Recipes</h2>
              <div className="recipes-grid">
                {postedRecipes && postedRecipes.length > 0 ? (
                  postedRecipes.map(recipe => (
                    <div 
                      key={recipe.id} 
                      className="recipe-card"
                      onClick={() => navigate(`/recipe/${recipe.id}`)}
                    >
                      <img 
                        src={recipe.image} 
                        alt={recipe.name} 
                        className="recipe-image" 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/default-recipe.jpg';
                        }}
                      />
                      <div className="recipe-info">
                        <h3>{recipe.name}</h3>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-recipes-message">
                    <p>No posted recipes yet. Create some recipes to see them here!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "savedRecipes" && (
            <div className="saved-recipes-container">
              <h2>Saved Recipes</h2>
              <div className="recipes-grid">
                {savedRecipes && savedRecipes.length > 0 ? (
                  savedRecipes.map(recipe => (
                    <div 
                      key={recipe.id} 
                      className="recipe-card"
                      onClick={() => navigate(`/recipe/${recipe.id}`)}
                    >
                      <img 
                        src={recipe.image} 
                        alt={recipe.name} 
                        className="recipe-image" 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/default-recipe.jpg';
                        }}
                      />
                      <div className="recipe-info">
                        <h3>{recipe.name}</h3>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-recipes-message">
                    <p>No saved recipes yet. Save some recipes to see them here!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "likedRecipes" && (
            <div className="saved-recipes-container">
              <h2>Liked Recipes</h2>
              <div className="recipes-grid">
                {likedRecipes && likedRecipes.length > 0 ? (
                  likedRecipes.map(recipe => (
                    <div 
                      key={recipe.id} 
                      className="recipe-card"
                      onClick={() => navigate(`/recipe/${recipe.id}`)}
                    >
                      <img 
                        src={recipe.image} 
                        alt={recipe.name} 
                        className="recipe-image" 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/default-recipe.jpg';
                        }}
                      />
                      <div className="recipe-info">
                        <h3>{recipe.name}</h3>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-recipes-message">
                    <p>No liked recipes yet. Like some recipes to see them here!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
