import React from "react";
import "../css/About.css";

const About = () => {
  return (
    <div className="about-page">
      <h1 className="about-title">About Us</h1>
      <p className="about-description">
        Welcome to our movie app! We are passionate about movies and created this platform to help fellow movie lovers
        discover, save, and explore their favorite films.
      </p>
      <p className="about-description">
        Our goal is to provide a clean and engaging interface where you can easily browse through trending, popular, and
        top-rated movies, as well as curate your personal list of favorites.
      </p>
      <p className="about-description">
        This app was built with React.js and leverages modern web development practices to ensure a smooth and
        responsive experience.
      </p>
      <button
        className="about-button"
        onClick={() => alert("Thanks for visiting our About page!")}>
        Say Hello
      </button>
    </div>
  );
};

export default About;
