import React, { useState } from "react";
import "./Notice.css";

import { FaTimes } from "react-icons/fa";
import useFetch from "./UseFetch";
function Notice({ setShowNotice }) {
  const advertisements = useFetch(
    `${import.meta.env.VITE_APP_API_ROOT}/advertisements`
  );
  return (
    <div className="notice-container">
      <div className="notice-content">
        <img
          src={advertisements?.[0]?.imageUrl}
          alt="Notice"
          className="notice-image"
        />
        <div className="btn">
          <button onClick={() => setShowNotice(false)}>
            {" "}
            <FaTimes /> {/* Use the icon component */}
          </button>
        </div>
      </div>
    </div>
  );
}

function Advertisement() {
  const [showNotice, setShowNotice] = useState(true);

  return (
    <div className="home-page">
      {showNotice && <div className="background-blur"></div>}
      {showNotice && <Notice setShowNotice={setShowNotice} />}
    </div>
  );
}

export default Advertisement;
