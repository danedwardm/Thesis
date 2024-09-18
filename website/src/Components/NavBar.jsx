import React, { useState } from "react";

import Profile from "./Modals/Profile";

import logo from "../assets/thesisLogo.png";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const Links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Reports", path: "/reports" },
    { name: "Analysis", path: "/analysis" },
    { name: "Call Logs", path: "/callLogs" },
    { name: "Accounts", path: "/accounts" },
  ];

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleAddAccount = () => {
    setShowProfile(true);
  };

  return (
    <>
      <div className="fixed w-full px-8 overflow-hidden font-dm z-30">
        <div className="py-4 px-6 bg-main flex justify-between items-center rounded-b-lg">
          <div className="flex justify-center items-center gap-2">
            <img src={logo} alt="/" className="w-[30px]" />
            <p className="hidden md:block font-semibold text-sm uppercase text-second">
              Community Reporting Interface for Safety and Prevention
            </p>
            <p className="block md:hidden font-extrabold text-sm uppercase text-second">
              CRISP
            </p>
          </div>
          {/* menu dropdown */}
          <div className="relative flex gap-2">
            <div
              className="rounded-full bg-second w-[35px] h-[35px] flex items-center justify-center cursor-pointer"
              onClick={toggleDropdown}
            >
              <FaUser className="text-main text-lg" />
            </div>
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg border  w-48">
                <ul className="flex flex-col">
                  <li>
                    <div
                      onClick={handleAddAccount}
                      className="block px-4 py-2 font-bold text-textSecond hover:text-main"
                    >
                      Profile
                    </div>
                    <hr className="h-px px-2 bg-gray-200 border-0 dark:bg-gray-200"></hr>
                  </li>
                  <li>
                    <NavLink
                      to="/"
                      className="block px-4 py-2 font-bold text-textSecond hover:text-main"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        {/* Links */}
        <div>
          <ul className="flex justify-center items-center uppercase">
            {Links.map((link, index) => (
              <li key={index} className="font-bold my-7 ml-12 text-lg">
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? "text-main" : "text-textSecond hover:text-main"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Profile isVisible={showProfile} onClose={() => setShowProfile(false)} />
    </>
  );
};

export default NavBar;
