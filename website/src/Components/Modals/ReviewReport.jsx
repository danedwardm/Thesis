import React, { useState } from "react";

import { RiAttachment2 } from "react-icons/ri";
import { TiInfoLarge } from "react-icons/ti";
import { PiImages } from "react-icons/pi";

import ImageModal from "./ImageModal";
import Feedback from "./Feedback";
import DeleteReport from "./DeleteReport";

const ReviewReport = ({
  isVisible,
  onClose,
  userName,
  location,
  reportType,
  description,
  date,
  reportStatus,
  assignedTo,
  attachment,
  upvote,
  downvote,
  feedback,
  proof,
  isValidated,
}) => {
  if (!isVisible) return null;

  const [showImageModal, setShowImageModal] = useState(false);
  const [showFeeedback, setShowFeeedback] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleImageClick = () => {
    setShowImageModal(true);
  };

  const handleFeeedbackClick = () => {
    setShowFeeedback(true);
  };

  const handleDeleteModal = () => {
    setShowDeleteModal(true);
  };
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[100svh] items-center justify-center bg-black/50 flex z-30 font-figtree">
        <div
          className="w-full min-h-[100svh] max-h-[100svh] py-12 px-4 overflow-auto flex justify-center items-start"
          id="container"
          onClick={(e) => {
            if (e.target.id === "container") {
              onClose();
              //   setActiveDetails(false);
            }
          }}
        >
          <div className="relative w-full lg:w-3/4 bg-second flex flex-col items-center justify-center p-8 md:p-10 rounded-xl shadow-xl overflow-hidden">
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
                Report Details
              </p>
            </div>
            <div className="w-full flex flex-col lg:flex-row justify-center items-start gap-4 lg:gap-12 z-20">
              {/* Information Section */}
              <div className="w-full lg:w-1/2 flex flex-col mt-4">
                <div className="w-full flex flex-row gap-2 items-center justify-start py-2 px-1">
                  <div className="p-2 bg-main rounded-full text-white shadow-xl">
                    <TiInfoLarge className="text-sm" />
                  </div>
                  <p className="text-xs text-main font-bold">
                    Information Section
                  </p>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                  <div className="py-2 px-1 flex flex-row items-center justify-start w-full">
                    <p className="text-xs font-semibold">Report Type</p>
                  </div>
                  <div className="px-4 py-3 bg-white w-full flex items-center justify-center border border-main rounded-md">
                    <p className="text-xs font-extrabold  text-main uppercase truncate">
                      {reportType}
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                  <div className="py-2 px-1 flex flex-row items-center justify-start w-full">
                    <p className="text-xs font-semibold ">Reported by</p>
                  </div>
                  <div className="px-4 py-3 bg-white w-full flex items-center border border-main rounded-md">
                    <p className="text-xs font-semibold text-gray-500 truncate">
                      {userName}
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                  <div className="py-2 px-1 flex flex-row items-center justify-start w-full">
                    <p className="text-xs font-semibold ">Location</p>
                  </div>
                  <div className="px-4 py-3 bg-white w-full flex items-center border border-main rounded-md">
                    <p className="text-xs font-semibold text-gray-500 truncate">
                      {location}
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center justify-center py-2">
                  <div className="flex justify-start items-center w-full py-2">
                    <p className="text-xs font-semibold ">Item Description</p>
                  </div>
                  <div className="p-4 rounded-md bg-white w-full border text-gray-500 border-main">
                    <textarea
                      name=""
                      id=""
                      rows={4}
                      className="outline-none bg-white w-full resize-none text-xs font-normal"
                      placeholder="Actions or Remarks"
                      value={description}
                      readOnly={true}
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex flex-row gap-4 items-center justify-center">
                  <div className="w-1/2 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-start w-full py-2 px-1">
                      <p className="text-xs font-semibold ">Date</p>
                    </div>
                    <div className="w-full flex items-center justify-center p-4 bg-white rounded-md border border-main">
                      <div className="w-full bg-white resize-none outline-none text-xs font-normal">
                        <p className="text-xs font-semibold text-gray-500 truncate">
                          {date}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-start w-full py-2 px-1">
                      <p className="text-xs font-semibold ">Assigned To</p>
                    </div>
                    <div className="w-full flex items-center justify-center p-4 bg-white rounded-md border border-main">
                      <div className="w-full bg-white resize-none outline-none text-xs font-normal">
                        <span className="text-xs font-semibold text-gray-500 truncate">
                          {assignedTo ? assignedTo : "Not Assigned"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* attachment and button section */}
              <div className="w-full lg:w-1/2 flex flex-col mt-4">
                <div className="w-full flex flex-row gap-2 items-center justify-start py-2 px-1">
                  <div className="p-2 bg-main rounded-full text-white shadow-xl">
                    <RiAttachment2 className="text-sm" />
                  </div>
                  <p className="text-xs text-main font-bold">
                    Attachment Section
                  </p>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                  {attachment && attachment.length > 0 ? (
                    <div
                      className="w-full md:h-[360px] h-[200px] rounded-md overflow-hidden cursor-pointer border border-main mb-3"
                      onClick={handleImageClick}
                    >
                      <img
                        src={attachment}
                        className="w-full h-full object-cover object-center hover:scale-105 ease-in-out duration-500"
                        alt={`Image ${attachment}`}
                      />
                    </div>
                  ) : (
                    <div className="w-full md:h-[360px] h-[200px] bg-white rounded-md flex flex-col items-center justify-center border border-main">
                      <PiImages className="text-xl" />
                      <p className="text-xs font-normal">No media file</p>
                    </div>
                  )}
                  <div className="w-full flex flex-row gap-4 items-center justify-center">
                    <div className="w-1/3 flex flex-col items-center justify-center">
                      <div className="flex items-center justify-start w-full py-2 px-1">
                        <p className="text-xs font-semibold ">Status</p>
                      </div>
                      <div className="w-full flex items-center justify-center p-4 bg-white rounded-md border border-main">
                        <div className="w-full flex bg-white resize-none outline-none text-xs items-center justify-center">
                          <p className="text-xs font-bold uppercase truncate">
                            {reportStatus === "assigned" ? (
                              <span className="truncate text-[#a10b00]">
                                {reportStatus}
                              </span>
                            ) : reportStatus === "ongoing" ? (
                              <span className="font-bold text-[#007a3f]">
                                {reportStatus}
                              </span>
                            ) : (
                              <span className="font-bold text-[#363636]">
                                {reportStatus}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3 flex flex-col items-center justify-center">
                      <div className="flex items-center justify-start w-full py-2 px-1">
                        <p className="text-xs font-semibold ">Upvote</p>
                      </div>
                      <div className="w-full flex items-center justify-center p-4 bg-white rounded-md border border-main">
                        <div className="w-full flex bg-white resize-none outline-none text-xs items-center justify-center">
                          <p className="text-xs font-bold text-gray-500 truncate">
                            {upvote}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3 flex flex-col items-center justify-center">
                      <div className="flex items-center justify-start w-full py-2 px-1">
                        <p className="text-xs font-semibold ">Downvote</p>
                      </div>
                      <div className="w-full flex items-center justify-center p-4 bg-white rounded-md border border-main">
                        <div className="w-full flex bg-white resize-none outline-none text-xs items-center justify-center">
                          <p className="text-xs font-bold text-gray-500 truncate">
                            {downvote}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex flex-row gap-4 items-center justify-end mt-5">
                    {/* <button
                      className="py-3 px-4 border border-main bg-textSecond text-black  rounded-lg text-xs font-bold hover:scale-105 ease-in-out duration-500 truncate"
                      onClick={handleFeeedbackClick}
                    >
                      FEEDBACK
                    </button> */}
                    {!isValidated ? (
                      <button className="py-3 px-4 border border-accent bg-main text-white rounded-lg text-xs font-bold hover:scale-105 ease-in-out duration-500 truncate">
                        VALIDATE
                      </button>
                    ) : null}

                    <button className="py-3 px-4 border border-accent bg-main text-white rounded-lg text-xs font-bold hover:scale-105 ease-in-out duration-500 truncate">
                      ASSIGN
                    </button>
                    <button
                      className="py-3 px-4 border border-accent bg-main text-white rounded-lg text-xs font-bold hover:scale-105 ease-in-out duration-500 truncate"
                      onClick={handleDeleteModal}
                    >
                      DELETE
                    </button>
                    <button
                      className="py-3 px-4 border border-main bg-white text-main rounded-lg text-xs font-bold hover:scale-105 ease-in-out duration-500 truncate"
                      onClick={() => {
                        onClose();
                      }}
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ImageModal
        isVisible={showImageModal}
        onClose={() => setShowImageModal(false)}
        attachment={attachment}
      />
      <Feedback
        isVisible={showFeeedback}
        onClose={() => setShowFeeedback(false)}
        feedback={feedback}
        attachment={proof}
      />
      <DeleteReport
        isVisible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
    </>
  );
};

export default ReviewReport;
