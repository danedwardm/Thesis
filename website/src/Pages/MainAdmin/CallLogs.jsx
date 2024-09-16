import React, { useState } from "react";

import Data from "../../JSON/callLogs.json";
import Navbar from "../../Components/NavBar";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";

const CallLogs = () => {
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
                  <p className="text-white font-semibold text-sm">call logs</p>
                </div>
                <div>
                  <button className="bg-second text-main font-bold text-sm py-3 px-6 border border-b-main rounded-t-lg hover:bg-main hover:text-accent ease-in-out duration-500">
                    FILTER
                  </button>
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
                        Location
                      </th>
                      <th scope="col" className="text-center p-3 truncate">
                        Duration
                      </th>
                      <th scope="col" className="text-center p-3 truncate">
                        Date
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
                            {data.emergency_type}
                          </p>
                        </td>
                        <td className="p-4">
                          <p className="w-full line-clamp-2">{data.location}</p>
                        </td>
                        <td className="p-4 text-center">
                          <p className="w-full truncate">{data.duration}</p>
                        </td>
                        <td className="p-4 text-center">
                          <p className="w-full truncate">{data.date}</p>
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
                    className="bg-[#FAF5FF] min-w-[250px] max-w-[300px] min-h-[150px] border border-main rounded-lg px-6 py-6 flex flex-col mt-2"
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
                              {data.name}
                            </p>
                            <p className="text-xs font-bold text-[#2f2f2f] capitalize truncate">
                              {data.report_type}
                            </p>
                            <p className="text-xs font-normal text-[#2f2f2f] capitalize truncate">
                              {data.location}
                            </p>
                            <p className="text-xs font-normal text-[#2f2f2f] capitalize truncate">
                              {data.duration}
                            </p>
                            <p className="text-xs font-normal text-[#2f2f2f] capitalize truncate">
                              {data.date}
                            </p>
                          </div>
                        </div>
                      </div>
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
    </>
  );
};

export default CallLogs;