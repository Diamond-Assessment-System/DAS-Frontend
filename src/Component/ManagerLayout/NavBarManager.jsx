import React from "react";
import { Link } from "react-router-dom";
import "../ManagerLayout/NavBarManager.css"; // Import the CSS file for styling

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-flex">
          <div className="navbar-title">
            <Link to="/">Manager Portal</Link>
          </div>
          <div className="navbar-toggle">
            <button
              onClick={toggleMenu}
              type="button"
              className="navbar-button"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="navbar-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="navbar-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="navbar-links">
            <Link to="/manager">Dashboard</Link>
            <Link to="/manager/manage-pricing-timelines">
              Manage Pricing & Timelines
            </Link>
            <Link to="/manager/sealing-records">Sealing Records</Link>
            <Link to="/manager/commitment-paper">Commitment Paper</Link>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="navbar-dropdown">
          <Link to="/manager" onClick={toggleMenu}>
            Dashboard
          </Link>
          <Link to="/manager/manage-pricing-timelines" onClick={toggleMenu}>
            Manage Pricing & Timelines
          </Link>
          <Link to="/manager/sealing-records" onClick={toggleMenu}>
            Sealing Records
          </Link>
          <Link to="/manager/commitment-paper" onClick={toggleMenu}>
            Commitment Paper
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
