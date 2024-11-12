import React, { useState } from "react";

import Prompt from "./Prompt";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useAuth } from "../../AuthContext/AuthContext";

const AddAccount = ({ isVisible, onClose, account_type, departments }) => {
  if (!isVisible) return null;
  
  const [showPrompt, setShowPrompt] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [station, setStation] = useState("");
  const [stationAddress, setStationAddress] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPasswordConfirm] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] = useState(false);
  const [incompleteInput, setIncompleteInput] = useState(false);
  const { department_admin_registration } = useAuth()
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  const togglePasswordConfirmVisibility = () => {
    setIsPasswordConfirmVisible((prev) => !prev);
  };

  const handlePromtClick = () => {
    setShowPrompt(true);
  };

  const handleLeave = () => {
    setShowPrompt(false);
    onClose(); // Close the AddAccount modal
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (
      !username ||
      !email ||
      !phoneNumber ||
      !department ||
      !station ||
      !stationAddress ||
      !password ||
      !password_confirm
    ) {
      setIncompleteInput(true);
      setTimeout(() => {
        setIncompleteInput(false);
      }, 3000);
      return;
    }
    
    try {
      const res = await department_admin_registration(username, email, phoneNumber, department, station, stationAddress, password, password_confirm);
      if(res){
        alert("Department Registration Success!")
        onClose();
        return;
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert(`Registration failed: ${error.message || 'Unknown error'}`);
    }
    
    // Optionally reset form after submission
    console.log({
      username,
      email,
      phoneNumber,
      department,
      station,
      stationAddress,
      password,
      password_confirm,
    });
  };
  

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[100svh] items-center justify-center bg-black/50 flex z-30 font-figtree">
        <div
          className="w-full min-h-[100svh] max-h-[100svh] py-12 px-4 overflow-auto flex justify-center items-start"
          id="container"
          onClick={(e) => {
            if (e.target.id === "container") {
              handlePromtClick();
            }
          }}
        >
          <div className="relative w-3/4 md:w-1/2 lg:w-1/3 bg-second flex flex-col items-center justify-center p-8 md:p-10 rounded-xl shadow-xl overflow-hidden">
            {/* bg squares */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 -top-24 -left-24"></div>
              <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 top-2/3 left-0"></div>
              <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 top-0 left-1/3"></div>
              <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 -top-40 -right-10"></div>
              <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 top-96 left-2/3"></div>
            </div>
            <div className="relative w-full flex items-center justify-center z-20">
              <p className="text-md text-main uppercase font-extrabold">
                Add New Account
              </p>
            </div>
            <div className="w-full flex flex-col justify-center items-start gap-4 z-20">
              <div className="w-full ">
                <form onSubmit={handleSubmit}>
                  <div className="w-full flex flex-col mt-4">
                  <div className="w-full flex flex-col items-center justify-center">
                      <div className="py-2 px-1 flex flex-row items-center justify-start w-full">
                        <p className="text-xs font-semibold">Username</p>
                        <p className="text-xs font-semibold text-red-700">*</p>
                      </div>
                      <div className="px-4 py-3 bg-white w-full flex items-center justify-center border border-main rounded-md">
                        <textarea
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          rows={1}
                          className="outline-none bg-white w-full resize-none text-xs font-normal overflow-hidden"
                          placeholder="Enter Username"
                        ></textarea>
                      </div>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center">
                      <div className="py-2 px-1 flex flex-row items-center justify-start w-full">
                        <p className="text-xs font-semibold ">Email Address</p>
                        <p className="text-xs font-semibold text-red-700">*</p>
                      </div>
                      <div className="px-4 py-3 bg-white w-full flex items-center justify-center border border-main rounded-md">
                        <textarea
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          rows={1}
                          className="outline-none bg-white w-full resize-none text-xs font-normal overflow-hidden"
                          placeholder="Enter Email Address"
                        ></textarea>
                      </div>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center">
                      <div className="py-2 px-1 flex flex-row items-center justify-start w-full">
                        <p className="text-xs font-semibold ">Phone Number</p>
                        <p className="text-xs font-semibold text-red-700">*</p>
                      </div>
                      <div className="px-4 py-3 bg-white w-full flex items-center justify-center border border-main rounded-md">
                        <textarea
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          rows={1}
                          className="outline-none bg-white w-full resize-none text-xs font-normal overflow-hidden"
                          placeholder="Enter Phone Number"
                        ></textarea>
                      </div>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center">
                      <div className="flex justify-start items-center w-full py-2">
                        <p className="text-xs font-semibold ">Department</p>
                        <p className="text-xs font-semibold text-red-700">*</p>
                      </div>
                      <div className="px-4 py-3 bg-white w-full flex items-center justify-center border border-main rounded-md">
                      <select
                            value={department} 
                            onChange={(e) => setDepartment(e.target.value)}
                            className="outline-none bg-white w-full text-xs font-normal "
                          >
                            <option value="" disabled>
                              Select a Department
                            </option>
                            {departments.map((dep) => (
                              <option key={dep.id} value={dep.id}>
                                {dep.name}
                              </option>
                            ))}
                          </select>


                      </div>
                    </div>
                    {/* only for new department accounts */}
                    <div className="w-full flex flex-col items-center justify-center">
                      <div className="py-2 px-1 flex flex-row items-center justify-start w-full">
                        <p className="text-xs font-semibold ">Station</p>
                        <p className="text-xs font-semibold text-red-700">*</p>
                      </div>
                      <div className="px-4 py-3 bg-white w-full flex items-center justify-center border border-main rounded-md">
                        <textarea
                          value={station}
                          onChange={(e) => setStation(e.target.value)}
                          rows={1}
                          className="outline-none bg-white w-full resize-none text-xs font-normal overflow-hidden"
                          placeholder="Enter Station"
                        ></textarea>
                      </div>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center">
                      <div className="flex justify-start items-center w-full py-2">
                        <p className="text-xs font-semibold ">
                          Station Address
                        </p>
                        <p className="text-xs font-semibold text-red-700">*</p>
                      </div>
                      <div className="px-4 py-3 bg-white w-full flex items-center justify-center  border border-main rounded-md">
                        <textarea
                          value={stationAddress}
                          onChange={(e) => setStationAddress(e.target.value)}
                          rows={1}
                          className="outline-none bg-white w-full resize-none text-xs font-normal overflow-hidden"
                          placeholder="Enter Station Address"
                        ></textarea>
                      </div>
                    </div>
                    {/* end of only for new department accounts */}
                    {/* only for new employee accounts */}
                    {account_type === 'superadmin' ? null : <div className="w-full flex flex-col items-center justify-center">
                      <div className="flex justify-start items-center w-full py-2">
                        <p className="text-xs font-semibold ">Home Address</p>
                        <p className="text-xs font-semibold text-red-700">*</p>
                      </div>
                      <div className="px-4 py-3 bg-white w-full flex items-center justify-center  border border-main rounded-md">
                        <textarea
                          value={homeAddress}
                          onChange={(e) => setHomeAddress(e.target.value)}
                          rows={1}
                          className="outline-none bg-white w-full resize-none text-xs font-normal overflow-hidden"
                          placeholder="Enter Home Address"
                        ></textarea>
                      </div>
                    </div>}
                    {/* end of only for new employee accounts */}
                    <div className="w-full flex flex-col items-center justify-center">
                      <div className="flex justify-start items-center w-full py-2">
                        <p className="text-xs font-semibold ">Password</p>
                        <p className="text-xs font-semibold text-red-700">*</p>
                      </div>
                      <div className="px-4 py-3 bg-white w-full flex items-center justify-center border border-main rounded-md">
                        <input
                          type={isPasswordVisible ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="outline-none bg-white w-full resize-none text-xs font-normal overflow-hidden"
                          placeholder="Enter Password"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                        >
                          {isPasswordVisible ? (
                            <LuEyeOff className="text-md text-main" />
                          ) : (
                            <LuEye className="text-md text-main" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center">
                      <div className="flex justify-start items-center w-full py-2">
                        <p className="text-xs font-semibold ">Confirm Password</p>
                        <p className="text-xs font-semibold text-red-700">*</p>
                      </div>
                      <div className="px-4 py-3 bg-white w-full flex items-center justify-center border border-main rounded-md">
                        <input
                          type={isPasswordVisible ? "text" : "password"}
                          value={password_confirm}
                          onChange={(e) => setPasswordConfirm(e.target.value)}
                          className="outline-none bg-white w-full resize-none text-xs font-normal overflow-hidden"
                          placeholder="Enter Password"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordConfirmVisibility}
                        >
                          {isPasswordConfirmVisible ? (
                            <LuEyeOff className="text-md text-main" />
                          ) : (
                            <LuEye className="text-md text-main" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-start mt-2 w-1/2">
                      {incompleteInput === true ? (
                        <p className="text-xs font-semibold text-red-700 animate-shake line-clamp-1">
                          Fill the Required Fields!
                        </p>
                      ) : null}
                    </div>
                    <div className="w-full flex flex-row gap-4 items-center justify-end mt-5">
                      <button className="py-3 px-4 border border-accent bg-main text-white rounded-lg text-xs font-bold hover:scale-105 ease-in-out duration-500 truncate">
                        CREATE
                      </button>
                      <button
                        className="py-3 px-4 border border-main bg-white text-main rounded-lg text-xs font-bold hover:scale-105 ease-in-out duration-500 truncate"
                        onClick={handlePromtClick}
                      >
                        CANCEL
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Prompt
        isVisible={showPrompt}
        onClose={() => setShowPrompt(false)}
        onLeave={handleLeave}
      />
    </>
  );
};

export default AddAccount;
