import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../Components/NavBar";
import { FaUser } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoCall } from "react-icons/io5";
import { MdReport } from "react-icons/md";

// Google Maps container style
const mapContainerStyle = {
  width: "100%",
  height: "100%", // Let the map take 100% height of its parent container
};

const Dashboard = () => {
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapRef = useRef(null);

  const [location, setLocation] = useState({
    lat: 14.9767, // Default fallback coordinates (e.g., UCC South Campus)
    lng: 120.9705,
  });

  useEffect(() => {
    // Get current location using Geolocation API
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error("Error getting location:", error);
            // You can use default location here if geolocation fails
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getCurrentLocation();
  }, []);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        const map = new google.maps.Map(mapRef.current, {
          center: location, // Dynamically set map center to user's location
          zoom: 15, // Adjust zoom level as needed
        });

        // Create a marker at the user's current location
        const marker = new google.maps.Marker({
          position: location,
          map: map,
          title: "Your Current Location",
        });
      };
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();
  }, [googleMapsApiKey, location]); // Re-run whenever location changes

  return (
    <div className="relative bg-second h-screen w-screen overflow-hidden flex flex-col">
      {/* Background squares */}
      <div className="z-10">
        <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 -top-24 -left-24"></div>
        <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 top-2/3 left-0"></div>
        <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 top-0 left-1/3"></div>
        <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 -top-40 -right-10"></div>
        <div className="absolute h-[30vh] w-[30vh] bg-square rounded-[20px] rotate-45 top-96 left-2/3"></div>
      </div>

      {/* Main content */}
      <div className="relative w-full flex flex-col items-center z-30 overflow-auto flex-grow">
        {/* Navbar */}
        <Navbar />

        {/* Stats cards */}
        <div className="w-full md:mt-[21vh] mt-[30vh] grid md:grid-cols-4 grid-cols-2 md:gap-6 gap-2 px-6">
          {/* Number of calls */}
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

          {/* Active Reports */}
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

          {/* Weekly Reports */}
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

          {/* Number of Users */}
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

        {/* Filter section */}
        <div className="w-full grid grid-cols-2 justify-between items-center md:mt-3 mt-4 px-6">
          <div className="flex flex-col px-3">
            <p className="md:text-xl text-sm font-bold text-main">
              Map of Reports
            </p>
          </div>
          <div className="flex flex-col justify-center items-end px-3">
            <button className="flex justify-center items-center rounded-md bg-white border-main border text-xs text-main font-bold md:px-5 md:py-2 px-3 py-1 uppercase hover:bg-textSecond hover:text-accent ease-in-out duration-500">
              Filter
            </button>
          </div>
        </div>

        {/* Map */}
        <div className="w-full flex-grow bg-black md:mt-5 mt-3 border-2 border-t-main">
          <div ref={mapRef} style={mapContainerStyle}></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
