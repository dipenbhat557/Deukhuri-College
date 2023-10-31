import { useState } from "react";
import { navLinks } from "../constants";
import {
  AiOutlineMenuUnfold,
  AiOutlineMenuFold,
  AiOutlineSearch,
} from "react-icons/ai";

const Navbar = () => {
  const [active, setActive] = useState("HOME");
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full py-4 z-20 bg-red-900 relative">
      <ul className="list-none sm:flex sm:justify-evenly gap-6 hidden">
        {navLinks.map((link) => (
          <li
            key={link.id}
            className={`text-white text-18px font-semibold cursor-pointer ${
              active === link.title ? "border-b-2 border-white " : ""
            } hover:border-b-2 hover:border-white  transition-all duration-300 `}
            onClick={() => setActive(link.title)}
          >
            <a href={`#${link.id}`}>{link.title}</a>
          </li>
        ))}
      </ul>

      {/* Mobile menu */}
      <div className="sm:hidden flex items-center w-[30%]">
        {toggle ? (
          <AiOutlineMenuUnfold
            className="text-2xl text-white"
            onClick={() => setToggle(!toggle)}
          />
        ) : (
          <AiOutlineMenuFold
            className="text-2xl text-white"
            onClick={() => setToggle(!toggle)}
          />
        )}
        <ul
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-red-900 absolute top-12 right-0 mx-4 my-4 min-w-[140px] z-10 rounded-xl flex flex-col items-end gap-4`}
        >
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-white" : "text-secondary"
              } font-poppins text-[16px] font-medium cursor-pointer`}
              onClick={() => {
                setToggle(!toggle);
                setActive(link.title);
              }}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
