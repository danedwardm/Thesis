import React, { useState } from "react";

import Data from "../../JSON/reports.json";
import Navbar from "../../Components/NavBar";
import ReviewReport from "../../Components/Modals/ReviewReport";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Reports = () => {
  const [showReport, setShowReport] = useState(false);
  const [name, setName] = useState("");
  const [reportType, setReportType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [attachment, setAttachment] = useState(null); // Assuming attachment might be a file
  const [upvote, setUpvote] = useState(0);
  const [downvote, setDownvote] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [proof, setProof] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // Calculate total pages
  const totalItems = Data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Create an array of page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Handle page navigation
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Get current page data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = Data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="relative bg-second h-[100vh] w-[100vw] overflow-hidden">
        {/* bg square */}
        <div className="absolute inset-0 z-10">
          <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 -top-24 -left-24"></div>
          <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 top-2/3 left-0"></div>
          <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 top-0 left-1/3"></div>
          <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 -top-40 -right-10"></div>
          <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 top-96 left-2/3"></div>
        </div>

        {/* content */}
        <div className="relative h-[100vh] w-[100vw] flex flex-col items-center z-30 overflow-auto">
          <Navbar />
          <div className="flex pt-5 mt-[21vh] mb-[5vh]">
            <div className="bg-white border-2 border-main flex flex-col rounded-lg antialiased min-h-[70vh] w-full mx-10">
              {/* header and filter button */}
              <div className="flex flex-row justify-between bg-main">
                <div className="flex justify-center items-center py-3 px-8">
                  <p className="text-white font-semibold text-sm">reports</p>
                </div>
                <div>
                  <button className="bg-white text-main font-bold text-sm py-3 px-6 border border-b-main rounded-t-lg hover:bg-textSecond ease-in-out duration-500">
                    FILTER
                  </button>
                </div>
              </div>
              {/* table header*/}
              <div className="px-5 py-5 h-full">
                <table className="w-full table-fixed">
                  <thead className="text-xs font-bold text-gray-500">
                    <tr className="border-b">
                      <th scope="col" className="text-start p-3 truncate">
                        User
                      </th>
                      <th scope="col" className="text-start p-3 truncate">
                        Report Type
                      </th>
                      <th scope="col" className="text-start p-3 truncate">
                        Description
                      </th>
                      <th scope="col" className="text-start p-3 truncate">
                        Location
                      </th>
                      <th scope="col" className="text-start p-3 truncate">
                        Assigned To
                      </th>
                      <th scope="col" className="text-center p-3 truncate">
                        Update Date
                      </th>
                      <th scope="col" className="text-center p-3 truncate">
                        Status
                      </th>
                      <th scope="col" className="text-center p-3 truncate">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((data, index) => (
                      <tr
                        className="text-xs font-normal even:bg-square hover:bg-[#f6edff] ease-in-out duration-500 cursor-pointer border-b"
                        key={index.id}
                      >
                        <th
                          scope="row"
                          className="text-[#24693c] text-start p-4"
                        >
                          <p className="w-full truncate">{data.name}</p>
                        </th>
                        <td className="p-4 font-semibold uppercase" scope="row">
                          <p className="w-full line-clamp-2">
                            {data.report_type}
                          </p>
                        </td>
                        <td className="p-4">
                          <p className="w-full line-clamp-2">
                            {data.description}
                          </p>
                        </td>
                        <td className="p-4">
                          <p className="w-full line-clamp-2">{data.location}</p>
                        </td>
                        <td className="p-4">
                          <p className="w-full line-clamp-2">
                            {data.assigned_to
                              ? data.assigned_to
                              : "Not Assigned"}
                          </p>
                        </td>
                        <td className="p-4 text-center">
                          <p className="w-full truncate">{data.date}</p>
                        </td>
                        <td className="p-4 text-center font-semibold uppercase">
                          {data.status === "assigned" ? (
                            <p className=" w-full font-bold truncate text-[#a10b00]">
                              {data.status}
                            </p>
                          ) : data.status === "ongoing" ? (
                            <p className=" w-full truncate font-bold text-[#007a3f]">
                              {data.status}
                            </p>
                          ) : (
                            <p className="w-full truncate font-bold text-[#363636]">
                              {data.status}
                            </p>
                          )}
                        </td>
                        <td className="w-full p-4 text-center">
                          <button
                            className="bg-main text-white py-2 px-4 font-semibold rounded-md hover:bg-textSecond hover:scale-105 ease-in-out duration-500"
                            onClick={() => {
                              setShowReport(true);
                              setName(data.name);
                              setLocation(data.location);
                              setReportType(data.report_type);
                              setDescription(data.description);
                              setDate(data.date);
                              setStatus(data.status);
                              setAssignedTo(data.assigned_to);
                              setAttachment(data.attachment);
                              setUpvote(data.upvote);
                              setDownvote(data.downvote);
                              setFeedback(data.feedback);
                              setProof(data.proof);
                            }}
                          >
                            REVIEW
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* pagination  */}
              {totalPages > 1 && (
                <div className="flex flex-row gap-1 items-center justify-end w-full px-12 py-6">
                  <button
                    className="text-black p-1 rounded-md ease-in-out duration-500 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      prevPage();
                    }}
                    disabled={currentPage === 1}
                  >
                    <FaAngleLeft className="text-xs text-main" />
                  </button>
                  {pageNumbers.map((pageNumber) => (
                    <button
                      key={pageNumber}
                      className={`p-1 ease-in-out duration-500 font-semibold ${
                        pageNumber === currentPage
                          ? "text-md text-main font-bold"
                          : "text-xs text-textSecond font-semibold"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(pageNumber);
                      }}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <button
                    className="text-black p-1 rounded-md ease-in-out duration-500 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      nextPage();
                    }}
                    disabled={currentPage === totalPages}
                  >
                    <FaAngleRight className="text-xs text-main" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ReviewReport
        isVisible={showReport}
        onClose={() => setShowReport(false)}
        userName={name}
        location={location}
        reportType={reportType}
        description={description}
        date={date}
        reportStatus={status}
        assignedTo={assignedTo}
        attachment={attachment}
        upvote={upvote}
        downvote={downvote}
        feedback={feedback}
        proof={proof}
      />
    </>
  );
};

export default Reports;
