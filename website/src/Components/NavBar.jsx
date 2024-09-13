import React from "react";
import logo from "../assets/thesisLogo.png";

import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const Links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Reports", path: "/reports" },
    { name: "Analysis", path: "/analysis" },
    { name: "Call Logs", path: "/callLogs" },
    { name: "Accounts", path: "/accounts" },
  ];

  return (
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
        <div className="flex gap-2 ">
          <div className="rounded-full bg-second w-[35px] h-[35px]">
            <FaUser className="text-main text-lg m-2" />
          </div>
        </div>
      </div>
      <div>
        <ul className={"flex justify-center items-center uppercase"}>
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
  );
};

export default NavBar;
