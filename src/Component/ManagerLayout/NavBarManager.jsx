import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-100 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link className="text-xl font-bold text-gray-900" to="/">
              Manager Portal
            </Link>
          </div>
          <div className="flex items-center -mr-2 md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
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
                  className="block h-6 w-6"
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
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                to="/"
              >
                Dashboard
              </Link>
              <Link
                className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                to="/manager/manage-pricing-timelines"
              >
                Manage Pricing & Timelines
              </Link>
              <Link
                className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                to="/manager/sealing-records"
              >
                Sealing Records
              </Link>
              <Link
                className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                to="/manager/commitment-paper"
              >
                Commitment Paper
              </Link>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              className="text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
              to="/"
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
            <Link
              className="text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
              to="/manager/manage-pricing-timelines"
              onClick={toggleMenu}
            >
              Manage Pricing & Timelines
            </Link>
            <Link
              className="text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
              to="/manager/sealing-records"
              onClick={toggleMenu}
            >
              Sealing Records
            </Link>
            <Link
              className="text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
              to="/manager/commitment-paper"
              onClick={toggleMenu}
            >
              Commitment Paper
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
