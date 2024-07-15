import { lazy, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RegisterSection from "./RegisterSection";
import { pdf, program } from "../assets";
import { programs } from "../constants";
import { useNavigate } from "react-router-dom";
import useFetch from "./UseFetch";
import axios from "axios";

const HeroHeader = lazy(() => import("./HeroHeader"));

const Graduate = ({ pIndex }) => {
  const [programIndex, setProgramIndex] = useState(pIndex);
  const [course, setCourse] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const [graduateResults,setGraduateResults] = useState([])
  const [underGraduateResults,setUnderGraduateResults] = useState([])
  const [underGraduateSyllabus,setUnderGraduateSyllabus] = useState([])
  const [graduateSyllabus,setGraduateSyllabus] = useState([])

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const resultResponse = await axios.get(
          `${import.meta.env.VITE_APP_API_ROOT}/api/result`
        );
        let recievedResult = await resultResponse?.data;
        
        setGraduateResults(recievedResult?.filter(d=> d?.program === "GRADUATE"))
        
        setUnderGraduateResults(receivedData?.filter(d=> d?.program === "UNDERGRADUATE"))

        const syllabusResponse = await axios.get(
          `${import.meta.env.VITE_APP_API_ROOT}/api/syllabus`
        );
        let recievedResponse = await syllabusResponse?.data;
        
        setGraduateSyllabus(recievedResponse?.filter(d=> d?.program === "GRADUATE"))
        
        setUnderGraduateSyllabus(recievedResponse?.filter(d=> d?.program === "UNDERGRADUATE"))
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

  return (
    <div className={`${scrolled ? "flex flex-col" : ""}`}>
      {scrolled && <Navbar active="ACADEMICS" scrolled={scrolled} />}
      <HeroHeader />
      <div className="w-full h-[500px] sm:h-[616px] relative">
        <div
          className={`w-full h-full bg-black bg-opacity-20 absolute top-0 left-0 flex flex-col ${
            scrolled ? "justify-end" : "justify-between"
          } items-center text-white`}
        >
          {scrolled || <Navbar active="ACADEMICS" scrolled={scrolled} />}

          <div className="w-[60%] h-[15%] flex flex-col ">
            <div className="w-full h-[60%] text-center pt-2 bg-red-900">
              {course == "" ? (
                <p className="text-[16px] sm:text-[20px] font-bold text-white">
                  {programs[programIndex].title}
                </p>
              ) : (
                <p className="text-[20px] font-bold text-white">
                  {course.title} | {course.fullTitle}
                </p>
              )}
            </div>
            <div className="w-full h-[40%] bg-white" />
          </div>
        </div>
        <img
          src={program}
          alt="Graduate BG"
          className="w-full h-full object-cover -z-10"
        />
      </div>

      <div className="flex flex-col sm:flex-row w-full h-auto justify-around  ">
        <div
          className={`h-[300px] sm:h-[350px] w-[90%] mx-4 sm:mx-0 sm:w-[14%] flex flex-col justify-center px-4 py-3 my-4 shadow-2xl shadow-black`}
        >
          {programs.map((program, index) => (
            <div
              className={`${
                program.title === programs[programIndex].title
                  ? "bg-red-900 text-[#D9D9D9]"
                  : "bg-[#D9D9D9] text-black"
              } w-full h-[50px] sm:h-[60px] p-3 hover:text-slate-500 flex items-center text-[14px] sm:text-[16px] cursor-pointer`}
              key={index}
              onClick={() => {
                setProgramIndex(index);
                setCourse("");
              }}
            >
              {program.title}
            </div>
          ))}
          {programs[programIndex].items.map((item, index) => (
            <div
              key={index}
              className="flex items-center flex-col justify-center w-full h-auto bg-[#D9D9D9]"
            >
              <div className=" border-t-2  border-slate-600 border-opacity-50 w-[80%]" />
              <div
                className={`${
                  item == course ? "text-slate-900" : "text-slate-600"
                } w-full h-[50px] sm:h-[60px] bg-[#D9D9D9] hover:text-slate-500 p-1 pl-10 flex items-center cursor-pointer text-[13px] sm:text-[15px]`}
                key={index}
                onClick={() => setCourse(item)}
              >
                {item.title} | {item.fullTitle}
              </div>
            </div>
          ))}
        </div>

        {course == "" ? (
          <div className="flex flex-wrap my-4 items-center justify-around w-full sm:w-[80%] h-auto">
            {programs[programIndex].items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col h-[90%] md:h-full w-[45%] sm:w-[28%] my-3  hover:bg-red-900 hover:text-white items-center justify-center"
              >
                <img
                  src={`${item.img}`}
                  alt={`Image ${item.index}`}
                  className="h-[65%] md:h-[70%] w-full object-cover mt-0"
                />
                <p className="text-[14px] h-[20%] md:h-[22%] md:w-[70%]  md:text-[18px] text-center my-2">
                  {item.title} | {item.fullTitle}
                </p>
                <button
                  className="bg-red-800 drop-shadow-2xl h-[10%] text-white font-semibold w-[50%] md:w-[30%] p-2 text-[12px] hover:bg-red-950 mb-2"
                  onClick={() => setCourse(item)}
                >
                  Read more
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-around w-[80%] h-auto my-4">
            <p className="w-full text-justify ml-9 sm:ml-0 my-2 h-auto text-[14px] text-black font-light">
              {course.desc}
            </p>
            <p className="w-full text-center ml-9 sm:ml-0 text-[22px] font-semibold my-3">
              Salient Features
            </p>
            <ol className="w-full h-auto ml-9 sm:ml-0 my-3 list-disc">
              {course.features.map((feature, index) => {
                return (
                  <li key={index} className="font-light text-[14px] my-2">
                    {feature}
                  </li>
                );
              })}
            </ol>

            <p className="w-full text-center ml-9 sm:ml-0 text-[22px] font-semibold my-3">
              Results
            </p>
            <ol className="w-full h-auto ml-9 sm:ml-0 my-3 bg-[#D9D9D969]">
              {programIndex == 0
                ? graduateResults?.map((result, index) => {
                    return (
                      <div
                        key={index}
                        className="flex w-full h-[80px] items-center justify-between p-3"
                      >
                        <p className="flex gap-3">
                          
                          <p className="text-[14px] sm:text-[16px] font-medium ">
                            {result?.title}
                          </p>
                        </p>
                        <a
                          className="w-[15%] h-full flex items-center"
                          href={createBlobUrl(result?.img)}
                          target="_blank"
                        >
                          <img
                            src={pdf}
                            alt="pdf"
                            className="w-full h-[95%] object-contain"
                          />
                        </a>
                      </div>
                    );
                  })
                : underGraduateResults?.map((result, index) => {
                    return (
                      <div
                        key={index}
                        className="flex w-full h-[80px] items-center justify-between p-3"
                      >
                        <p className="flex gap-3">
                          
                          <p className="text-[14px] sm:text-[16px] font-medium ">
                            {result?.title}
                          </p>
                        </p>
                        <a
                          className="w-[15%] h-full flex items-center"
                          href={createBlobUrl(result?.img)}
                          target="_blank"
                        >
                          <img
                            src={pdf}
                            alt="pdf"
                            className="w-full h-[95%] object-contain"
                          />
                        </a>
                      </div>
                    );
                  })}
            </ol>

            <p className="w-full text-center ml-9 sm:ml-0 text-[22px] font-semibold my-3">
              Syllabus
            </p>
            <ol className="w-full h-auto ml-9 sm:ml-0 my-3 bg-[#D9D9D969]">
              {programIndex == 0
                ? graduateSyllabus?.map((syllabus, index) => {
                    return (
                      <div
                        key={index}
                        className="flex w-full h-[80px] items-center justify-between p-3"
                      >
                        <p className="flex gap-3">
                          
                          <p className="text-[14px] sm:text-[16px] font-medium ">
                            {syllabus?.title}
                          </p>
                        </p>
                        <a
                          className="w-[15%] h-full flex items-center"
                          href={createBlobUrl(syllabus?.img)}
                          target="_blank"
                        >
                          <img
                            src={pdf}
                            alt="pdf"
                            className="w-full h-[95%] object-contain"
                          />
                        </a>
                      </div>
                    );
                  })
                : underGraduateSyllabus?.map((syllabus, index) => {
                    return (
                      <div
                        key={index}
                        className="flex w-full h-[80px] items-center justify-between p-3"
                      >
                        <p className="flex gap-3">
                          
                          <p className="text-[14px] sm:text-[16px] font-medium ">
                            {syllabus?.title}
                          </p>
                        </p>
                        <a
                          className="w-[15%] h-full flex items-center"
                          href={createBlobUrl(syllabus?.img)}
                          target="_blank"
                        >
                          <img
                            src={pdf}
                            alt="pdf"
                            className="w-full h-[95%] object-contain"
                          />
                        </a>
                      </div>
                    );
                  })}
            </ol>

            <p className="w-full text-center ml-9 sm:ml-0 text-[22px] font-semibold my-3">
              Requirements
            </p>
            <ol className="w-full ml-9 sm:ml-0 h-auto my-3 list-disc">
              {course.requirements.map((requirement, index) => {
                return (
                  <li key={index} className="font-light text-[14px] my-2">
                    {requirement}
                  </li>
                );
              })}
            </ol>

            <div className="w-full flex ml-9 sm:ml-0  justify-center my-3">
              <button className="px-3 py-1 w-[20%] bg-red-900 text-white shadow-lg shadow-black">
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="w-full">
        <RegisterSection />
        <Footer />
      </div>
    </div>
  );
};

export default Graduate;
