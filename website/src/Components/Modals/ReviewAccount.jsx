import React, { useState } from "react";

import { RiAttachment2 } from "react-icons/ri";
import { TiInfoLarge } from "react-icons/ti";
import { PiImages } from "react-icons/pi";

import ImageModal from "./ImageModal";
import DenyVerification from "./DenyVerification";

const ReviewAccount = ({
  isVisible,
  onClose,
  userName,
  phoneNumber,
  verified,
  violation,
  accountStatus,
  type,
  address,
  emailAddress,
  idNumber,
  photo,
  selfieWId,
  idPicture,
}) => {
  if (!isVisible) return null;

  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDenyModal, setShowDenyModal] = useState(false);
  console.log("ReviewAccount", verified);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  const handleDenyClick = () => {
    setShowDenyModal(true);
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
                    <p className="text-xs font-semibold">Name</p>
                  </div>
                  <div className="px-4 py-3 bg-white w-full flex items-center justify-center border border-main rounded-md">
                    <p className="text-xs font-extrabold  text-main uppercase truncate">
                      {userName}
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                  <div className="py-2 px-1 flex flex-row items-center justify-start w-full">
                    <p className="text-xs font-semibold ">Address</p>
                  </div>
                  <div className="px-4 py-3 bg-white w-full flex items-center border border-main rounded-md">
                    <p className="text-xs font-semibold text-gray-500 truncate">
                      {address}
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                  <div className="py-2 px-1 flex flex-row items-center justify-start w-full">
                    <p className="text-xs font-semibold ">Phone Number</p>
                  </div>
                  <div className="px-4 py-3 bg-white w-full flex items-center border border-main rounded-md">
                    <p className="text-xs font-semibold text-gray-500 truncate">
                      {phoneNumber}
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center justify-center py-2">
                  <div className="flex justify-start items-center w-full py-2">
                    <p className="text-xs font-semibold ">Email Address</p>
                  </div>
                  <div className="px-4 py-3 bg-white w-full flex items-center border border-main rounded-md">
                    <p className="text-xs font-semibold text-gray-500 truncate">
                      {emailAddress}
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center justify-center py-2">
                  <div className="flex justify-start items-center w-full py-2">
                    <p className="text-xs font-semibold ">ID Number</p>
                  </div>
                  <div className="px-4 py-3 bg-white w-full flex items-center border border-main rounded-md">
                    <p className="text-xs font-semibold text-gray-500 truncate">
                      {idNumber}
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-row gap-4 items-center justify-center">
                  <div className="w-1/2 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-start w-full py-2 px-1">
                      <p className="text-xs font-semibold ">Type</p>
                    </div>
                    <div className="w-full flex items-center justify-center p-4 bg-white rounded-md border border-main">
                      <div className="w-full flex bg-white resize-none outline-none text-xs items-center justify-center">
                        <p className="text-xs font-bold uppercase truncate">
                          {type === "user" ? (
                            <span className=" w-full font-bold truncate text-[#1a722f]">
                              {type}
                            </span>
                          ) : type === "admin" ? (
                            <span className=" w-full truncate font-bold text-[#a10b00]">
                              {type}
                            </span>
                          ) : (
                            <span className="w-full truncate font-bold text-[#363636]">
                              {type}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-start w-full py-2 px-1">
                      <p className="text-xs font-semibold ">Verified</p>
                    </div>
                    <div className="w-full flex items-center justify-center p-4 bg-white rounded-md border border-main">
                      <div className="w-full flex bg-white resize-none outline-none text-xs ritems-center justify-center">
                        <p className="text-xs font-bold uppercase truncate">
                          {verified ? (
                            <span className=" w-full font-bold truncate text-[#1a722f]">
                              verified
                            </span>
                          ) : (
                            <span className=" w-full truncate font-bold text-[#a10b00]">
                              not verified
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-row gap-4 items-center justify-center">
                  <div className="w-1/2 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-start w-full py-2 px-1">
                      <p className="text-xs font-semibold ">Status</p>
                    </div>
                    <div className="w-full flex items-center justify-center p-4 bg-white rounded-md border border-main">
                      <div className="w-full flex bg-white resize-none outline-none text-xs items-center justify-center">
                        <p className="text-xs font-bold uppercase truncate">
                          {accountStatus === "active" ? (
                            <span className=" w-full font-bold truncate text-[#1a722f]">
                              {accountStatus}
                            </span>
                          ) : accountStatus === "suspended" ? (
                            <span className=" w-full truncate font-bold text-[#a10b00]">
                              {accountStatus}
                            </span>
                          ) : (
                            <span className="w-full truncate font-bold text-[#363636]">
                              {accountStatus}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-start w-full py-2 px-1">
                      <p className="text-xs font-semibold ">Violations</p>
                    </div>
                    <div className="w-full flex items-center justify-center p-4 bg-white rounded-md border border-main">
                      <div className="w-full flex bg-white resize-none outline-none text-xs ritems-center justify-center">
                        <p className="text-xs font-extrabold text-black truncate">
                          {violation}
                        </p>
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
                  <div className="w-full flex flex-row justify-center items-start gap-4">
                    <div className="flex items-center justify-start w-full py-2 px-1">
                      <p className="text-xs font-semibold ">Photo</p>
                    </div>
                    <div className="flex items-center justify-start w-full py-2 px-1">
                      <p className="text-xs font-semibold ">Selfie with ID</p>
                    </div>
                  </div>
                  <div className="w-full flex flex-row justify-center items-start gap-4">
                    {photo && photo.length > 0 ? (
                      <div
                        className="w-full  h-[210px] rounded-md overflow-hidden cursor-pointer border border-main mb-3"
                        onClick={() => handleImageClick(photo)}
                      >
                        <img
                          src={photo}
                          className="w-full h-full object-cover object-center hover:scale-105 ease-in-out duration-500"
                          alt={`Image ${photo}`}
                        />
                      </div>
                    ) : (
                      <div className="w-full  min-h-[210px] bg-white rounded-md flex flex-col items-center justify-center border border-main">
                        <PiImages className="text-xl" />
                        <p className="text-xs font-normal">No media file</p>
                      </div>
                    )}
                    {selfieWId && selfieWId.length > 0 ? (
                      <div
                        className="w-full h-[210px] rounded-md overflow-hidden cursor-pointer border border-main mb-3"
                        onClick={() => handleImageClick(selfieWId)}
                      >
                        <img
                          src={selfieWId}
                          className="w-full h-full object-cover object-center hover:scale-105 ease-in-out duration-500"
                          alt={`Image ${selfieWId}`}
                        />
                      </div>
                    ) : (
                      <div className="w-full min-h-[210px] bg-white rounded-md flex flex-col items-center justify-center border border-main">
                        <PiImages className="text-xl" />
                        <p className="text-xs font-normal">No media file</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-start w-full py-2 px-1">
                    <p className="text-xs font-semibold ">
                      Identification Card
                    </p>
                  </div>
                  {idPicture && idPicture.length > 0 ? (
                    <div
                      className="w-full h-[280px] rounded-md overflow-hidden cursor-pointer border border-main mb-3"
                      onClick={() => handleImageClick(idPicture)}
                    >
                      <img
                        src={idPicture}
                        className="w-full h-full object-cover object-center hover:scale-105 ease-in-out duration-500"
                        alt={`Image ${idPicture}`}
                      />
                    </div>
                  ) : (
                    <div className="w-full min-h-[280px] bg-white rounded-md flex flex-col items-center justify-center border border-main">
                      <PiImages className="text-xl" />
                      <p className="text-xs font-normal">No media file</p>
                    </div>
                  )}
                  <div className="w-full flex flex-row gap-4 items-center justify-end mt-5">
                    {/* for dept admin */}
                    <button className="py-3 px-4 border border-accent bg-main text-white rounded-lg text-xs font-bold hover:scale-105 ease-in-out duration-500 truncate">
                      DELETE
                    </button>
                    <button
                      className={
                        verified !== true && verified !== "true"
                          ? "py-3 px-4 border border-accent bg-main text-white rounded-lg text-xs font-bold hover:scale-105 ease-in-out duration-500 truncate"
                          : "hidden"
                      }
                    >
                      VERIFY
                    </button>
                    <button
                      className={
                        verified !== true && verified !== "true"
                          ? "py-3 px-4 border border-main bg-textSecond text-black rounded-lg text-xs font-bold hover:scale-105 ease-in-out duration-500 truncate"
                          : "hidden"
                      }
                      onClick={handleDenyClick}
                    >
                      DENY
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
        attachment={selectedImage}
      />
      <DenyVerification
        isVisible={showDenyModal}
        onClose={() => setShowDenyModal(false)}
      />
    </>
  );
};

export default ReviewAccount;
