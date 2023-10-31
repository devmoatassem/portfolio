import React from "react";
import { Link } from "react-router-dom";


const navList = [
  {
    name: 'Home',
    linkTo: '/home'
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

const rendered_nav_list = navList.map((navItem)=>(
        <li key={navItem.name}>
            <Link
              to={navItem.linkTo}
              className="relative py-2 pl-3 pr-4 rounded active:bg-blue-700 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 text-white hover:text-white">
              {navItem.name}
            </Link>
          </li>
))


function NavLinks() {
  
  return (
          <>
            {rendered_nav_list}
          </>

  );
}


export default NavLinks;