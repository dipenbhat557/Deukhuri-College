import React, { useState, useEffect } from "react";
import { navLinks } from "../constants";
import {
  AiOutlineMenuUnfold,
  AiOutlineMenuFold,
  AiOutlineSearch,
} from "react-icons/ai";
import { BiSolidDownArrow } from "react-icons/bi";

const Navbar = ({ active }) => {
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const toggleDropdown1 = () => {
    setShowDropdown1(!showDropdown1);
    setShowDropdown2(false); // Close other dropdown if open
  };

  const toggleDropdown2 = () => {
    setShowDropdown2(!showDropdown2);
    setShowDropdown1(false); // Close other dropdown if open
  };

  // Function to handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  // Add scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`w-full py-4 z-20 relative ${scrolling ? "scrolled" : ""}`}>
      <ul className="list-none sm:flex sm:justify-evenly gap-6 relative">
        {navLinks.map((link) => (
          <li
            key={link.id}
            className={`text-slate-100 text-18px font-semibold cursor-pointer ${
              active === link.title ? "font-extrabold" : ""
            }  hover:text-slate-300`}
            onClick={() => {
              if (link.title === "ACADEMICS") {
                toggleDropdown1();
              } else if (link.title === "FACULTY") {
                toggleDropdown2();
              }
            }}
          >
            {link.title === "ACADEMICS" || link.title === "FACULTY" ? (
              <>
                {link.title}
                <BiSolidDownArrow className="inline text-white ml-2" />
              </>
            ) : (
              <a href={link.route}>{link.title}</a>
            )}
          </li>
        ))}
      </ul>

      {showDropdown1 && (
        <div className="dropdown-menu mt-2 ml-60 p-3 rounded-b-xl text-black bg-white w-[18%] absolute z-30">
          <ul>
            <li className="hover:bg-slate-400 click:bg-red-900 p-2 rounded-sm">
              <a href="/graduate" onClick={toggleDropdown1}>
                Graduate Programs
              </a>
            </li>
            <li className="hover:bg-slate-400 click:bg-red-900 p-2 rounded-sm">
              <a href="/undergraduate" onClick={toggleDropdown2}>
                Undergraduate Programs
              </a>
            </li>
          </ul>
        </div>
      )}

      {showDropdown2 && (
        <div className="dropdown-menu mt-2 right-1 p-3 rounded-b-xl text-black bg-white w-[14%] absolute z-30">
          <ul>
            <li className="hover:bg-slate-400 click:bg-red-900 p-2 rounded-sm">
              <a href="/faculty/academics" onClick={toggleDropdown2}>
                Academics Team
              </a>
            </li>
            <li className="hover:bg-slate-400 click:bg-red-900 p-2 rounded-sm">
              <a href="/faculty/administration" onClick={toggleDropdown2}>
                Administrative Team
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
