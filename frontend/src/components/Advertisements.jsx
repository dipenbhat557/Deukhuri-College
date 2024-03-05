import React, { useState, useEffect } from "react";
import useFetch from "./UseFetch"; // Replace with the path to your useFetch hook

const Advertisement = () => {
  const advertisements = useFetch(
    `${import.meta.env.VITE_APP_API_ROOT}/advertisements`,
  );

  const [close, setClose] = useState(false);

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // Assuming your API response contains an array of advertisements
    if (advertisements && advertisements.length > 0) {
      setImageUrl(advertisements[0].imageUrl); // Adjust based on your API response structure
    }
  }, [advertisements]);

  const handleClose = () => {
    setClose(true);
  };

  return (
    <>
      {imageUrl && !close && (
        <div className="fixed top-0 left-0 w-[50%]  sm:w-full h-full flex z-40 items-start p-4 justify-center bg-opacity-75 bg-gray-800 backdrop-blur-md">
          <div className="relative bg-white p-8 max-w-md w-full rounded-lg shadow-lg">
            <img src={imageUrl} alt="Advertisement" className="w-full h-auto" />
            <button
              onClick={handleClose}
              className="absolute top-4  z-50 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Advertisement;
