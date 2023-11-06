import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"

const navList = [
  {
    name: 'Home',
    linkTo: '/'
  },
  {
    name: 'About',
    linkTo: '/about'
  },
  {
    name: 'Portfolio',
    linkTo: '/portfolio'
  },
  {
    name: 'Education',
    linkTo: '/education'
  }
]

const rendered_nav_list = navList.map((navItem) => (
  <motion.li
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    key={navItem.name}
    className="relative py-2 pl-3 pr-4 rounded hover:bg-gray-700 md:hover:bg-transparent md:p-0 text-white hover:underline hover:underline-offset-4">
    <Link className="block" to={navItem.linkTo}>
      {navItem.name}
    </Link>
  </motion.li>
))

function NavLinks() {

  return (
    <>
      {rendered_nav_list}
    </>
  );
}

export default NavLinks;
