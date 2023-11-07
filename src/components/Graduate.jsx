import { lazy, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RegisterSection from "./RegisterSection";
import { program } from "../assets";
import { programs } from "../constants";
import { useNavigate } from "react-router-dom";

const HeroHeader = lazy(() => import("./HeroHeader"));

const Graduate = ({ pIndex }) => {
  const [programIndex, setProgramIndex] = useState(pIndex);
  const [course, setCourse] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

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

  const handleReadMore = () => {
    // Implement your functionality here
  };

  return (
    <div className={`${scrolled ? "flex flex-col" : ""}`}>
      {scrolled && <Navbar active="ACADEMICS" scrolled={scrolled} />}
      <HeroHeader />
      <div className="w-full h-[616px] relative">
        <div
          className={`w-full h-full bg-black bg-opacity-20 absolute top-0 left-0 flex flex-col ${
            scrolled ? "justify-end" : "justify-between"
          } items-center text-white`}
        >
          {scrolled || <Navbar active="ACADEMICS" scrolled={scrolled} />}

          <div className="w-[60%] h-[15%] flex flex-col ">
            <div className="w-full h-[60%] text-center pt-2 bg-red-900">
              {course == "" ? (
                <p className="text-[20px] font-bold text-white">
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

      <div className="flex w-full h-auto justify-around  ">
        <div
          className={` h-[350px] w-[14%] flex flex-col justify-center px-4 py-3 my-4 shadow-2xl shadow-black`}
        >
          {programs.map((program, index) => (
            <div
              className={`${
                program.title === programs[programIndex].title
                  ? "bg-red-900 text-[#D9D9D9]"
                  : "bg-[#D9D9D9] text-black"
              } w-full h-[60px] p-3 hover:bg-red-700 flex items-center`}
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
                } w-full h-[60px] bg-[#D9D9D9] hover:text-slate-500 p-1 pl-10 flex items-center cursor-pointer  text-[15px]`}
                key={index}
                onClick={() => {
                  setCourse(item);
                }}
              >
                {item.title} | {item.fullTitle}
              </div>
            </div>
          ))}
        </div>

        {course == "" ? (
          <div className="flex flex-wrap my-4 items-center justify-around w-[80%] h-auto">
            {programs[programIndex].items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col h-[90%] md:h-full w-[28%] my-3  hover:bg-red-900 hover:text-white items-center justify-center"
              >
                <img
                  src={`${item.img}`}
                  alt={`Image ${item.index}`}
                  className="h-[65%] md:h-[70%] w-full object-contain mt-0"
                />
                <p className="text-[14px] h-[18%] md:h-[22%] md:w-[70%]  md:text-[18px] text-center my-2">
                  {item.title} | {item.fullTitle}
                </p>
                <button
                  className="bg-red-800 drop-shadow-2xl h-[10%] text-white font-semibold w-[50%] md:w-[30%] p-2 text-[12px] hover:bg-red-950 mb-2"
                  onClick={handleReadMore}
                >
                  Read more
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-around w-[80%] h-auto my-4">
            <p className="w-full text-justify my-2 h-auto text-[14px] text-black font-light">
              {course.desc}
            </p>
            <p className="w-full text-center text-[22px] font-semibold my-3">
              Salient Features
            </p>
            <ol className="w-full h-auto my-3 list-disc">
              {course.features.map((feature, index) => {
                return (
                  <li className="font-light text-[14px] my-2">{feature}</li>
                );
              })}
            </ol>

            <p className="w-full text-center text-[22px] font-semibold my-3">
              Requirements
            </p>
            <ol className="w-full h-auto my-3 list-disc">
              {course.requirements.map((requirement, index) => {
                return (
                  <li className="font-light text-[14px] my-2">{requirement}</li>
                );
              })}
            </ol>

            <div className="w-full flex  justify-center my-3">
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
