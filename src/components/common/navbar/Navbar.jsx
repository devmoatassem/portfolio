import React from "react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import { motion } from "framer-motion";
import "../../../assets/css/nav-bar.css";

function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <nav className="bg-transparent w-full header top-0 left-0 z-50 h-auto absolute">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-screen-xl flex items-center mx-auto p-4 justify-between"
      >
        <div className="name-logo text-white">
          <Link to="https://moatassam.com/">
            &lt;<span id="abcd">Moatassem Billah</span>/&gt;
          </Link>
        </div>
        <div className="flex items-center md:order-2">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="container rounded md:rounded-lg border shadow-lg border-gray-600 bg-gray-700 fill-white text-white text-sm md:text-base font-medium px-2 py-1 flex items-center justify-center h-fit md:px-7 md:py-2.5 text-center mr-1 md:mr-0"
          >
            <Link
              to="https://www.upwork.com/freelancers/~01abde944203e3bbf3"
              className="hover:underline hover:underline-offset-4 gap-1 md:gap-2 flex items-center justify-around"
            >
              Hire Me
              <svg className="h-3 md:h-4" viewBox="0 0 512 512">
                <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
              </svg>
            </Link>
          </motion.div>

          <button
            type="button"
            className="inline-flex items-center w-12 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none -mr-2"
            onClick={() => setNavbarOpen(true)}
          >
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
        <div
          className={
            (navbarOpen
              ? "block absolute inset-0 h-screen rounded-none z-50 text-center"
              : "hidden") +
            " rounded-lg border shadow-lg border-gray-600 bg-gray-800 items-center justify-between w-full md:flex md:w-96 md:order-1 md:mr-28 "
          }
        >
          {navbarOpen ? (
            <div
              className="w-5 m-5 ml-auto fill-white cursor-pointer"
              onClick={() => setNavbarOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
          ) : null}
          <ul
            onClick={() => setNavbarOpen(false)}
            className="flex flex-col space-y-0 md:space-y-0 p-4 md:p-0 mt-4 font-medium md:flex-row md:space-x-8 md:mt-0 md:border-0 md:place-content-center md: justify-between md:px-8 md:py-3"
          >
            <NavLinks />
          </ul>
        </div>
      </motion.div>
    </nav>
  );
}
export default Navbar;
