import React from "react";

import Navbar from "../../Components/NavBar";

import { FaUser } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoCall } from "react-icons/io5";
import { MdReport } from "react-icons/md";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="relative bg-second h-[100vh] w-[100vw] overflow-hidden">
        {/* bg square */}
        <div className="z-10">
          <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 -top-24 -left-24"></div>
          <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 top-2/3 left-0"></div>
          <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 top-0 left-1/3"></div>
          <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 -top-40 -right-10"></div>
          <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 top-96 left-2/3"></div>
        </div>
        {/* content */}
        <div className="relative h-[100vh] w-[100vw] flex flex-col items-center z-30">
          <Navbar />
          <div className="w-full mt-[21vh] grid grid-cols-4 gap-6 px-6">
            {/* num of calls */}
            <div className="col-span-1 m-3 p-3 text-2xl font-bold text-main mb-2 bg-white border border-main rounded-lg flex flex-row justify-between items-center py-5">
              <div className="flex justify-center items-center gap-2 ml-3">
                <div className="flex justify-center items-center rounded-full bg-main w-[55px] h-[55px]">
                  <IoCall className="text-second w-[30px] h-[30px]" />
                </div>
              </div>
              <div className="flex justify-center items-center gap-2 ml-3">
                <p className="font-bold text-sm uppercase text-main w-[10vw]">
                  Daily Number of Calls
                </p>
              </div>
              <div className="flex justify-center items-center gap-2 ml-3">
                <div className="rounded-full text-main text-4xl">11</div>
              </div>
            </div>
            {/* active report */}
            <div className="col-span-1 m-3 p-3 text-2xl font-bold text-main mb-2 bg-white border border-main rounded-lg flex flex-row justify-between items-center py-5">
              <div className="flex justify-center items-center gap-2 ml-3">
                <div className="flex justify-center items-center rounded-full bg-main w-[55px] h-[55px]">
                  <MdReport className="text-second w-[30px] h-[30px]" />
                </div>
              </div>
              <div className="flex justify-center items-center gap-2 ml-3">
                <p className="font-bold text-sm uppercase text-main w-[10vw]">
                  Active Reports
                </p>
              </div>
              <div className="flex justify-center items-center gap-2 ml-3">
                <div className="rounded-full text-main text-4xl">11</div>
              </div>
            </div>
            {/* num of reports */}
            <div className="col-span-1 m-3 p-3 text-2xl font-bold text-main mb-2 bg-white border border-main rounded-lg flex flex-row justify-between items-center py-5">
              <div className="flex justify-center items-center gap-2 ml-3">
                <div className="flex justify-center items-center rounded-full bg-main w-[55px] h-[55px]">
                  <HiOutlineDocumentReport className="text-second w-[30px] h-[30px]" />
                </div>
              </div>
              <div className="flex justify-center items-center gap-2 ml-3">
                <p className="font-bold text-sm uppercase text-main w-[10vw]">
                  Weekly Number of Reports
                </p>
              </div>
              <div className="flex justify-center items-center gap-2 ml-3">
                <div className="rounded-full text-main text-4xl">11</div>
              </div>
            </div>
            {/* num of users */}
            <div className="col-span-1 m-3 p-3 text-2xl font-bold text-main mb-2 bg-white border border-main rounded-lg flex flex-row justify-between items-center py-5">
              <div className="flex justify-center items-center gap-2 ml-3">
                <div className="flex justify-center items-center rounded-full bg-main w-[55px] h-[55px]">
                  <FaUser className="text-second w-[30px] h-[30px]" />
                </div>
              </div>
              <div className="flex justify-center items-center gap-2 ml-3">
                <p className="font-bold text-sm uppercase text-main w-[10vw]">
                  Number of Users
                </p>
              </div>
              <div className="flex justify-center items-center gap-2 ml-3">
                <div className="rounded-full text-main text-4xl">11</div>
              </div>
            </div>
          </div>
          {/* filter */}
          <div className="w-full grid grid-cols-2 justify-between items-center mt-4 px-6">
            <div className="flex flex-col px-3">
              <p className="text-xl font-bold text-main">map of reports</p>
            </div>
            {/* filter button */}
            <div className="flex flex-col justify-center items-end px-3">
              <button className="flex justify-center items-center rounded-md bg-white border-main border text-xs text-main font-bold px-5 py-2 uppercase">
                Filter
              </button>
            </div>
          </div>
          {/* map */}
          <div className="w-full h-[60vh] bg-white mt-5 border-2 border-t-main">
            Map
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
