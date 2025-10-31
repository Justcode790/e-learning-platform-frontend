import React from "react";

function PublicOpinion() {
  const testimonials = [
    {
      name: "Ankit",
      role: "Student",
      text: "The AI-powered feedback has been a game-changer for my learning. It’s like having a personal tutor!",
      img: "./public1.png", // public1
    },
    {
      name: "Praveen",
      role: "Educator",
      text: "Integrating AI into my teaching has never been easier. The platform is intuitive and powerful.",
      img: "./public2.png", // public2
    },
    {
      name: "Ayush",
      role: "Student",
      text: "The AI-powered feedback has been a game-changer for my learning. It’s like having a personal tutor!",
      img: "./public3.jpg", // public3
    },
    {
      name: "Tushar",
      role: "Educator",
      text: "Integrating AI into my teaching has never been easier. The platform is intuitive and powerful.",
      img: "./public2.png", // public2
    },
    {
      name: "Anshu",
      role: "Educator",
      text: "Integrating AI into my teaching has never been easier. The platform is intuitive and powerful.",
      img: "./public2.png", // public2
    },
  ];

  return (
    <div className="testimonials-container">
      <h2 className="testimonials-title">
        What Our Users Say <span>😊</span>
      </h2>

      <div className="testimonials-grid">
        {testimonials.map((t, index) => (
          <div key={index} className="testimonial-card">
            <div className="testimonial-header">
              <img src={t.img} alt={t.name} className="testimonial-avatar" />
              <div>
                <h4 className="testimonial-name">{t.name}</h4>
                <p className="testimonial-role">{t.role}</p>
              </div>
            </div>
            <p className="testimonial-text">"{t.text}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PublicOpinion;
