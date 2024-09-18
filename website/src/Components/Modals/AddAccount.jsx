import React, { useState } from "react";

import Prompt from "./Prompt";

const AddAccount = ({ isVisible, onClose }) => {
  if (!isVisible) return null;
  const [showPrompt, setShowPrompt] = useState(false);

  const handlePromtClick = () => {
    setShowPrompt(true);
  };

  const handleLeave = () => {
    setShowPrompt(false);
    onClose(); // Close the AddAccount modal
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
              <div className="w-full flex flex-col mt-4">
                <div className="w-full flex flex-col items-center justify-center">
                  <div className="py-2 px-1 flex flex-row items-center justify-start w-full">
                    <p className="text-xs font-semibold">Name</p>
                  </div>
                  <div className="px-4 py-3 bg-white w-full flex items-center justify-center border border-main rounded-md">
                    <textarea
                      name=""
                      id=""
                      rows={1}
                      className="outline-none bg-white w-full resize-none text-xs font-normal overflow-hidden"
                      placeholder="Enter Name"
                      // value={description}
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                  <div className="py-2 px-1 flex flex-row items-center justify-start w-full">
                    <p className="text-xs font-semibold ">Email Address</p>
                  </div>
                  <div className="px-4 py-3 bg-white w-full flex items-center justify-center border border-main rounded-md">
                    <textarea
                      name=""
                      id=""
                      rows={1}
                      className="outline-none bg-white w-full resize-none text-xs font-normal overflow-hidden"
                      placeholder="Enter Email Address"
                      // value={description}
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                  <div className="py-2 px-1 flex flex-row items-center justify-start w-full">
                    <p className="text-xs font-semibold ">Phone Number</p>
                  </div>
                  <div className="px-4 py-3 bg-white w-full flex items-center justify-center border border-main rounded-md">
                    <textarea
                      name=""
                      id=""
                      rows={1}
                      className="outline-none bg-white w-full resize-none text-xs font-normal overflow-hidden"
                      placeholder="Enter Phone Number"
                      // value={description}
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                  <div className="flex justify-start items-center w-full py-2">
                    <p className="text-xs font-semibold ">Department</p>
                  </div>
                  <div className="px-4 py-3 bg-white w-full flex items-center justify-center border border-main rounded-md">
                    <textarea
                      name=""
                      id=""
                      rows={1}
                      className="outline-none bg-white w-full resize-none text-xs font-normal overflow-hidden"
                      placeholder="Enter Department"
                      // value={description}
                    ></textarea>
                  </div>
                </div>
                {/* only for new department accounts */}
                <div className="w-full flex flex-col items-center justify-center">
                  <div className="py-2 px-1 flex flex-row items-center justify-start w-full">
                    <p className="text-xs font-semibold ">Station</p>
                  </div>
                  <div className="px-4 py-3 bg-white w-full flex items-center justify-center border border-main rounded-md">
                    <textarea
                      name=""
                      id=""
                      rows={1}
                      className="outline-none bg-white w-full resize-none text-xs font-normal overflow-hidden"
                      placeholder="Enter Station"
                      // value={description}
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                  <div className="flex justify-start items-center w-full py-2">
                    <p className="text-xs font-semibold ">Station Address</p>
                  </div>
                  <div className="px-4 py-3 bg-white w-full flex items-center justify-center  border border-main rounded-md">
                    <textarea
                      name=""
                      id=""
                      rows={1}
                      className="outline-none bg-white w-full resize-none text-xs font-normal overflow-hidden"
                      placeholder="Enter Station Address"
                      // value={description}
                    ></textarea>
                  </div>
                </div>
                {/* end of only for new department accounts */}
                {/* only for new employee accounts */}
                <div className="w-full flex flex-col items-center justify-center">
                  <div className="flex justify-start items-center w-full py-2">
                    <p className="text-xs font-semibold ">Home Address</p>
                  </div>
                  <div className="px-4 py-3 bg-white w-full flex items-center justify-center  border border-main rounded-md">
                    <textarea
                      name=""
                      id=""
                      rows={1}
                      className="outline-none bg-white w-full resize-none text-xs font-normal overflow-hidden"
                      placeholder="Enter Home Address"
                      // value={description}
                    ></textarea>
                  </div>
                </div>
                {/* end of only for new employee accounts */}
                <div className="w-full flex flex-col items-center justify-center">
                  <div className="flex justify-start items-center w-full py-2">
                    <p className="text-xs font-semibold ">Password</p>
                  </div>
                  <div className="px-4 py-3 bg-white w-full flex items-center justify-center border border-main rounded-md">
                    <input
                      type="password"
                      className="outline-none bg-white w-full resize-none text-xs font-normal overflow-hidden"
                      placeholder="Enter Password"
                      // value={description}
                    />
                  </div>
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
