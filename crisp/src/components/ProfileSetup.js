import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/ProfileSetup.css";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Track current step
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const totalSteps = 4;

  const handleNext = () => setStep(step + 1);
  const handleSkip = () => setStep(step + 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const profileData = {
      username,
      email,
      bio,
      profilePic: profilePic ? URL.createObjectURL(profilePic) : null,
    };
    localStorage.setItem("userProfile", JSON.stringify(profileData));
    navigate("/profile");
  };

  return (
    <div className="profile-setup-container">
      <nav className="navbar">
        <h2>RecipeApp</h2>
      </nav>

      <form className="profile-setup-form" onSubmit={handleSubmit}>
        {/* ✅ Progress Bar */}
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Steps */}
        {step === 1 && (
          <div className="step-container">
            <h2>Enter your Name</h2>
            <input
              type="text"
              placeholder="Username / Display Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <div className="buttons">
              <div></div>
              <button type="button" onClick={handleNext} disabled={!username}>
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-container">
            <h2>Enter your Email</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="buttons">
              <button type="button" className="skip-btn" onClick={handleSkip}>
                Skip
              </button>
              <button type="button" onClick={handleNext} disabled={!email}>
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-container">
            <h2>Upload Profile Picture (Optional)</h2>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePic(e.target.files[0])}
            />
            <div className="buttons">
              <button type="button" className="skip-btn" onClick={handleSkip}>
                Skip
              </button>
              <button type="button" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="step-container">
            <h2>Enter Bio (Optional)</h2>
            <textarea
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <div className="buttons">
              <button type="button" className="skip-btn" onClick={handleSkip}>
                Skip
              </button>
              <button type="submit">Finish</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileSetup;
