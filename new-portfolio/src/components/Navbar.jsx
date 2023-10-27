import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="mx-auto my-3 bg-slate-800 text-white rounded-full w-96">
      <ul className="flex place-content-center justify-between px-8 py-4">
        <li className="mx-2 cursor-pointer"><Link className="" to="/home">Home</Link></li>
        <li className="mx-2 cursor-pointer"><Link className="" to="/about">About</Link></li>
        <li className="mx-2 cursor-pointer"><Link className="" to="/portfolio">Portfolio</Link></li>
        <li className="mx-2 cursor-pointer"><Link className="" to="/education">Education</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
