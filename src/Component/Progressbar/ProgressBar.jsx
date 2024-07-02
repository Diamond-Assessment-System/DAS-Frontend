// ProgressBar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ProgressBar.css';

const ProgressBar = () => {
  const location = useLocation();
  const steps = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Đơn hàng dịch vụ', path: '/donhangdichvu' },
    { name: 'Giấy giám định', path: '/giaygiadinh' },
  ];

  const getProgressBarClass = (path) => {
    return location.pathname === path ? 'progress-step active' : 'progress-step';
  };

  return (
    <div className="progress-bar">
      {steps.map((step, index) => (
        <Link key={index} to={step.path} className={getProgressBarClass(step.path)}>
          <div className="step-number">{index + 1}</div>
          <div className="step-label">{step.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default ProgressBar;
