import React from "react";
import { Navigate,useNavigate } from "react-router-dom";
import "./HomeStyle.css";

function Hero() {
  const navigate = useNavigate();
  return (
    <div className="hero-container">
      <h1 className="hero-title">Unlock Your Potential with <span className="highlight">e-Learning</span> Platform 🚀</h1>
      <p className="hero-subtitle">Experience personalized learning paths, instant feedback, and intelligent insights.</p>
      <div className="hero-buttons">
        <button className="btn-primary" onClick={()=>{navigate("/login")}}>Start Free Trial</button>
        <button className="btn-secondary" onClick={()=>{navigate("/about")}}>Learn More 💪</button>
      </div>
    </div>
  );
}

export default Hero;
