import React from "react";

const courses = [
  { 
    _id:1,
    title: "Web Development",
    desc: "HTML, CSS, JavaScript, React, and more to build powerful websites and web apps.",
    img: "./course1.png",
  },
  {
    _id:2,
    title: "Data Science",
    desc: "Python, statistics, machine learning, and real-world data projects.",
    img: "./datascience.png",
  },
  { 
    _id:3,
    title: "Digital Marketing",
    desc: "Master SEO, Google Ads, analytics, social media, and more.",
    img: "./digital.png",
  },
  {
    _id:4,
    title: "App Development",
    desc: "Learn to build Android and iOS apps using Flutter, Kotlin, and Swift.",
    img: "./APPDEV.png",
  },
  {
    _id:5,
    title: "AI & ML",
    desc: "Deep learning, neural networks, and artificial intelligence applications.",
    img: "./AIML.png",
  },
  {
    _id:6,
    title: "Data Science",
    desc: "Python, statistics, machine learning, and real-world data projects.",
    img: "./datascience.png",
  },
  {
    _id:7,
    title: "Digital Marketing",
    desc: "Master SEO, Google Ads, analytics, social media, and more.",
    img: "./digital.png",
  },
  { 
    _id:8,
    title: "Web Development",
    desc: "HTML, CSS, JavaScript, React, and more to build powerful websites and web apps.",
    img: "./course1.png",
  },
];

function handlePurchaseBtn(e){
  Navigate("/")

}

const CourseCard = () => {
  return (
    <div className="courses-container">
      {courses.map((course, index) => (
        <div className="course-card" key={index}>
          <img src={course.img} alt={course.title}  height={"275px"} style={{boxShadow:"2px 2px 2px black"}}/>
          <h3>{course.title}</h3>
          <p>{course.desc}</p>
        <button className="btn btn-primary" onClick={()=>{handlePurchaseBtn()}}>Purchase</button>
        </div>
      ))}
    </div>
  );
};

export default CourseCard;
