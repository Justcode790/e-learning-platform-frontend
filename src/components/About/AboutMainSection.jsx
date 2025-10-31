import React from 'react'
import "./aboutstyle.css"

function AboutMainSection() {
  return (
    <div className="about-main-section">
      <div className="about-content">
        <p>
          Learnify was founded with a mission to make quality education accessible to everyone. Whether you're a student,
          working professional, or lifelong learner, our platform offers expertly designed courses, real-time learning,
          and certifications that matter.
        </p>
        <p>
          We believe education should be affordable, engaging, and personalized. That’s why we partner with industry
          experts to create hands-on content, live workshops, and practical learning paths that empower you to upskill
          and succeed.
        </p>
        <p>
          Join over 100,000 learners who trust Learnify to boost their skills, confidence, and careers.
        </p>
      </div>
      <div className="about-image-wrapper">
        <img src="./about.png" alt="Learnify Illustration" className="about-image" />
      </div>
    </div>
  )
}

export default AboutMainSection