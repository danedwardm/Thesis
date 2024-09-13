import React from "react";
import logo from "../assets/thesisLogo.png"; 

import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="relative bg-main h-[100vh] w-[100vw] overflow-hidden">
        <div>
            <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 -top-24 -left-24 z-10"></div>
            <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 top-2/3 left-0 z-10"></div>
            <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 top-0 left-1/3 z-10"></div>
            <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 -top-40 -right-10 z-10"></div>
            <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 top-96 left-2/3 z-10"></div>
        </div>
        <div className="relative h-[100vh] w-[100vw] flex flex-col justify-center items-center z-20">
            <img src={logo} alt="logo" className="h-[35vh] w-[35vh] mb-7" />
            <div className="text-5xl font-bold text-second mb-2">CRISP</div>
            <div className="text-xl font-semibold text-second">(Community Reporting Interface for Safety and Prevention)</div>
            <div className="text-xl font-semibold text-second mb-2">A Smarter Way to Protect Your Neighborhood</div>
            <Link to={"/login"}>
              <button className="bg-main border-accent border text-second py-2 w-[50vh] rounded-[10px] font-semibold text-md mt-6">Login </button>
            </Link>
        </div>
    </div>
  );
};

export default Landing;