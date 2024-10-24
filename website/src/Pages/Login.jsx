import React, { useState } from "react";
import logo from "../assets/thesisLogo.png";
import { Link } from "react-router-dom";
import { LuUser, LuKey, LuEye, LuEyeOff } from "react-icons/lu";
import axiosInstance from '../axios-instance'; // Ensure this imports your configured axios instance
import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { onLogin, authenticated } = useAuth()
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
      try {
        // NOTE!!!!!!! NOTE!!!!!! BAGO MAG LOGIN MAKE SURE NA superadmin yung ROLE 
        const res = await onLogin(email, password)
        if(res){
          navigate('/dashboard')
        }
      } catch (error) {
        console.log(error.message)
      }
  }

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
      {/* page */}
      <div className="relative h-[100vh] w-[100vw] flex flex-col md:flex-row gap-4 md:gap-6 justify-items-center items-center z-20 overflow-auto">
        {/* logo and title */}
        <div className="relative flex flex-col justify-center items-center w-full h-auto">
          <img
            src={logo}
            alt="logo"
            className="md:h-[35vh] md:w-[35vh] h-[20vh] w-[20vh] md:mt-0 mt-20 mb-7"
          />
          <div className="md:text-5xl text-3xl font-bold text-second mb-2">
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
        <div className="relative w-full h-auto flex flex-col justify-center items-center p-7 md:mt-0 mt-14 md:mb-0 mb-14">
          <div className="bg-second h-auto w-full lg:w-1/2 md:w-auto p-9 rounded-[10px] border border-accent">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col justify-center items-center">
                <div className="md:text-2xl text-lg font-bold text-main uppercase">
                  Welcome Back
                </div>
                <p className="text-xs md:mb-6 mb-4">login to your account</p>
              </div>
              <div className="flex flex-col justify-center items-center w-full h-auto gap-4">
                <div className="w-full flex flex-col gap-2">
                  <p className="text-xs font-semibold px-1">Email</p>
                  <div className="py-3 px-4 bg-[#f6edff] rounded-md flex flex-row w-full gap-3 items-center justify-center">
                    <LuUser className="text-md text-main" />
                    <input
                      type="text"
                      placeholder="enter email"
                      className="text-xs w-full outline-none bg-[#f6edff] truncate"
                      role="presentation"
                      autoComplete="off"
                      onChange={(e) => setEmail(e.target.value)}
                      id="email-input"
                      value={email}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <p className="text-xs font-semibold px-1">Password</p>
                  <div className="py-3 px-4 bg-[#f6edff] rounded-md flex flex-row w-full gap-3 items-center justify-center">
                    <LuKey className="text-md text-main" />
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="enter password"
                      className="text-xs w-full outline-none bg-[#f6edff] truncate"
                      role="presentation"
                      autoComplete="off"
                      onChange={(e) => setPassword(e.target.value)}
                      id="password-input"
                      value={password}
                    />
                    <button type="button" onClick={togglePasswordVisibility}>
                      {isPasswordVisible ? (
                        <LuEyeOff className="text-md text-main" />
                      ) : (
                        <LuEye className="text-md text-main" />
                      )}
                    </button>
                  </div>
                </div>
                {/* Error Message */}
                {errorMessage && (
                  <div className="w-full flex justify-start">
                    <p className="text-xs font-bold text-red-700">
                      {errorMessage}
                    </p>
                  </div>
                )}
                <div className="w-full flex justify-end">
                  <Link
                    to="/forgot-password" // Adjust the path to your forgot password page
                    className="text-main font-bold md:text-sm text-xs"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="w-full flex items-end justify-end pt-4">
                  <button className="text-xs font-semibold text-white bg-main px-6 py-2 rounded-md hover:bg-textSecond ease-in-out duration-700">
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
