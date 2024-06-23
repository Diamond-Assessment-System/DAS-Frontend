import React from "react";
import "../AdminLayout/Dashboard.css";
const Dashboard = () => {
  return (
    <div>
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div className="stats">
          <div className="stat-item">
            <h2>Total Sales</h2>
            <p>$10,000</p>
          </div>
          <div className="stat-item">
            <h2>New Orders</h2>
            <p>15</p>
          </div>
          <div className="stat-item">
            <h2>Total Diamonds</h2>
            <p>120</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
