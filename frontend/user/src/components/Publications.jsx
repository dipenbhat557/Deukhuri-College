import React, { Suspense, lazy, useEffect, useState } from "react";
import axios from "axios"; // Don't forget to import axios
import { contactBg, pdf, writingNote } from "../assets";
import Footer from "./Footer";
import HeroHeader from "./HeroHeader";
import Navbar from "./Navbar";
import Subscription from "./Subscriptions";
import Model from "./Model";
import { RxCrossCircled } from "react-icons/rx";

const HARDCODED_PASSWORD = "DMC62";

const Loading = lazy(() => import("./Loading"));

const ANNEX_LIST = [
  { title: "Annex I", file: "https://drive.google.com/file/d/17XQRRg-Hzwc0KmcFerpc5KgqOh7T1903/view?usp=drive_link", hidden: false, type: "Annex" },
  { title: "Annex II", file: "https://drive.google.com/file/d/1XoM4yqBbvufITJ3yPgSoZckLGzjE5Sqj/view?usp=drive_link", hidden: false, type: "Annex" },
  { title: "Annex III", file: "https://drive.google.com/file/d/1nF7QHaKoWdatLKYZJsie_NvjQkncYccS/view?usp=drive_link", hidden: false, type: "Annex" },
  { title: "Annex IV", file: "https://drive.google.com/file/d/1E6tg932fsZP0w4bpPsTKhlrPk_pHARqd/view?usp=drive_link", hidden: false, type: "Annex" },
  { title: "Annex V", file: "https://drive.google.com/file/d/1t8_As1mhPIbuVphdidK23OH2HVqxqkzD/view?usp=drive_link", hidden: false, type: "Annex" },
  { title: "Annex VI", file: "https://drive.google.com/file/d/1JVDYmh7uGcngPbDIAydKsJw-7QY_e9fD/view?usp=drive_link", hidden: false, type: "Annex" },
  { title: "Annex VII", file: "https://drive.google.com/file/d/1F21h4MHiSVJzOZ25iTiVLEPbTCE8XTGo/view?usp=drive_link", hidden: false, type: "Annex" },
  { title: "Annex VIII", file: "https://drive.google.com/file/d/16Q1QC24q66FYO1Ggku1EGPy0uvYnqLSi/view?usp=drive_link", hidden: false, type: "Annex" },
  { title: "Annex IX", file: "https://drive.google.com/file/d/14tBh6EqM0H15xnmZTBpD8Z7DjxXYFj8-/view?usp=drive_link", hidden: false, type: "Annex" },
];

function normalizeType(t) {
  if (t == null) return "Other";
  const s = String(t).trim();
  return s === "" ? "Other" : s;
}

const Publications = () => {
  const [scrolled, setScrolled] = useState(false);
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [openModel, setOpenModel] = useState(true);
  const [publications, setPublications] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [selectedPublication, setSelectedPublication] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_ROOT}/api/publication`
        );
        const receivedData = response?.data ?? [];
        const normalized = (Array.isArray(receivedData) ? receivedData : []).map((p) => ({
          ...p,
          type: normalizeType(p.type),
        }));
        setPublications([...ANNEX_LIST, ...normalized]);
      } catch (error) {
        console.error("Error fetching publications:", error);
        setPublications([...ANNEX_LIST]);
      }
    };

    fetchDocuments();
  }, []);

  const tabs = React.useMemo(() => {
    const types = [...new Set(publications.map((p) => p.type))];
    types.sort((a, b) => (a === "Other" ? 1 : b === "Other" ? -1 : a.localeCompare(b)));
    return types;
  }, [publications]);

  React.useEffect(() => {
    if (tabs.length > 0 && (activeTab === null || !tabs.includes(activeTab))) {
      setActiveTab(tabs[0]);
    }
  }, [tabs, activeTab]);

  const publicationsInTab = activeTab
    ? publications.filter((p) => p.type === activeTab)
    : publications;

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
    const byteNumbers = new Array(byteCharacters.length)
      .fill()
      .map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });
    return URL.createObjectURL(blob);
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    if (password === HARDCODED_PASSWORD) {
      setPasswordCorrect(true);
      setShowError(false);
      // window.open(createBlobUrl(selectedPublication?.file), '_blank');
      setOpenModel(false);
    } else {
      setPasswordCorrect(false);
      setShowError(true);
    }
  };

  const handlePdfClick = async (publication) => {
    // if (publication.hidden) {
    //   setSelectedPublication(publication);
    //   setOpenModel(true);
    // } else {
    if (publication?.title?.slice(0, 5) === "Annex") {
      window.open(publication?.file, "_blank");
    } else {
      // Fetch the PDF from the backend on-demand
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_ROOT}/api/publication/${publication.id}/file`,
          { responseType: 'arraybuffer' }
        );
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, "_blank");
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    }

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
            className={`w-full h-full bg-black bg-opacity-20 absolute top-0 left-0 flex flex-col ${scrolled ? "justify-end" : "justify-between"
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
        {!openModel && (
          <div
            className={`flex flex-col w-full mx-auto mt-5 sm:w-[80%] ${openModel ? "-z-10 opacity-80 bg-slate-300" : ""}`}
          >
            <p className="w-full text-center ml-9 sm:ml-0 text-[22px] font-semibold my-3">
              Publications
            </p>
            {tabs.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3 ml-9 sm:ml-0 border-b border-stroke pb-2">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "bg-red-900 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}
            <ol className="w-[80%] sm:w-full h-auto ml-9 my-3 bg-[#D9D9D969]">
              {publicationsInTab?.map((publication, index) => (
                <div
                  key={publication?.id ?? `annex-${index}`}
                  className="flex w-full h-[80px] items-center justify-between p-3"
                >
                  <p className="flex gap-3">
                    <span className="text-[14px] sm:text-[16px] font-medium">
                      {publication?.title}
                    </span>
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
          </div>
        )}
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
