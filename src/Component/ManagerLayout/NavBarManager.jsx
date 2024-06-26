import React from "react";
import { Link } from "react-router-dom";
import "../ManagerLayout/NavBarManager.css";
const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-header">
          <Link to="/manager" className="navbar-brand">
            Manager Portal
          </Link>
          <button
            onClick={toggleMenu}
            className="navbar-toggler"
            type="button"
            aria-expanded={isOpen ? "true" : "false"}
          >
            <span className="sr-only">Toggle navigation</span>
            {isOpen ? (
              <svg
                className="icon"
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
                className="icon"
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
        <div className={`navbar-menu ${isOpen ? "open" : ""}`}>
          <Link to="/manager" className="navbar-link" onClick={toggleMenu}>
            Dashboard
          </Link>
          <Link
            to="/manager/manage-pricing-timelines"
            className="navbar-link"
            onClick={toggleMenu}
          >
            Manage Pricing & Timelines
          </Link>
          <Link
            to="/manager/sealing-records"
            className="navbar-link"
            onClick={toggleMenu}
          >
            Sealing Records
          </Link>
          <Link
            to="/manager/commitment-paper"
            className="navbar-link"
            onClick={toggleMenu}
          >
            Commitment Paper
          </Link>
          {/* <Link
            to="/manager/assignwork"
            className="navbar-link"
            onClick={toggleMenu}
          >
            Assign Booking
          </Link> */}
          <Link
            to="/manager/assignpaper"
            className="navbar-link"
            onClick={toggleMenu}
          >
            Assign Sample
          </Link>
        </div>
      </div>
      {isOpen && (
        <div className="navbar-dropdown">
          <Link to="/" className="navbar-dropdown-link" onClick={toggleMenu}>
            Dashboard
          </Link>
          <Link
            to="/manager/manage-pricing-timelines"
            className="navbar-dropdown-link"
            onClick={toggleMenu}
          >
            Manage Pricing & Timelines
          </Link>
          <Link
            to="/manager/sealing-records"
            className="navbar-dropdown-link"
            onClick={toggleMenu}
          >
            Sealing Records
          </Link>
          <Link
            to="/manager/commitment-paper"
            className="navbar-dropdown-link"
            onClick={toggleMenu}
          >
            Commitment Paper
          </Link>
          <Link
            to="/manager/assignwork"
            className="navbar-dropdown-link"
            onClick={toggleMenu}
          >
            Assign Booking
          </Link>
          <Link
            to="/manager/assignpaper"
            className="navbar-dropdown-link"
            onClick={toggleMenu}
          >
            Assign Assessment Paper
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
