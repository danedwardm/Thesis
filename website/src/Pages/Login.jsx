import React from "react";
import logo from "../assets/thesisLogo.png";

import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="relative bg-main h-[100vh] w-[100vw] overflow-hidden">
      {/* background */}
      <div>
        <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 -top-24 -left-24 z-10"></div>
        <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 top-2/3 left-0 z-10"></div>
        <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 top-0 left-1/3 z-10"></div>
        <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 -top-40 -right-10 z-10"></div>
        <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 top-96 left-2/3 z-10"></div>
      </div>
      {/* page*/}
      <div className="relative h-[100vh] w-[100vw] flex flex-col md:flex-row gap-4 md:gap-6 justify-items-center items-center z-20 overflow-auto">
        {/* logo and title */}
        <div className="relative flex flex-col justify-center items-center w-full h-auto">
          <img src={logo} alt="logo" className="h-[35vh] w-[35vh] mb-7" />
          <div className="lg:text-6xl text-5xl font-bold text-second mb-2">
            CRISP
          </div>
          <div className="w-full flex lg:text-xl text-xs font-semibold px-5 justify-center text-center items-center text-second">
            (Community Reporting Interface for Safety and Prevention)
          </div>
          <div className="w-full flex lg:text-xl text-xs font-semibold px-5 justify-center items-center text-center text-second mb-2">
            A Smarter Way to Protect Your Neighborhood
          </div>
        </div>
        {/* login form */}
        <div className="relative flex flex-col justify-center items-center p-4 w-full h-auto">
          <div className="bg-second h-auto w-[50vh] md:w-auto p-9 rounded-[20px] border border-accent">
            <div className="flex flex-col justify-center items-center">
              <div className="md:text-4xl text-2xl font-bold text-main md:mb-10 mb-8">
                Welcome Back
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full h-auto">
              <input
                type="text"
                placeholder="Username"
                className="bg-white border-main border rounded-[10px] py-2 px-4 w-auto text-main font-semibold text-md mb-4"
              />
              <input
                type="password"
                placeholder="Password"
                className="bg-white border-main border rounded-[10px] py-2 px-4 w-auto text-main font-semibold text-md mb-4"
              />
              <div className="w-full flex justify-end">
                <a href="#" className="text-main font-bold md:text-sm text-xs">
                  Forgot Password?
                </a>
              </div>
              <Link to={"/dashboard"}>
                <button className="bg-main border-accent border text-second py-2 w-[30vh] rounded-[10px] font-semibold text-md mt-4">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;