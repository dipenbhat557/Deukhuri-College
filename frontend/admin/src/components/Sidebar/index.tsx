import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { useRecoilState } from "recoil";
import { currUser } from "../../pages/store";
import { MdInfo, MdReviews, MdSpaceDashboard, MdTour } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import {
  FaBlog,
  FaHouseUser,
  FaImages,
  FaQuora,
  FaSignOutAlt,
} from "react-icons/fa";
import { RiGalleryFill, RiTeamFill } from "react-icons/ri";
import { PiLinkSimple } from "react-icons/pi";
import { logo } from "../../assets";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const [currentUser, setCurrentUser] = useRecoilState(currUser);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const handleSignOut = () => {
    localStorage.removeItem("currentUser");

    setCurrentUser({
      email: null,
      name: null,
      profile: null,
      phone: null,
      role: null,
    });
    window.location.href = "/signin";
  };

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-2 lg:py-6.5">
        <NavLink to="/" className="flex items-center justify-center ">
          <img src={logo} className="object-contain h-[10%] w-[40%]" alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4  ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              {currentUser?.role === "admin" && (
                <li>
                  <NavLink
                    to="/dashboard"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes("dashboard") &&
                      "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    <MdSpaceDashboard className="text-2xl" />
                    Dashboard
                  </NavLink>
                </li>
              )}

              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Profile --> */}

              {/* <!-- Menu Item Profile --> */}

              {/* <!-- Menu Item Business Section --> */}
              <li>
                <NavLink
                  to="/our-info"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("Our Info") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <MdInfo className="text-2xl" />
                  Our Info
                </NavLink>
              </li>
              {/* <!-- Menu Item Business Section --> */}

              {/* <!-- Menu Item Customer Review --> */}

              {/* <li>
                <NavLink
                  to="/customer-review"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('Review') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  Customers Review
                </NavLink>
              </li> */}
              {/* <!-- Menu Item Customer Review --> */}

              {/* <!-- Menu Item Message from Md --> */}

              <li>
                <NavLink
                  to="/message-from-md"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("Message") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <AiFillMessage className="text-2xl" />
                  Message From MD
                </NavLink>
              </li>

              {/* <!-- Menu Item message from md --> */}
              {/* <!-- Menu Item FAQ --> */}

              <li>
                <NavLink
                  to="/faq"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("FAQ") && "bg - graydark dark:bg-meta-4"
                  }`}
                >
                  <FaQuora className="text-2xl" />
                  FAQ's
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/tour"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("tour") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <MdTour className="text-2xl" />
                  Tour
                </NavLink>
              </li>
              {/* <!-- Menu Item Settings --> */}

              <li>
                <NavLink
                  to="/gallery"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("gallery") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <RiGalleryFill className="text-2xl" />
                  Gallery
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/glimpses"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("glimpses") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FaImages className="text-2xl" />
                  Glimpses
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blogs"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("blogs") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FaBlog className="text-2xl" />
                  Blogs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/links"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("links") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <PiLinkSimple className="text-2xl" />
                  Social Links
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/reviews"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("reviews") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <MdReviews className="text-2xl" />
                  Customer Reviews
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/team"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("team") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <RiTeamFill className="text-2xl" />
                  Our Team
                </NavLink>
              </li>
              {currentUser?.role === "admin" && (
                <li>
                  <NavLink
                    to="/users"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes("users") && "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    <FaHouseUser className="text-2xl" />
                    Users
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              OTHERS /Logout
            </h3>

            <li>
              <NavLink
                to="/signin"
                onClick={handleSignOut}
                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                  pathname.includes("Message") && "bg-graydark dark:bg-meta-4"
                }`}
              >
                <FaSignOutAlt className="text-2xl" />
                Signout
              </NavLink>
            </li>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
