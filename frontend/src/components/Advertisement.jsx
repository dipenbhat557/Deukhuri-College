import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import useFetch from "./UseFetch";
import { def } from "../assets";

function Notice({ setShowNotice }) {
  const advertisements = useFetch(
    `${import.meta.env.VITE_APP_API_ROOT}/advertisements`,
  );

  return (
    <>
      <div className="fixed flex flex-col items-center justify-center top-0 left-0 w-full h-full z-50">
        <div className="p-2 rounded-lg absolute right-5 top-5 bg-slate-900 bg-opacity-10">
          <button
            onClick={() => setShowNotice(false)}
            className="text-red-500 text-3xl h-14 w-14 cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>
        <img
          src={advertisements?.[0]?.imageUrl || def}
          alt="Notice"
          style={{
            maxWidth: "100%",
            maxHeight: "90vh", // Adjust the height as needed
            width: "auto",
            height: "auto",
          }}
        />
      </div>
    </>
  );
}

function Advertisement() {
  const [showNotice, setShowNotice] = useState(true);

  return (
    <div className="relative">
      {showNotice && (
        <div className="fixed inset-0 bg-black opacity-50 backdrop-blur-2xl"></div>
      )}
      {showNotice && <Notice setShowNotice={setShowNotice} />}
    </div>
  );
}

export default Advertisement;
