import React, { Suspense, lazy, useEffect, useState } from "react";
import { contactBg, pdf } from "../assets";
import Footer from "./Footer";
import HeroHeader from "./HeroHeader";
import Navbar from "./Navbar";
import Subscription from "./Subscriptions";
import useFetch from "./UseFetch";

// TODO: Fix this in future
const HARDCODED_PASSWORD = "DMC62";

// Lazy-loaded components
const Loading = lazy(() => import("./Loading"));

const Contact = () => {
  const [scrolled, setScrolled] = useState(false);
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handlePasswordSubmit = () => {
    // TODO: Use server
    setPasswordCorrect(password === HARDCODED_PASSWORD);
    if (password !== HARDCODED_PASSWORD) {
      setShowError(true);
    }
  };

  let publications = useFetch(
    `${import.meta.env.VITE_APP_API_ROOT}/publications`
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

  if (!passwordCorrect) {
    return (
      <div className={`${scrolled ? "flex flex-col" : ""}`}>
        <Suspense fallback={<Loading />}>
          {scrolled && <Navbar active="" scrolled={scrolled} />}
          <HeroHeader />
        </Suspense>

        <form
          className="flex flex-col items-center lg:p-36 py-36 border border-red-950 lg:m-36"
          onSubmit={(e) => e.preventDefault()}
        >
          <h2 className="text-xl text-center font-bold">
            Inorder to access the page
          </h2>
          <h3 className="text-center">Please Enter The Password</h3>
          <div className="flex gap-1 w-96 justify-center items-center flex-col">
            <label htmlFor="password">Password: </label>
            <input
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
              value={password}
              id="password"
              type="password"
              className="h-full w-full border"
            />
            <button
              onClick={handlePasswordSubmit}
              className="p-2 bg-red-900 text-[10px] sm:text-[15px] md:text-20px sm:p-111 rounded-md sm:rounded-xl cursor-pointer text-white mr-4 hover:bg-red-950"
            >
              Submit
            </button>
            <div
              className="text-red-500 font-bold"
              style={{
                opacity: showError ? 100 : 0,
              }}
            >
              Error, Wrong Password
            </div>
          </div>
        </form>

        <Suspense fallback={<Loading />}>
          <div className="w-full">
            <Footer />
          </div>
        </Suspense>
      </div>
    );
  }

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
