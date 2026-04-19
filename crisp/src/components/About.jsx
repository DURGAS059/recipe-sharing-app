import React from "react";
import "./style/About.css";

const About = () => {
  return (
    <div className="about-container">
      {/* About Crisp Section */}
      <section className="about-section">
        <h1>About Crisp</h1>
        <h2>
          Crisp is a community-driven recipe sharing app where food enthusiasts discover, save, and share culinary creations from around the world. Our platform connects home cooks and professional chefs alike, allowing them to browse curated recipe categories, contribute their own signature dishes, and engage with a vibrant community of fellow food lovers. Whether you're looking for quick weeknight dinners, elaborate entertaining recipes, or exploring cuisines from different cultures, Crisp provides the inspiration and resources you need to explore new flavors and expand your cooking horizons.
        </h2>
      </section>

      {/* Footer Section */}
      <footer className="about-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: <a href="mailto:help@crisprecipes.com">help@crisprecipes.com</a></p>
            <p>Phone: +1 (800) 123-4567</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
