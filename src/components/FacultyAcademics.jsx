import { useEffect, useState } from "react";
import { facultyAcademicsBg } from "../assets";
import { styles } from "../styles";
import Footer from "./Footer";
import HeroHeader from "./HeroHeader";
import Navbar from "./Navbar";
import RegisterSection from "./RegisterSection";
import Subscription from "./Subscriptions";
import { faculties } from "../constants";

const FacultyAcademics = () => {
  const [facultyIndex, setFacultyIndex] = useState(0);

  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= 105) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    // const debouncedHandleScroll = debounce(handleScroll, 100); // Adjust the delay time (in milliseconds) as needed
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${scrolled ? "flex flex-col" : ""}`}>
      {scrolled && <Navbar active="FACULTY" scrolled={scrolled} />}
      <HeroHeader />

      <div className="w-full h-[616px] relative">
        <img
          src={facultyAcademicsBg}
          alt="Graduate BG"
          className="w-full h-full object-cover -z-10"
        />

        <div
          className={`w-full h-full bg-black bg-opacity-5 absolute top-2 left-0 flex flex-col ${
            scrolled ? "justify-end" : "justify-between"
          } items-center text-white`}
        >
          {scrolled || <Navbar active="FACULTY" scrolled={scrolled} />}

          <div className="w-[60%] h-[15%] flex flex-col ">
            <div className="w-full h-[60%] text-center pt-2 bg-red-900">
              <p className="text-[20px] font-bold text-white">Faculty</p>
            </div>
            <div className="w-full h-[40%] bg-white" />
          </div>
        </div>
      </div>

      <div className={`p-4 flex w-full h-auto  justify-between`}>
        <div className="h-full w-[18%] flex flex-col shadow-xl p-3">
          <div
            className={` ${
              facultyIndex == 0
                ? "bg-red-900 text-white"
                : "bg-slate-400 text-black"
            } text-[16px] p-3`}
            onClick={() => setFacultyIndex(0)}
          >
            Academic Team
          </div>
          <div
            className={` ${
              facultyIndex == 1
                ? "bg-red-900 text-white"
                : "bg-slate-400 text-black"
            } text-[16px] p-3`}
            onClick={() => setFacultyIndex(1)}
          >
            Administrative Team
          </div>
        </div>

        <div className="flex flex-col h-full w-[75%] ">
          <p className="text-[14px] font-light w-full ">
            At our campus DMC, we pride ourselves on our exceptional academic
            faculty, comprising a diverse and accomplished group of educators
            and scholars. Our faculty members are experts in their respective
            fields, dedicated to fostering a vibrant learning environment that
            encourages intellectual curiosity and critical thinking. With a
            commitment to excellence in teaching, research, and mentorship, they
            bring a wealth of real-world experience and a passion for imparting
            knowledge to the next generation of leaders. Through their guidance
            and support, students have the opportunity to engage in rigorous
            academic exploration, interdisciplinary collaboration, and practical
            application, ensuring a holistic and enriching educational
            experience that prepares them for success in their chosen careers
            and beyond."
          </p>
          <p className="text-[16px] font-semibold my-3">
            {faculties[facultyIndex].title}
          </p>

          <div className="w-full h-auto flex flex-wrap items-center justify-between">
            {faculties[facultyIndex].content.map((faculty, index) => {
              return (
                <div
                  key={index}
                  className="w-[28%] h-auto flex flex-col justify-around m-3 shadow-xl hover:bg-red-900 hover:text-white "
                >
                  <img
                    className="w-full h-[65%] object-contain"
                    src={faculty.img}
                    alt={`faculty-${index}`}
                  />
                  <p className="text-[18px] font-semibold h-[18%] p-3">
                    {faculty.name}
                  </p>
                  <p className="text-[16px] h-[18%] text-slate-400 hover:text-slate-200 p-3">
                    {faculty.post}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full">
        <Subscription />
        <Footer />
      </div>
    </div>
  );
};
export default FacultyAcademics;
