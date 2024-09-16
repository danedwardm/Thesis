import React, { useState } from "react";

import Data from "../../JSON/accounts.json";
import Navbar from "../../Components/NavBar";
import ReviewAccount from "../../Components/Modals/ReviewAccount";
import AddAccount from "../../Components/Modals/AddAccount";
import DenyVerification from "../../Components/Modals/DenyVerification";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";

const Accounts = () => {
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verified, setVerified] = useState(false);
  const [violation, setViolation] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState(""); // Fixed typo from "aaddress" to "address"
  const [emailAddress, setEmailAddress] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [photo, setPhoto] = useState("");
  const [selfieWId, setSelfieWId] = useState("");
  const [idPicture, setIdPicture] = useState("");

  const handleAddAccount = () => {
    setShowAddAccount(true);
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page
  const [filterOpen, setFilterOpen] = useState(false); // State for dropdown filter
  const [selectedAccountType, setSelectedAccountType] = useState(""); // Selected report type filter
  const [selectedStatus, setSelectedStatus] = useState(""); // Selected status filter
  const [selectedVerified, setSelectedVerified] = useState(""); // Selected verified filter

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
      (selectedAccountType === "" || item.type === selectedAccountType) &&
      (selectedStatus === "" || item.status === selectedStatus) &&
      (selectedVerified === "" || item.verified === selectedVerified)
    );
  });

  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Get unique report types and statuses for dropdown options
  const accountType = [...new Set(Data.map((item) => item.type))];
  const statuses = [...new Set(Data.map((item) => item.status))];
  const accountVerified = [...new Set(Data.map((item) => item.verified))];

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
                  <p className="text-white font-semibold text-sm">accounts</p>
                </div>
                <div className="flex flex-row">
                  <div
                    className="bg-second text-main font-bold text-sm py-3 px-6 border border-accent border-b-main rounded-t-lg hover:bg-main hover:text-accent ease-in-out duration-500 text-center cursor-pointer"
                    onClick={handleAddAccount}
                  >
                    ADD ACCOUNT
                  </div>
                  <div>
                    <div
                      className="bg-second text-main font-bold text-sm py-3 px-6 border border-b-main rounded-t-lg hover:bg-main hover:text-accent ease-in-out duration-500 text-center cursor-pointer h-full"
                      onClick={() => setFilterOpen(!filterOpen)}
                    >
                      FILTER
                    </div>
                    {filterOpen && (
                      <div className="absolute top-auto right-10 mt-2 bg-white border rounded-md shadow-lg w-48">
                        <div className="p-2">
                          <p className="font-bold text-main">Report Type</p>
                          <ul className="list-disc pl-4">
                            <div>
                              <button
                                onClick={() => setSelectedAccountType("")}
                                className={`block py-1 px-2 text-sm capitalize hover:text-main duration-300 ${
                                  selectedAccountType === ""
                                    ? "font-bold text-main"
                                    : "text-textSecond"
                                }`}
                              >
                                All
                              </button>
                            </div>
                            {accountType.map((type, index) => (
                              <div key={index}>
                                <button
                                  onClick={() => setSelectedAccountType(type)}
                                  className={`block py-1 px-2 text-sm capitalize hover:text-main duration-300  ${
                                    selectedAccountType === type
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
                                onClick={() => setSelectedStatus("")}
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
                                  onClick={() => setSelectedStatus(status)}
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
                        <div className="p-2 border-t">
                          <p className="font-bold text-main">Verified</p>
                          <ul className="list-disc pl-4">
                            <div>
                              <button
                                onClick={() => setSelectedVerified("")}
                                className={`block py-1 px-2 text-sm capitalize hover:text-main duration-300  ${
                                  selectedVerified === ""
                                    ? "font-bold text-main"
                                    : "text-textSecond"
                                }`}
                              >
                                All
                              </button>
                            </div>
                            {accountVerified.map((verified, index) => (
                              <div key={index}>
                                <button
                                  onClick={() => setSelectedVerified(verified)}
                                  className={`block py-1 px-2 text-sm capitalize hover:text-main duration-300  ${
                                    selectedVerified === verified
                                      ? "font-bold text-main"
                                      : "text-textSecond"
                                  }`}
                                >
                                  {verified}
                                </button>
                              </div>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* table header*/}
              <div className="hidden md:block px-5 py-5 h-full">
                <table className="w-full table-fixed">
                  <thead className="text-xs font-bold text-gray-500">
                    <tr className="border-b">
                      <th scope="col" className="text-start p-3 truncate">
                        Name
                      </th>
                      <th scope="col" className="text-start p-3 truncate">
                        Phone Number
                      </th>
                      <th scope="col" className="text-center p-3 truncate">
                        Verified
                      </th>
                      <th scope="col" className="text-center p-3 truncate">
                        Violation
                      </th>
                      <th scope="col" className="text-center p-3 truncate">
                        Type
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
                        <td className="p-4" scope="row">
                          <p className="w-full truncate">{data.phone_number}</p>
                        </td>
                        <td
                          className="p-4 text-center font-semibold uppercase"
                          key={index.id}
                        >
                          {data.verified === "yes" ? (
                            <p className=" w-full font-bold truncate text-[#007a3f]">
                              {data.verified}
                            </p>
                          ) : (
                            <p className=" w-full truncate font-bold text-[#a10b00]">
                              {data.verified}
                            </p>
                          )}
                        </td>
                        <td className="p-4 text-center font-semibold uppercase">
                          <p className="w-full truncate">{data.violation}</p>
                        </td>
                        <td
                          className="p-4 text-center font-semibold uppercase"
                          key={index.id}
                        >
                          {data.type === "admin" ? (
                            <p className=" w-full font-bold truncate text-[#a10b00]">
                              {data.type}
                            </p>
                          ) : data.type === "user" ? (
                            <p className=" w-full truncate font-bold text-[#1a722f]">
                              {data.type}
                            </p>
                          ) : (
                            <p className="w-full truncate font-bold text-[#363636]">
                              {data.type}
                            </p>
                          )}
                        </td>
                        <td
                          className="p-4 text-center font-semibold uppercase"
                          key={index.id}
                        >
                          {data.status === "active" ? (
                            <p className=" w-full font-bold truncate text-[#1a722f]">
                              {data.status}
                            </p>
                          ) : data.status === "suspended" ? (
                            <p className=" w-full truncate font-bold text-[#a10b00]">
                              {data.status}
                            </p>
                          ) : (
                            <p className="w-full truncate font-bold text-[#363636]">
                              {data.status}
                            </p>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          <button
                            className="bg-main text-white py-2 px-4 font-semibold rounded-md hover:bg-textSecond ease-in-out duration-500 truncate"
                            onClick={() => {
                              setShowAccount(true);
                              setName(data.name);
                              setPhoneNumber(data.phone_number);
                              setVerified(data.verified);
                              setViolation(data.violation);
                              setStatus(data.status);
                              setType(data.type);
                              setAddress(data.address);
                              setEmailAddress(data.email_address);
                              setIdNumber(data.id_number);
                              setPhoto(data.photo);
                              setSelfieWId(data.selfie_w_id);
                              setIdPicture(data.id_picture);
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
                              {data.name}
                            </p>
                            <p className="text-xs font-bold text-[#2f2f2f] capitalize truncate">
                              {data.phone_number}
                            </p>
                            <p className="text-xs font-bold capitalize truncate">
                              {data.verified === "no" ? (
                                <span className="text-[#a10b00]">
                                  {data.verified}
                                </span>
                              ) : (
                                <span className="text-[#007a3f]">
                                  {data.verified}
                                </span>
                              )}
                            </p>
                            <p className="text-xs font-normal text-[#2f2f2f] capitalize truncate">
                              {data.violation}
                            </p>
                            <p className="text-xs font-bold text-[#2f2f2f] capitalize truncate">
                              {data.assigned_to
                                ? data.assigned_to
                                : "Not Assigned"}
                            </p>
                            <p className="text-xs font-bold capitalize truncate">
                              {data.type === "admin" ? (
                                <span className="text-[#a10b00]">
                                  {data.type}
                                </span>
                              ) : data.type === "user" ? (
                                <span className="text-[#007a3f]">
                                  {data.type}
                                </span>
                              ) : (
                                <span className="text-[#363636]">
                                  {data.type}
                                </span>
                              )}
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
                          setShowAccount(true);
                          setName(data.name);
                          setPhoneNumber(data.phone_number);
                          setVerified(data.verified);
                          setViolation(data.violation);
                          setStatus(data.status);
                          setType(data.type);
                          setAddress(data.address);
                          setEmailAddress(data.email_address);
                          setIdNumber(data.id_number);
                          setPhoto(data.photo);
                          setSelfieWId(data.selfie_w_id);
                          setIdPicture(data.id_picture);
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
      <ReviewAccount
        isVisible={showAccount}
        onClose={() => setShowAccount(false)}
        userName={name}
        phoneNumber={phoneNumber}
        verified={verified}
        violation={violation}
        accountStatus={status}
        type={type}
        address={address}
        emailAddress={emailAddress}
        idNumber={idNumber}
        photo={photo}
        selfieWId={selfieWId}
        idPicture={idPicture}
      />
      <AddAccount
        isVisible={showAddAccount}
        onClose={() => setShowAddAccount(false)}
      />
    </>
  );
};

export default Accounts;