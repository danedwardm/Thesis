import React from "react";
import Navbar from "../../Components/NavBar";
import { FaUser } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoCall } from "react-icons/io5";
import { MdReport } from "react-icons/md";

const Dashboard = () => {
  return (
    <>
      <div className="relative bg-second h-screen w-screen overflow-hidden">
        {/* bg square */}
        <div className="z-10">
          <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 -top-24 -left-24"></div>
          <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 top-2/3 left-0"></div>
          <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 top-0 left-1/3"></div>
          <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 -top-40 -right-10"></div>
          <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 top-96 left-2/3"></div>
        </div>
        {/* content */}
        <div className="relative h-full w-screen flex flex-col items-center z-30 overflow-auto">
          <Navbar />
          <div className="w-full md:mt-[21vh] mt-[30vh] grid md:grid-cols-4 grid-cols-2 md:gap-6 gap-2 px-6">
            {/* num of calls */}
            <div className="col-span-1 m-3 md:px-3 py-5 text-2xl font-bold text-main mb-2 bg-white border border-main rounded-lg flex flex-col md:flex-row md:gap-2 gap-1 justify-between items-center overflow-hidden">
              <div className="lg:flex justify-center items-center ml-3 hidden">
                <div className="flex justify-center items-center rounded-full bg-main w-[55px] h-[55px]">
                  <IoCall className="text-second w-[30px] h-[30px]" />
                </div>
              </div>
              <div className="flex justify-center items-center md:ml-3 w-full">
                <p className="font-bold lg:text-sm text-xs text-center md:text-start uppercase text-main w-full">
                  Daily Calls
                </p>
              </div>
              <div className="flex justify-center items-center gap-2 md:ml-3 w-full">
                <div className="rounded-full text-main md:text-4xl text-xl">
                  11
                </div>
              </div>
            </div>
            {/* active report */}
            <div className="col-span-1 m-3 md:px-3 py-5 text-2xl font-bold text-main mb-2 bg-white border border-main rounded-lg flex flex-col md:flex-row md:gap-2 gap-1 justify-between items-center overflow-hidden">
              <div className="lg:flex justify-center items-center ml-3 hidden">
                <div className="flex justify-center items-center rounded-full bg-main w-[55px] h-[55px]">
                  <MdReport className="text-second w-[30px] h-[30px]" />
                </div>
              </div>
              <div className="flex justify-center items-center md:ml-3 w-full">
                <p className="font-bold lg:text-sm text-xs text-center md:text-start uppercase text-main w-full">
                  Active Reports
                </p>
              </div>
              <div className="flex justify-center items-center gap-2 md:ml-3 w-full">
                <div className="rounded-full text-main md:text-4xl text-xl">
                  11
                </div>
              </div>
            </div>
            {/* num of reports */}
            <div className="col-span-1 m-3 md:px-3 py-5 text-2xl font-bold text-main mb-2 bg-white border border-main rounded-lg flex flex-col md:flex-row md:gap-2 gap-1 justify-between items-center overflow-hidden">
              <div className="lg:flex justify-center items-center ml-3 hidden">
                <div className="flex justify-center items-center rounded-full bg-main w-[55px] h-[55px]">
                  <HiOutlineDocumentReport className="text-second w-[30px] h-[30px]" />
                </div>
              </div>
              <div className="flex justify-center items-center md:ml-3 w-full">
                <p className="font-bold lg:text-sm text-xs text-center md:text-start uppercase text-main w-full">
                  Weekly Reports
                </p>
              </div>
              <div className="flex justify-center items-center gap-2 md:ml-3 w-full">
                <div className="rounded-full text-main md:text-4xl text-xl">
                  11
                </div>
              </div>
            </div>
            {/* num of users */}
            <div className="col-span-1 m-3 md:px-3 py-5 text-2xl font-bold text-main mb-2 bg-white border border-main rounded-lg flex flex-col md:flex-row md:gap-2 gap-1 justify-between items-center overflow-hidden">
              <div className="lg:flex justify-center items-center ml-3 hidden">
                <div className="flex justify-center items-center rounded-full bg-main w-[55px] h-[55px]">
                  <FaUser className="text-second w-[30px] h-[30px]" />
                </div>
              </div>
              <div className="flex justify-center items-center md:ml-3 w-full">
                <p className="font-bold lg:text-sm text-xs text-center md:text-start uppercase text-main w-full">
                  Number of Users
                </p>
              </div>
              <div className="flex justify-center items-center gap-2 md:ml-3 w-full">
                <div className="rounded-full text-main md:text-4xl text-xl">
                  11
                </div>
              </div>
            </div>
          </div>
          {/* filter */}
          <div className="w-full grid grid-cols-2 justify-between items-center md:mt-3 mt-4 px-6">
            <div className="flex flex-col px-3">
              <p className="md:text-xl text-sm font-bold text-main">
                map of reports
              </p>
            </div>
            {/* filter button */}
            <div className="flex flex-col justify-center items-end px-3">
              <button className="flex justify-center items-center rounded-md bg-white border-main border text-xs text-main font-bold md:px-5 md:py-2 px-3 py-1 uppercase hover:bg-textSecond hover:text-accent ease-in-out duration-500">
                Filter
              </button>
            </div>
          </div>
          {/* map */}
          <div className="w-full h-auto bg-black md:mt-5 mt-3 border-2 border-t-main">
            <div className="h-[400px] lg:h-[311px] bg-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1821.6989330449946!2d120.99383760593415!3d14.653352779376187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b686dd24e859%3A0xe442b57504cbf05f!2sUniversity%20of%20Caloocan%20City%20-%20South%20Campus!5e0!3m2!1sen!2sph!4v1730254011557!5m2!1sen!2sph"
                width="100%"
                height="350"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
