import { useState } from "react";
import { navLinks } from "../constants";
import {
  AiOutlineMenuUnfold,
  AiOutlineMenuFold,
  AiOutlineSearch,
} from "react-icons/ai";
import { BiSolidDownArrow } from "react-icons/bi";

const Navbar = () => {
  const [active, setActive] = useState("HOME");
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);

  const toggleDropdown1 = () => {
    setShowDropdown1(!showDropdown1);
    setShowDropdown2(false); // Close other dropdown if open
  };

  const toggleDropdown2 = () => {
    setShowDropdown2(!showDropdown2);
    setShowDropdown1(false); // Close other dropdown if open
  };

  return (
    <nav className="w-full py-4 z-20 bg-[#212529] relative">
      <ul className="list-none sm:flex sm:justify-evenly gap-6 relative">
        {navLinks.map((link) => (
          <li
            key={link.id}
            className={`text-white text-18px font-semibold cursor-pointer ${
              active === link.title ? "border-b-2 border-white " : ""
            } hover:border-b-2 hover:border-white  transition-all duration-300 `}
            onClick={() => {
              setActive(link.title);
              if (link.title === "ACADEMICS") {
                toggleDropdown1();
              } else if (link.title === "FACULTY") {
                toggleDropdown2();
              }
            }}
          >
            <a href={`#${link.id}`}>
              {link.title === "ACADEMICS" || link.title === "FACULTY" ? (
                <>
                  {link.title}
                  <BiSolidDownArrow className="inline text-white ml-2" />
                </>
              ) : (
                link.title
              )}
            </a>
          </li>
        ))}
        {/* Dropdown content for both dropdowns */}
        {showDropdown1 && (
          <div className="dropdown-menu text-white w-[10%]">
            <ul>
              {/* Add your dropdown 1 list items here */}
              <li>Graduate Programs</li>
              <li>UnderGraduate Programs</li>
            </ul>
          </div>
        )}
        {showDropdown2 && (
          <div className="dropdown-menu text-white">
            <ul>
              {/* Add your dropdown 2 list items here */}
              <li>Academics Team</li>
              <li>Administrative Team</li>
            </ul>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
