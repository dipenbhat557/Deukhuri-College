import React, { useEffect, useState, lazy, Suspense } from "react";
import { admissionBg } from "../assets";
import { programs } from "../constants";
import Loading from "./Loading";

// Lazy-loaded components
const Footer = lazy(() => import("./Footer"));
const HeroHeader = lazy(() => import("./HeroHeader"));
const Navbar = lazy(() => import("./Navbar"));
const Subscription = lazy(() => import("./Subscriptions"));

const Admission = () => {
  const handleApply = () => {};

  const [scrolled, setScrolled] = useState(false);

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

  return (
    <div className={`${scrolled ? "flex flex-col" : ""}`}>
      <Suspense fallback={<Loading />}>
        {scrolled && <Navbar active="ADMISSION" scrolled={scrolled} />}
        <HeroHeader />
      </Suspense>

      <div className="w-full h-[500px] sm:h-[616px] relative">
        <img
          src={admissionBg}
          alt="Admission BG"
          className="w-full h-full object-cover -z-10"
        />

        <Suspense fallback={<Loading />}>
          <div
            className={`w-full h-full bg-black bg-opacity-20 absolute top-0 left-0 flex flex-col ${
              scrolled ? "justify-end" : "justify-between"
            } items-center text-white`}
          >
            {scrolled || <Navbar active="ADMISSION" scrolled={scrolled} />}

            <div className="w-[60%] h-[15%] flex flex-col ">
              <div className="w-full h-[60%] text-center pt-2 bg-red-900">
                <p className="text-[20px] font-bold text-white">Admission</p>
              </div>
              <div className="w-full h-[40%] bg-white" />
            </div>
          </div>
        </Suspense>
      </div>

      {programs.map((program, index) => {
        return (
          <div
            key={index}
            className="flex flex-col items-center justify-around w-full p-3 px-3 sm:px-8"
          >
            <p className="uppercase text-[16px] sm:text-[20px] font-semibold ">
              {program.title}
            </p>
            <p className="text-[13px] sm:text-[15px] font-semibold m-3 text-slate-600 w-[70%] text-center">
              {program.desc}
            </p>

            <div className="flex justify-between flex-wrap w-full h-auto ">
              {program.items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col h-[90%] md:h-full w-full sm:w-[40%] mt-8 pb-6  mx-5 hover:bg-red-900 hover:text-white  justify-around"
                  >
                    <img
                      src={`${item.img}`}
                      alt={`Image-${index}`}
                      className="h-[65%] md:h-[70%] w-full object-contain mt-0"
                    />
                    <p className="text-[14px] h-[18%] md:h-[22%]   md:text-[18px]  my-2 px-3">
                      {item.title} | {item.fullTitle}
                    </p>
                    <p className="text-[14px] h-[18%] md:h-[22%]  md:text-[15px]  my-2 px-3">
                      {item.content}
                    </p>
                    <div className="w-full flex items-center justify-center px-3 mt-4">
                      <button
                        className="h-[10%]   shadow-lg shadow-black  w-[50%] md:w-[30%] p-2 text-[14px] hover:bg-red-950 mb-2"
                        onClick={handleApply}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <Suspense fallback={<Loading />}>
        <div className="w-full">
          <Subscription />
          <Footer />
        </div>
      </Suspense>
    </div>
  );
};

export default Admission;
