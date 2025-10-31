import React from "react";
import "./HomeStyle.css";

function Steps() {
  return (
    <div className="steps-container">
      <div className="step-card">
        <h3>Sign Up</h3>
        <p>Create your free account in minutes.</p>
      </div>
      <div className="step-card">
        <h3>Explore Courses</h3>
        <p>Browse through our vast library of AI-powered courses.</p>
      </div>
      <div className="step-card">
        <h3>Start Learning</h3>
        <p>Begin your personalized learning journey today!</p>
      </div>
    </div>
  );
}

export default Steps;
