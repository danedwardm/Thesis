import React, { useEffect, useState } from "react";

import Data from "../../JSON/reports.json";
import Navbar from "../../Components/NavBar";
import ReviewReport from "../../Components/Modals/ReviewReport";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { useAuth } from "../../AuthContext/AuthContext";

const Reports = () => {
  const { reports } = useAuth();
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
  const [filterOpen, setFilterOpen] = useState(false); // State for dropdown filter
  const [selectedReportType, setSelectedReportType] = useState(""); // Selected report type filter
  const [selectedStatus, setSelectedStatus] = useState(""); // Selected status filter
  const [newReports, setNewReports] = useState([]);

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

  // Filter data based on selected filters
  const filteredData = Data.filter((item) => {
    return (
      (selectedReportType === "" ||
        item.type_of_report === selectedReportType) &&
      (selectedStatus === "" || item.status === selectedStatus)
    );
  });
  // useEffect(() => {
  //   const currentData = reports.slice(indexOfFirstItem, indexOfLastItem);
  //   console.log(currentData)
  // }, [])
  const currentData = reports.slice(indexOfFirstItem, indexOfLastItem);

  // Get unique report types and statuses for dropdown options
  const reportTypes = [...new Set(Data.map((item) => item.type_of_report))];
  const statuses = [...new Set(Data.map((item) => item.status))];

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
          <div className="flex pt-5 md:mt-[21vh] mt-[30vh] mb-[5vh]">
            <div className="bg-white border-2 border-main flex flex-col rounded-lg antialiased min-h-[70vh] w-full mx-10">
              {/* header and filter button */}
              <div className="flex flex-row justify-between bg-main">
                <div className="flex justify-center items-center py-3 px-8">
                  <p className="text-white font-semibold text-sm">reports</p>
                </div>
                {/* filter */}
                <div>
                  <button
                    className={`font-bold text-sm py-3 px-6 border border-b-main rounded-t-lg hover:bg-main hover:text-accent ease-in-out duration-500 text-center cursor-pointer h-full ${
                      filterOpen ? "bg-main text-white" : "bg-white text-main"
                    }`}
                    onClick={() => setFilterOpen(!filterOpen)}
                  >
                    FILTER
                  </button>
                  {filterOpen && (
                    <div className="absolute top-auto right-10 mt-2 bg-white border rounded-md shadow-lg w-48">
                      <div className="p-2">
                        <p className="font-bold text-main">Report Type</p>
                        <ul className="list-disc pl-4">
                          <div>
                            <button
                              onClick={() => {
                                setSelectedReportType("");
                                setFilterOpen(
                                  (prevFilterOpen) => !prevFilterOpen
                                );
                              }}
                              className={`block py-1 px-2 text-sm capitalize hover:text-main duration-300 ${
                                selectedReportType === ""
                                  ? "font-bold text-main"
                                  : "text-textSecond"
                              }`}
                            >
                              All
                            </button>
                          </div>
                          {reportTypes.map((type, index) => (
                            <div key={index}>
                              <button
                                onClick={() => {
                                  setSelectedReportType(type);
                                  setFilterOpen(
                                    (prevFilterOpen) => !prevFilterOpen
                                  );
                                }}
                                className={`block py-1 px-2 text-sm capitalize hover:text-main duration-300  ${
                                  selectedReportType === type
                                    ? "font-bold text-main"
                                    : "text-textSecond"
                                }`}
                              >
                                {type}
                              </button>
                            </div>
                          ))}
                        </ul>
                      </div>
                      <div className="p-2 border-t">
                        <p className="font-bold text-main">Status</p>
                        <ul className="list-disc pl-4">
                          <div>
                            <button
                              onClick={() => {
                                setSelectedStatus("");
                                setFilterOpen(
                                  (prevFilterOpen) => !prevFilterOpen
                                );
                              }}
                              className={`block py-1 px-2 text-sm capitalize hover:text-main duration-300  ${
                                selectedStatus === ""
                                  ? "font-bold text-main"
                                  : "text-textSecond"
                              }`}
                            >
                              All
                            </button>
                          </div>
                          {statuses.map((status, index) => (
                            <div key={index}>
                              <button
                                onClick={() => {
                                  setSelectedStatus(status);
                                  setFilterOpen(
                                    (prevFilterOpen) => !prevFilterOpen
                                  );
                                }}
                                className={`block py-1 px-2 text-sm capitalize hover:text-main duration-300  ${
                                  selectedStatus === status
                                    ? "font-bold text-main"
                                    : "text-textSecond"
                                }`}
                              >
                                {status}
                              </button>
                            </div>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* table header*/}
              <div className="hidden md:block px-5 py-5 h-full">
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
                          <p className="w-full truncate">{data.username}</p>
                        </th>
                        <td className="p-4 font-semibold uppercase" scope="row">
                          <p className="w-full line-clamp-2">
                            {data.type_of_report}
                          </p>
                        </td>
                        <td className="p-4">
                          <p className="w-full line-clamp-2">
                            {data.report_description}
                          </p>
                        </td>
                        <td className="p-4">
                          <p className="w-full line-clamp-2">{`${data.longitude} , ${data.latitude}`}</p>
                        </td>
                        <td className="p-4">
                          <p className="w-full font-semibold line-clamp-2">
                            {data.assigned_to
                              ? data.assigned_to
                              : "Not Assigned"}
                          </p>
                        </td>
                        <td className="p-4 text-center">
                          <p className="w-full truncate">{data.report_date}</p>
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
                            className="bg-main text-white py-2 px-4 font-semibold rounded-md hover:bg-textSecond hover:scale-105 ease-in-out duration-500 truncate"
                            onClick={() => {
                              setShowReport(true);
                              setName(data.username);
                              setLocation(
                                `${data.longitude} + ' ' + ${data.latitude}`
                              );
                              setReportType(data.type_of_report);
                              setDescription(data.report_description);
                              setDate(data.report_date);
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

              {/* card report  */}
              <div className="block md:hidden px-5 py-5">
                {currentData.map((data, index) => (
                  <div
                    key={index}
                    className="bg-[#FAF5FF] min-w-[250px] max-w-[300px] min-h-[250px] border border-main rounded-lg px-6 py-6 flex flex-col mt-2"
                  >
                    <div className="flex flex-col flex-1">
                      <div className="flex gap-4">
                        <div className="flex items-center justify-center rounded-md">
                          <div className="bg-square p-4 rounded-lg">
                            <HiOutlineDocumentReport className="text-[#2f2f2f] text-xl" />
                          </div>
                        </div>
                        <div className="flex flex-col justify-between py-1 w-full">
                          <div className="grid gap-1 text-start">
                            <p className="text-xs font-bold text-[#113e21] truncate">
                              {data.username}
                            </p>
                            <p className="text-xs font-bold text-[#2f2f2f] capitalize truncate">
                              {data.type_of_report}
                            </p>
                            <p className="text-xs font-normal text-[#2f2f2f] capitalize truncate">
                              {`${data.longitude} + ' ' + ${data.latitude}`}
                            </p>
                            <p className="text-xs font-bold text-[#2f2f2f] capitalize truncate">
                              {data.assigned_to
                                ? data.assigned_to
                                : "Not Assigned"}
                            </p>
                            <p className="text-xs font-normal text-[#2f2f2f] capitalize truncate">
                              {data.report_date}
                            </p>
                            <p className="text-xs font-bold capitalize truncate">
                              {data.status === "assigned" ? (
                                <span className="text-[#a10b00]">
                                  {data.status}
                                </span>
                              ) : data.status === "ongoing" ? (
                                <span className="text-[#007a3f]">
                                  {data.status}
                                </span>
                              ) : (
                                <span className="text-[#363636]">
                                  {data.status}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center items-center mt-4">
                      <button
                        className="bg-main text-white w-full py-2 px-4 font-semibold rounded-md hover:bg-textSecond hover:scale-105 ease-in-out duration-500 truncate"
                        onClick={() => {
                          setShowReport(true);
                          setName(data.name);
                          setLocation(data.location);
                          setReportType(data.type_of_report);
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
                    </div>
                  </div>
                ))}
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
