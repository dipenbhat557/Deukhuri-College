import { lazy, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RegisterSection from "./RegisterSection";
import { programs } from "../constants";
import { styles } from "../styles";
import { program } from "../assets";

const HeroHeader = lazy(() => import("./HeroHeader"));

const Graduate = () => {
  const [programIndex, setProgramIndex] = useState(0);

  const handleReadMore = () => {
    // Implement your functionality here
  };

  return (
    <>
      <HeroHeader />

      <div className="w-full h-[616px] relative">
        <img
          src={program}
          alt="Graduate BG"
          className="w-full h-full object-cover -z-10"
        />

        <div className="w-full h-full bg-black bg-opacity-5 absolute top-2 left-0 flex flex-col justify-between items-center text-white">
          <Navbar active="ACADEMICS" style={{ background: "transparent" }} />

          <div className="w-[60%] h-[15%] flex flex-col ">
            <div className="w-full h-[60%] text-center pt-2 bg-red-900">
              <p className="text-[20px] font-bold text-white">
                {programs[programIndex].title}
              </p>
            </div>
            <div className="w-full h-[40%] bg-white" />
          </div>
        </div>
      </div>

      <div className="flex w-full h-auto justify-around items-center">
        <div className={`${styles.padding} h-full w-[24%] flex flex-col `}>
          {programs.map((program, index) => (
            <div
              className={`${
                program.title === programs[programIndex].title
                  ? "bg-red-900 text-white"
                  : "bg-[#D9D9D9] "
              } w-full h-[80px] p-3 hover:bg-red-900 flex items-center `}
              key={index}
              onClick={() => setProgramIndex(index)}
            >
              {program.title}
            </div>
          ))}
          {programs[programIndex].items.map((item, index) => (
            <div
              className="w-full h-[80px] bg-[#D9D9D9] hover:text-slate-600 cursor-pointer p-3 pl-10 flex items-center text-slate-800 text-[15px]"
              key={index}
            >
              {item.title} | {item.fullTitle}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-around w-[80%] h-auto">
          {programs[programIndex].items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col h-[90%] md:h-full w-[28%]   hover:bg-red-900 hover:text-white items-center justify-center"
            >
              <img
                src={`${item.img}`}
                alt={`Image ${item.index}`}
                className="h-[65%] md:h-[70%] w-full object-contain mt-0"
              />
              <p className="text-[14px] h-[18%] md:h-[22%] md:w-[70%]  md:text-[18px] text-center my-2">
                {item.title}
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
      </div>

      <div className="w-full">
        <RegisterSection />
        <Footer />
      </div>
    </>
  );
};

export default Graduate;
