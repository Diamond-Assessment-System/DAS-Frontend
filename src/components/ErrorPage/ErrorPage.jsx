// src/components/ErrorPage/ErrorPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import errorImage from '../../assets/error_page_icon.png';
import './ErrorPage.scss'; // Import file SCSS

const ErrorPage = () => {
  return (
    <div className="container">
      <img src={errorImage} alt="Error Icon" className="image" />
      <h1 className="title">404 - Page Not Found</h1>
      <p className="message">The page you are looking for does not exist.</p>
      <Link to="/" className="link">Go to Home</Link>
    </div>
  );
};

export default ErrorPage;
