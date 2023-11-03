import { useState } from "react";
import { facultyAdminBg } from "../assets";
import { styles } from "../styles";
import Footer from "./Footer";
import HeroHeader from "./HeroHeader";
import Navbar from "./Navbar";
import RegisterSection from "./RegisterSection";
import Subscription from "./Subscriptions";
import { faculties } from "../constants";

const FacultyAdministrative = () => {
  const [facultyIndex, setFacultyIndex] = useState(1);

  return (
    <>
      <HeroHeader />

      <div className="w-full h-[616px] relative">
        <img
          src={facultyAdminBg}
          alt="Graduate BG"
          className="w-full h-full object-cover -z-10"
        />

        <div className="w-full h-full bg-black bg-opacity-5 absolute top-2 left-0 flex flex-col justify-between items-center text-white">
          <Navbar active="FACULTY" style={{ background: "transparent" }} />

          <div className="w-[60%] h-[15%] flex flex-col ">
            <div className="w-full h-[60%] text-center pt-2 bg-red-900">
              <p className="text-[20px] font-bold text-white">Faculty</p>
            </div>
            <div className="w-full h-[40%] bg-white" />
          </div>
        </div>
      </div>

      <div className={`p-3 flex w-full h-auto justify-between`}>
        <div className="h-full w-[18%] flex flex-col shadow-xl p-3">
          <div
            className={`${
              facultyIndex == 0
                ? "bg-red-900 text-white"
                : "bg-slate-400 text-black"
            } text-[16px] p-3`}
            onClick={() => setFacultyIndex(0)}
          >
            Academic Team
          </div>
          <div
            className={`${
              facultyIndex == 1
                ? "bg-red-900 text-white"
                : "bg-slate-400 text-black"
            } text-[16px] p-3`}
            onClick={() => setFacultyIndex(1)}
          >
            Administrative Team
          </div>
        </div>
        <div>
          <div className="flex flex-col h-full w-[75%]">
            <p className="text-[14px] font-light w-full">
              Our college is supported by an administrative faculty renowned for
              their dedication to providing seamless and comprehensive support
              services to our students, faculty, and staff. Committed to the
              highest standards of efficiency and professionalism, our
              administrative team plays a pivotal role in ensuring the smooth
              operation of all college functions. From admissions and student
              services to financial aid and facilities management, our
              administrative staff members are passionate about creating an
              inclusive and supportive environment for our college community.
              Their tireless efforts and expertise contribute to the overall
              success of our institution, fostering an atmosphere conducive to
              academic achievement and personal growth.
            </p>
            <p className="text-[16px] font-semibold my-3">
              {" "}
              Meet Our Administrative Team
            </p>

            <div className="w-full h-auto flex flex-wrap items-center justify-between">
              {faculties[facultyIndex].map((faculty, index) => {
                return (
                  <div
                    key={index}
                    className="w-[28%] h-auto flex flex-col justify-around m-3 p-3 shadow-xl hover:bg-red-900 hover:text-white"
                  >
                    <img
                      className="w-full h-[70%] object-contain"
                      src={faculty.img}
                      alt={`faculty-${index}`}
                    />
                    <p className="text-[18px] font-semibold h-[15%]">
                      {faculty.name}
                    </p>
                    <p className="text-[16px] h-[15%] text-slate-400 hover:text-slate-200">
                      {faculty.post}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Subscription />
        <Footer />
      </div>
    </>
  );
};
export default FacultyAdministrative;
