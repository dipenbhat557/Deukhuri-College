import React, { Suspense, lazy, useEffect, useState } from "react";
import axios from "axios"; // Don't forget to import axios
import { contactBg, pdf, writingNote } from "../assets";
import Footer from "./Footer";
import HeroHeader from "./HeroHeader";
import Navbar from "./Navbar";
import Subscription from "./Subscriptions";
import Model from "./Model";
import { RxCrossCircled } from "react-icons/rx";

// TODO: Fix this in future
const HARDCODED_PASSWORD = "DMC62";

const Loading = lazy(() => import("./Loading"));

const Publications = () => {
  const [scrolled, setScrolled] = useState(false);
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [openModel, setOpenModel] = useState(true);
  const [publications, setPublications] = useState([]);
  const [selectedPublication, setSelectedPublication] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_ROOT}/api/publication`
        );
        let receivedData = await response?.data;
        setPublications(receivedData);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchDocuments();
  }, []);

  

  const handleScroll = () => {
    if (window.scrollY >= 105) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const createBlobUrl = (base64Data) => {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length).fill().map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/jpeg" });
    return URL.createObjectURL(blob);
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    if (password === HARDCODED_PASSWORD) {
      setPasswordCorrect(true);
      setShowError(false);
      // window.open(createBlobUrl(selectedPublication?.file), '_blank');
      setOpenModel(false)
    } else {
      setPasswordCorrect(false);
      setShowError(true);
    }
  };

  const handlePdfClick = (publication) => {
    // if (publication.hidden) {
    //   setSelectedPublication(publication);
    //   setOpenModel(true);
    // } else {
      window.open(createBlobUrl(publication?.file), "_blank");
    // }
  };

  return (
    <div className={`${scrolled ? "flex flex-col relative" : ""}`}>
      <Suspense fallback={<Loading />}>
        {scrolled && <Navbar active="" scrolled={scrolled} />}
        <HeroHeader />
      </Suspense>

      <div className="w-full h-[500px] sm:h-[616px] relative">
        <img
          src={contactBg}
          alt="Graduate BG"
          className="w-full h-full object-cover -z-10"
        />

        <Suspense fallback={<Loading />}>
          <div
            className={`w-full h-full bg-black bg-opacity-20 absolute top-0 left-0 flex flex-col ${
              scrolled ? "justify-end" : "justify-between"
            } items-center text-white`}
          >
            {scrolled || <Navbar active="" scrolled={scrolled} />}

            <div className="w-[60%] h-[15%] flex flex-col ">
              <div className="w-full h-[60%] text-center pt-2 bg-red-900">
                <p className="text-[18px] sm:text-[20px] font-bold text-white">
                  Publications
                </p>
              </div>
              <div className="w-full h-[40%] bg-white" />
            </div>
          </div>
        </Suspense>
      </div>

      <div className="w-full relative flex items-center justify-center">
        
      {openModel && <div className="w-full h-[300px] bg-white" />}
        {openModel && (
          <div className="w-[80%] h-[60%] absolute  m-auto">
            
              <form
                className="flex flex-col items-center bg-white p-4 gap-4"
                onSubmit={handlePasswordSubmit}
              >
                {/* <RxCrossCircled onClick={()=>setOpenModel(false)} className="cursor-pointer text-3xl text-red-500 absolute top-2 right-10"/> */}
                <h2 className="text-xl text-center font-bold">
                  Enter Password to View PDF
                </h2>
                <div className="flex gap-1 w-96 justify-center items-center flex-col">
                  <label htmlFor="password">Password: </label>
                  <input
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    value={password}
                    id="password"
                    type="password"
                    className="h-full w-full border"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-red-900 text-[10px] sm:text-[15px] md:text-20px sm:p-111 rounded-md sm:rounded-xl cursor-pointer text-white mr-4 hover:bg-red-950"
                  >
                    Submit
                  </button>
                  {showError && (
                    <div className="text-red-500 font-bold">
                      Error, Wrong Password
                    </div>
                  )}
                </div>
              </form>
          </div>
        )}
        {!openModel &&( <div
          className={`"flex flex-col w-full  mx-auto mt-5 sm:w-[80%]" ${
            openModel ? "-z-10 opacity-80 bg-slate-300" : ""
          }`}
        >
          <p className="w-full text-center ml-9 sm:ml-0 text-[22px] font-semibold my-3">
            Publications
          </p>
          <ol className="w-[80%] sm:w-full h-auto ml-9  my-3 bg-[#D9D9D969]">
            {publications?.map((publication, index) => (
              <div
                key={index}
                className="flex w-full h-[80px] items-center justify-between p-3"
              >
                <p className="flex gap-3">
                  <p className="text-[14px] sm:text-[16px] font-medium ">
                    {publication?.title}
                  </p>
                </p>
                <div
                  className="w-[15%] h-full flex items-center cursor-pointer"
                  onClick={() => handlePdfClick(publication)}
                >
                  <img
                    src={pdf}
                    alt="pdf"
                    className="w-full h-[95%] object-contain"
                  />
                </div>
              </div>
            ))}
          </ol>
        </div>)}
      </div>
      

      <Suspense fallback={<Loading />}>
        <div className="w-full">
          <Subscription />
          <Footer />
        </div>
      </Suspense>
    </div>
  );
};

export default Publications;
