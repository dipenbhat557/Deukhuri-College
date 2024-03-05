import React, { Suspense, lazy, useEffect, useState } from "react";
import { contactBg, pdf } from "../assets";
import Footer from "./Footer";
import HeroHeader from "./HeroHeader";
import Navbar from "./Navbar";
import Subscription from "./Subscriptions";
import useFetch from "./UseFetch";

// Lazy-loaded components
const Loading = lazy(() => import("./Loading"));

const Contact = () => {
  const [scrolled, setScrolled] = useState(false);

  const [loading, setLoading] = useState(false);

  let publications = useFetch(
    `${import.meta.env.VITE_APP_API_ROOT}/publications`,
  );
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

      <div className="flex flex-col w-full mx-auto mt-5 sm:w-[80%]">
        <p className="w-full text-center ml-9 sm:ml-0 text-[22px] font-semibold my-3">
          Publications
        </p>
        <ol className="w-[80%] sm:w-full h-auto ml-9  my-3 bg-[#D9D9D969]">
          {publications?.map((publication, index) => {
            return (
              <div
                key={index}
                className="flex w-full h-[80px] items-center justify-between p-3"
              >
                <p className="flex gap-3">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: publication?.content?.rendered,
                    }}
                    className="text-[14px] sm:text-[16px] font-medium"
                  ></p>
                  <p className="text-[14px] sm:text-[16px] font-medium ">
                    {publication?.title?.rendered}
                  </p>
                </p>
                <a
                  className="w-[15%] h-full flex items-center"
                  href={publication?.imageUrl}
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
export default Contact;
