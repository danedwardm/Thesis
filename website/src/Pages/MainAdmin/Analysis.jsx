import React, { useState } from "react";

import logo from "../../assets/thesisLogo.png";
import Navbar from "./Navigation/NavBar";
import NavText from "./Navigation/NavText";
import PieChart from "../../Chart/PieChart";
import ReportCategoryChart from "../../Chart/ReportCategoryChart";
import ReportTrends from "../../Chart/ReportTrends";
import ReportTimeTrends from "../../Chart/ReportTimeTrends";
import ClusterBar from "../../Chart/ClusterBar";
import axiosInstance from "../../axios-instance";
import ReportByAreas from "../../Chart/ReportByAreas";

const Analysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleGenerateReport = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("api/export-all-reports/", {
        responseType: "blob",
      });
      if (!res) {
        console.log("Error in generating report");
        return;
      }
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.csv");
      document.body.appendChild(link);
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error in generating report", error);
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="relative h-[100vh] w-[100vw] flex flex-col items-center z-30 overflow-auto overflow-x-hidden ">
          <Navbar />
          <NavText />
          <div className="grid grid-cols-1 lg:grid-cols-2 col-span-4 gap-16 justify-center items-center pt-5 mt-[30vh] md:mt-[30vh] lg:mt-[15vh] mb-[15vh]">
            <PieChart />
            <ReportByAreas />
            <ReportTrends />
            <ReportTimeTrends />
          </div>
          <ClusterBar />

          <button
            className="mt-10 px-4 py-2 bg-main text-white rounded"
            onClick={(e) => {
              e.preventDefault();
              handleGenerateReport();
            }}
          >
            {isLoading ? (
              <div role="status">
                <svg
                  className="animate-spin h-8 w-5 text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 50 50"
                  stroke="currentColor"
                >
                  <circle
                    cx="25"
                    cy="25"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="125"
                    strokeDashoffset="50"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              "Generate Report"
            )}
          </button>
          <div className="mb-[15vh]"></div>
        </div>
      </div>
    </>
  );
};

export default Analysis;
