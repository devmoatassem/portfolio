import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/nav-bar.css"

function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <nav className="bg-white w-full z-20 top-0 left-0">
      <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4 justify-between">
        <div className="name-logo">
          <a href="#">
            &lt;<span id="abcd">Moatassem Billah</span>/&gt;
          </a>
        </div>
        <div className="flex md:order-2">
          <button type="button" className="items-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 ">
            Get started
          </button>
          <button
            // data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            // aria-controls="navbar-sticky"
            // aria-expanded="false"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div className={(navbarOpen ? "hidden" : "") + "hidden items-center justify-between w-full md:flex md:w-96 md:order-1 md:mr-32"}>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 md:place-content-center md: justify-between md:px-8 md:py-4 md:rounded-full bg-gray-800 md:bg-gray-900 ">
            <li>
              <Link
                to="/home"
                className="block py-2 pl-3 pr-4 rounded active:bg-blue-700 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 text-white hover:text-white"
                // aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 pl-3 pr-4 rounded active:bg-blue-700 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 text-white hover:text-white"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/portfolio"
                className="block py-2 pl-3 pr-4 rounded active:bg-blue-700 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 text-white hover:text-white"
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                to="/education"
                className="block py-2 pl-3 pr-4 rounded active:bg-blue-700 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 text-white hover:text-white"
              >
                Education
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
