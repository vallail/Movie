import React from "react";
import "../css/About.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <h1 className="about-title">About CineVerse</h1>
          <p className="about-subtitle">
            Your gateway to cinematic excellence
          </p>
        </div>

        <div className="about-content">
          <p className="about-description">
            Welcome to CineVerse, a modern movie discovery platform designed for true film enthusiasts. 
            We believe that every movie has a story worth discovering, and we're here to help you find 
            your next favorite film.
          </p>
          <p className="about-description">
            Our platform combines cutting-edge technology with an intuitive design to provide you with 
            a seamless movie browsing experience. From blockbuster hits to hidden gems, we curate a 
            diverse collection of films that cater to every taste and preference.
          </p>
          <p className="about-description">
            Built with modern web technologies and powered by The Movie Database (TMDB), CineVerse 
            offers real-time access to the latest movie information, ratings, and reviews from around the world.
          </p>
        </div>

        <div className="about-features">
          <div className="feature-card">
            <div className="feature-icon">🎬</div>
            <h3 className="feature-title">Discover Movies</h3>
            <p className="feature-description">
              Explore thousands of movies with our powerful search and recommendation system
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">❤️</div>
            <h3 className="feature-title">Save Favorites</h3>
            <p className="feature-description">
              Build your personal collection by saving your favorite films for easy access
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3 className="feature-title">Responsive Design</h3>
            <p className="feature-description">
              Enjoy a seamless experience across all devices with our mobile-first approach
            </p>
          </div>
        </div>

        <div className="tech-stack">
          <h3>Built With Modern Technologies</h3>
          <div className="tech-list">
            <span className="tech-item">React 19</span>
            <span className="tech-item">Vite</span>
            <span className="tech-item">Tailwind CSS</span>
            <span className="tech-item">TMDB API</span>
            <span className="tech-item">Local Storage</span>
            <span className="tech-item">Responsive Design</span>
          </div>
        </div>

        <div className="about-actions">
          <button
            className="about-button"
            onClick={() => alert("Thank you for exploring CineVerse! 🎬")}>
            <span>👋</span>
            Say Hello
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
