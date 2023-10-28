import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/nav-bar.css"

function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <nav className="bg-transparent w-full header top-0 left-0 z-50 h-auto absolute">
      <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4 justify-between">
        <div className="name-logo text-white">
          <a href="#">
            &lt;<span id="abcd">Moatassem Billah</span>/&gt;
          </a>
        </div>
        <div className="flex md:order-2">
          <button type="button" className="glass-effect items-end text-white hover:text-blue-700 font-medium rounded-lg px-5 py-2 md:px-8 md:py-3 text-center mr-1 md:mr-0 ">
            Hire Me
          </button>
          <button

            type="button"
            className="inline-flex items-center w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none -mr-2"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
        <div className={(navbarOpen ? "hidden" : "") + "hidden  items-center justify-between w-full md:flex md:w-96 md:order-1 md:mr-32 "}>
          <ul className="glass-effect flex flex-col p-4 md:p-0 mt-4 font-medium border  md:flex-row md:space-x-8 md:mt-0 md:border-0 md:place-content-center md: justify-between md:px-8 md:py-3 ">
            <li>
              <Link
                to="/home"
                className="block py-2 pl-3 pr-4 rounded active:bg-blue-700 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 text-white hover:text-white"
              
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
