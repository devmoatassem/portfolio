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
        <li key={navItem.name} className="relative py-2 pl-3 pr-4 rounded  hover:bg-gray-100 md:hover:bg-transparent md:p-0 text-white hover:text-gray-950">
            <Link
              to={navItem.linkTo}
              
              >
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
