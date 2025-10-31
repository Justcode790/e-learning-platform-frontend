import React from "react";
import { useAuth } from "../../AuthProvider";
import "./Dashboard.css";

const Dashboard = () => {
  const { currentUser } = useAuth();

  if (!currentUser) return <p className="loading">Loading...</p>;

  return (
    <div className="dashboard">
      <p className="empty-message">You haven't joined any course yet 🚀</p>
    </div>
  );
};

export default Dashboard;
