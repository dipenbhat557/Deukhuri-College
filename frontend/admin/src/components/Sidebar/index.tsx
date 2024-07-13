import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { useRecoilState } from "recoil";
import { currUser } from "../../pages/store";
import { MdSpaceDashboard } from "react-icons/md";
import { SiStudyverse } from "react-icons/si";
import { FaBlog, FaSignOutAlt } from "react-icons/fa";

import { FcRules } from "react-icons/fc";
import { RiTeamFill } from "react-icons/ri";
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
          <img
            src={logo}
            className="object-contain h-[10%] w-[40%]"
            alt="Logo"
          />
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
              <li>
                <NavLink
                  to="/rules"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("Rules") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FcRules className="text-2xl" />
                  Rules
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/advertisements"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("Advertisement") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FcRules className="text-2xl" />
                  Advertisements
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/courses"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("Course") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <SiStudyverse className="text-2xl" />
                  Courses
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
                  to="/events"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("events") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <RiTeamFill className="text-2xl" />
                  Events
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/faculties"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("faculties") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <RiTeamFill className="text-2xl" />
                  Faculties
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/messages"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("messages") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <RiTeamFill className="text-2xl" />
                  Messages
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/notices"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("notices") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <RiTeamFill className="text-2xl" />
                  Notices
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/publications"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("publications") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <RiTeamFill className="text-2xl" />
                  Publications
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/results"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("results") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <RiTeamFill className="text-2xl" />
                  Results
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/statutes"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("statutes") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <RiTeamFill className="text-2xl" />
                  Statutes
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/subscribed"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("subscribed") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <RiTeamFill className="text-2xl" />
                  Subscribed Emails
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/syllabus"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("syllabus") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <RiTeamFill className="text-2xl" />
                  Syllabuses
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              OTHERS
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
      </div>
    </aside>
  );
};

export default Sidebar;
