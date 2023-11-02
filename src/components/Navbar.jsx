import { useState } from "react";
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

  const toggleDropdown1 = () => {
    setShowDropdown1(!showDropdown1);
    setShowDropdown2(false); // Close other dropdown if open
  };

  const toggleDropdown2 = () => {
    setShowDropdown2(!showDropdown2);
    setShowDropdown1(false); // Close other dropdown if open
  };

  return (
    <nav className="w-full py-4 z-20 relative">
      <ul className="list-none sm:flex sm:justify-evenly gap-6 relative">
        {navLinks.map((link) => (
          <li
            key={link.id}
            className={`text-white text-18px font-semibold cursor-pointer ${
              active === link.title ? "border-b-2 border-white " : ""
            } hover:border-b-2 hover:border-white  transition-all duration-300 `}
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
        <div className="dropdown-menu mt-2 ml-60 p-3 rounded-xl text-black bg-white w-[16%] absolute z-30">
          <ul>
            {/* Add your dropdown 1 list items here */}
            <li>
              <a href="/graduate" onClick={toggleDropdown1}>
                Graduate Programs
              </a>
            </li>
            <li>
              <a href="/undergraduate" onClick={toggleDropdown2}>
                Undergraduate Programs
              </a>
            </li>
          </ul>
        </div>
      )}

      {showDropdown2 && (
        <div className="dropdown-menu mt-2 right-1 p-3 rounded-xl text-black bg-white w-[14%] absolute z-30">
          <ul>
            {/* Add your dropdown 2 list items here */}
            <li>
              <a href="#" onClick={toggleDropdown2}>
                Academics Team
              </a>
            </li>
            <li>
              <a href="#" onClick={toggleDropdown2}>
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
