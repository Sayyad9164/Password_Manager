// import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-7 py-2">
      <div className="mycontainer flex items-center justify-between px-4 py-5 h-12 md:px-0">
        
        <div className="logo font-bold text-white text-2xl cursor-pointer">
          <span className="text-green-500">&lt;</span>
          <span className="text-gray-300">Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </div>

        <ul>
          <li className="flex gap-x-5">
            <a className="hover:font-bold" href="/">
              Home
            </a>
            <a className="hover:font-bold" href="#">
              About
            </a>
            <a className="hover:font-bold" href="*">
              Contact
            </a>
          </li>
        </ul>
      
      </div>
    </nav>
  );
};

export default Navbar;
