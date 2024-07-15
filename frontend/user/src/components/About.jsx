import React, { useState, useEffect, lazy, Suspense } from "react";
import { aboutBg, pdf } from "../assets";
import { aboutItems } from "../constants";
import Loading from "./Loading";
import axios from "axios";

const Footer = lazy(() => import("./Footer"));
const HeroHeader = lazy(() => import("./HeroHeader"));
const Navbar = lazy(() => import("./Navbar"));
const RegisterSection = lazy(() => import("./RegisterSection"));
const Specifications = lazy(() => import("./Specifications"));

const About = () => {
  const [scrolled, setScrolled] = useState(false);
  const [rules, setRules] = useState([]);
  const [statutes, setStatutes] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_ROOT}/api/rule`
        );
        const r = await response.data;
        setRules(r);
        console.log('Fetched rules:', r);

        const statRes = await axios.get(
          `${import.meta.env.VITE_APP_API_ROOT}/api/statute`
        );
        const s = await statRes.data;
        setStatutes(s);
        console.log('Fetched statutes:', s);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  useEffect(() => {
    console.log('Updated rules state:', rules);
  }, [rules]);

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
      <Suspense fallback={<Loading />}>
        {scrolled && <Navbar active="ABOUT" scrolled={scrolled} />}
        <HeroHeader />
      </Suspense>

      <div className="w-full h-[500px] sm:h-[616px] relative">
        <div
          className={`w-full h-full bg-black bg-opacity-20 absolute top-0 left-0 flex flex-col ${
            scrolled ? "justify-end" : "justify-between"
          } items-center text-white`}
        >
          <Suspense fallback={<Loading />}>
            {!scrolled && <Navbar active="ABOUT" scrolled={scrolled} />}
          </Suspense>

          <div className="w-[60%] h-[15%] flex flex-col ">
            <div className="w-full h-[60%] text-center pt-2 bg-red-900">
              <p className="text-[20px] font-bold text-white">
                About Deukhuri Multiple Campus
              </p>
            </div>
            <div className="w-full h-[40%] bg-white" />
          </div>
        </div>
        <img
          src={aboutBg}
          alt="Graduate BG"
          className="w-full h-full object-cover -z-10"
        />
      </div>

      <div className={`p-4 flex w-full h-auto justify-between`}>
        <div className="h-full w-[18%] hidden sm:flex flex-col shadow-xl p-3 bg-red-900 text-white">
          About Deukhuri Multiple Campus
        </div>

        <div className="flex flex-col h-full w-[90%] sm:w-[70%] mx-2 sm:mr-32">
          <p className="text-[14px] font-light w-full text-justify">
            Deukhuri Multiple Campus was established in 2005 AD (2062 BS) as a
            community campus located in Lamahi, Deukhuri, Dang district of
            Nepal. This campus is running with the support of community people
            and the University Grants Commission of Nepal. It is affiliated with
            Tribhuvan University (TU) for Bachelor and Master Degree programs.
            It has been imparting quality education in the faculties of
            Management, Arts, and Science. <br /> <br /> Deukhuri Multiple Campus
            offers Bachelor level and Master level programs such as Bachelor of
            Arts (BA), Bachelor of Education (B.Ed.), Bachelor of Business
            Studies (BBS), and Master of Education (M.Ed.) programs. It provides
            various facilities such as Library, Sports, Cafeteria, Labs,
            Multimedia, Internet, E-library, Journal, Counselling, Educational
            Tours, Scholarship, Conference, and Internship for deserving
            students.
          </p>

          <Suspense fallback={<Loading />}>
            <Specifications />
          </Suspense>

          <p className="text-[16px] font-semibold my-3">
            Rules and Regulations
          </p>
          <ul  className="flex list-disc flex-col gap-3 w-full h-auto">
            {rules?.[0]?.rules?.map((r, i) => (
              <li
                key={i}
                className="text-[14px] my-3 font-light text-justify"
              >
                {r}
              </li>
            ))}
          </ul>

          <p className="text-[16px] font-semibold my-3">Statute of Campus</p>

          <ol className="w-[80%] sm:w-full h-auto ml-9 sm:ml-0 my-3 bg-[#D9D9D969]">
            {statutes?.map((statute, index) => {
              return (
                <div
                  key={index}
                  className="flex w-full h-[60px] items-center justify-between p-3"
                >
                  <div className="flex gap-3">
                    <p className="text-[14px] sm:text-[16px] font-medium">
                      {statute?.title}
                    </p>
                  </div>
                  <a
                    className="w-[15%] h-full flex items-center"
                    href={createBlobUrl(statute?.img)}
                    target="_blank"
                    rel="noopener noreferrer"
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

          <p className="text-[16px] font-semibold my-3">
            Our Missions and Values
          </p>

          <p className="text-[14px] my-3 font-light text-justify">
            The mission of DMC is to develop itself as a leading academic
            institution ensuring quality education in various disciplines and
            research activities through dedicated human resources at affordable
            costs to the marginalized and economically deprived students to
            improve their quality of life contributing to local and national
            community.
          </p>

          <div className="flex flex-wrap justify-between w-full h-auto">
            {aboutItems.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col justify-around m-3 w-full sm:w-[40%] h-auto sm:h-[150px] text-justify"
                >
                  <p className="text-[16px] font-semibold">{item.title}</p>
                  <p className="text-[14px] font-light text-slate-600">
                    {item.content}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Suspense fallback={<Loading />}>
        <div className="w-full">
          <RegisterSection />
          <Footer />
        </div>
      </Suspense>
    </div>
  );
};

export default About;
