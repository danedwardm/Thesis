// PopUpNotif.js
import React, { useEffect, useState } from "react";

const PopUpNotif = ({ message, type, isOpen, onClose, index }) => {
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300); // Delay the close to let animation complete
      }, 15000); // Close after 10 seconds
    }
  }, [isOpen, onClose]);

  if (!show) return null;

  return (
    <div
      style={{
        zIndex: 9999 - index, // Ensure that newer notifications stack on top of older ones
        bottom: `${index * 100 + 20}px`, // Increase vertical offset for each new notification
      }}
      className="fixed right-4 w-80 p-4 rounded-lg transform transition-all duration-300 ease-in-out"
    >
      <div
        className={`flex items-center space-x-3 ${
          type === "success" ? "bg-green-500" : "bg-red-500"
        } text-white p-4 rounded-lg shadow-lg border border-main`}
      >
        <div className="flex-1">{message}</div>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.293 4.293a1 1 0 0 1 1.414 0L10 6.586l2.293-2.293a1 1 0 1 1 1.414 1.414L11.414 8l2.293 2.293a1 1 0 0 1-1.414 1.414L10 9.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 8 6.293 5.707a1 1 0 0 1 0-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PopUpNotif;
