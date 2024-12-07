import React, { useState, useEffect } from "react";

import Prompt from "./Prompt";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useAuth } from "../../AuthContext/AuthContext";
import MapPicker from "./MapPicker";

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
  const [errors, setErrors] = useState("");
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
    useState(false);
  const [incompleteInput, setIncompleteInput] = useState(false);
  const { department_admin_registration, worker_registration, user } =
    useAuth();
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

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (account_type === "department_admin") {
      const station = localStorage.getItem("station");
      const station_address = localStorage.getItem("station_address");
      const department = localStorage.getItem("department");
      setDepartment(department);
      setStation(station);
      setStationAddress(station_address);
    }
    console.log("User department:", department);
  }, [user, account_type]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (
      !username ||
      !email ||
      !phoneNumber ||
      !station ||
      !stationAddress ||
      !password ||
      !password_confirm
    ) {
      setIncompleteInput(true);
      console.log(
        "Fields: ",
        username,
        email,
        phoneNumber,
        station,
        stationAddress,
        password,
        password_confirm
      );
      setTimeout(() => {
        setIncompleteInput(false);
      }, 3000);
      return;
    }
    if (!isValidEmail(email)) {
      setErrors("Please enter a valid email address.");
      setTimeout(() => {
        setErrors("");
      }, 3000);
      return;
    }
    if (password !== password_confirm) {
      setErrors("Passwords do not match.");
      {
        setTimeout(() => {
          setErrors("");
        }, 3000);
        return;
      }
    }

    try {
      let res;

      // Check if the user is a superadmin or department admin
      if (account_type === "superadmin") {
        // Call department_admin_registration for superadmin
        res = await department_admin_registration(
          username,
          email,
          phoneNumber,
          department,
          station,
          stationAddress,
          password,
          password_confirm
        );
      } else if (account_type === "department_admin") {
        // Call worker_registration for department_admin
        res = await worker_registration(
          username,
          email,
          phoneNumber,
          department,
          station,
          stationAddress,
          password,
          password_confirm,
        );
      } else {
        // Handle any other account types if necessary
        alert("Invalid account type for registration.");
        return;
      }

      if (res) {
        const successMessage =
          account_type === "superadmin"
            ? "Department Registration Success!"
            : "Verification link has been sent to the email address";
        alert(successMessage);
        onClose(); // Close the modal or form
        return;
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert(`Registration failed: ${error.message || "Unknown error"}`);
    }

    // Optionally reset form after submission (if needed)
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
  const handleStationAddressChange = (newLocation) => {
    setStationAddress(`${newLocation.lat}, ${newLocation.lng}`);
    setSelectedLocation(newLocation);
    setShowMapPicker(false);
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
                    {account_type !== "department_admin" && (
                      <>
                        <div className="w-full flex flex-col items-center justify-center">
                          <div className="flex justify-start items-center w-full py-2">
                            <p className="text-xs font-semibold ">Department</p>
                            <p className="text-xs font-semibold text-red-700">
                              *
                            </p>
                          </div>
                          <div className="px-4 py-3 bg-white w-full flex items-center justify-center border border-main rounded-md">
                            <select
                              value={department}
                              onChange={(e) => setDepartment(e.target.value)}
                              className="outline-none bg-white w-full text-xs font-normal "
                              disabled={account_type === "department_admin"}
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
                        <div className="w-full flex flex-col items-center justify-center">
                          <div className="py-2 px-1 flex flex-row items-center justify-start w-full">
                            <p className="text-xs font-semibold ">Station</p>
                            <p className="text-xs font-semibold text-red-700">
                              *
                            </p>
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
                            <p className="text-xs font-semibold">Station Address</p>
                            <p className="text-xs font-semibold text-red-700">*</p>
                          </div>
                          <div className="relative px-4 py-3 bg-white w-full flex items-center justify-center border border-main rounded-md">
                            <textarea
                              value={stationAddress}
                              onChange={(e) => setStationAddress(e.target.value)}
                              rows={1}
                              className="outline-none bg-white w-full resize-none text-xs font-normal overflow-hidden pr-10"
                              placeholder="Enter Station Address"
                            />
                            <div
                              onClick={() => setShowMapPicker(true)} // Opens the map picker when clicked
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 2.57 1.58 5.26 3.69 7.88L12 22l3.31-5.12C17.42 14.26 19 11.57 19 9c0-3.87-3.13-7-7-7zm0 10c-1.39 0-2.5-1.11-2.5-2.5S10.61 7 12 7s2.5 1.11 2.5 2.5S13.39 12 12 12z" />
                              </svg>
                            </div>
                          </div>
                          {/* Show Map Picker if active */}
                          <MapPicker
                            isVisible={showMapPicker}
                            onClose={() => setShowMapPicker(false)}
                            onSelectLocation={handleStationAddressChange}
                          />
                        </div>
                      </>
                    )}
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
                        <p className="text-xs font-semibold ">
                          Confirm Password
                        </p>
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
                    <div className="flex items-center justify-start mt-2 flex-col">
                      {incompleteInput === true ? (
                        <p className="text-xs text-red-800 font-semibold flex text-left w-full mt-2">
                          Fill the Required Fields!
                        </p>
                      ) : null}

                      {errors ? (
                        <p className="text-xs text-red-800 font-semibold flex text-left w-full mt-2">
                          {errors}
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
