import React from "react";

const ImageModal = ({ isVisible, onClose, attachment }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 w-full h-screen bg-black/75 flex items-center justify-center z-40">
      <div
        className="relative flex items-center justify-center rounded-lg w-screen h-screen"
        id="container"
        onClick={(e) => {
          if (e.target.id === "container") {
            onClose();
          }
        }}
      >
        <img
          src={attachment}
          className="w-auto h-auto md:h-[75vh] max-w-full max-h-full rounded-lg"
          alt={`Image ${attachment}`}
        />
        <button
          className="absolute text-white top-7 right-5 text-5xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
