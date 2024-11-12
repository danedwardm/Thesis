import React from "react";

import logo from "../../assets/thesisLogo.png";
import Navbar from "../../Components/NavBar";
import NavText from "../../Components/NavText";
import PieChart from "../../Chart/PieChart";
import ReportCategoryChart from "../../Chart/ReportCategoryChart";
import ReportTrends from "../../Chart/ReportTrends";

const Analysis = () => {
  return (
    <>
      <div className="relative bg-second h-[100vh] w-[100vw] overflow-hidden">
        <div className="absolute inset-0 z-10">
          <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 -top-24 -left-24 z-10"></div>
          <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 top-2/3 left-0 z-10"></div>
          <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 top-0 left-1/3 z-10"></div>
          <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 -top-40 -right-10 z-10"></div>
          <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 top-96 left-2/3 z-10"></div>
        </div>
        <div className="relative h-[100vh] w-[100vw] flex flex-col items-center z-30 overflow-auto">
          <Navbar />
          <NavText />
          <div className="flex flex-row items-center pt-5 mt-[30vh] md:mt-[30vh] lg:mt-[20vh]">
            <PieChart />
            <ReportCategoryChart />
            <ReportTrends />
          </div>
        </div>
      </div>
    </>
  );
};

export default Analysis;
