import { aboutBg } from "../assets";
import { aboutItems } from "../constants";
import Footer from "./Footer";
import HeroHeader from "./HeroHeader";
import Navbar from "./Navbar";
import RegisterSection from "./RegisterSection";
import Specifications from "./Specifications";

const About = () => {
  return (
    <>
      <HeroHeader />

      <div className="w-full h-[616px] relative">
        <img
          src={aboutBg}
          alt="Graduate BG"
          className="w-full h-full object-cover -z-10"
        />

        <div className="w-full h-full bg-black bg-opacity-5 absolute top-2 left-0 flex flex-col justify-between items-center text-white">
          <Navbar active="ABOUT" style={{ background: "transparent" }} />

          <div className="w-[60%] h-[15%] flex flex-col ">
            <div className="w-full h-[60%] text-center pt-2 bg-red-900">
              <p className="text-[20px] font-bold text-white">
                About Deukhuri Multiple Campus
              </p>
            </div>
            <div className="w-full h-[40%] bg-white" />
          </div>
        </div>
      </div>

      <div className={`p-4 flex w-full h-auto  justify-between`}>
        <div className="h-full w-[18%] flex flex-col shadow-xl p-3 bg-red-900 text-white">
          About Deukhuri Multiple Campus
        </div>

        <div className="flex flex-col h-full w-[75%] ">
          <p className="text-[14px] font-light w-full text-justify">
            Deukhuri Multiple Campus was established in 2005 AD (2062 BS) as a
            community campus located in Lamahi, Deukhuri, Dang district of
            Nepal. This campus is running with the supports of community people
            and University Grants Commission of Nepal. It is affiliated to
            Tribhuvan University (TU) for Bachelor and Master Degree programs.
            It has been imparting quality education in the facilities of
            Management, Arts and Science. Deukhuri Multiple Campus offers
            Bachelor level and Master level programs such as Bachelor of Arts
            (BA), Bachelor of Education (B.Ed.), Bachelor of Business Studies
            (BBS), Master of Education (M.Ed.) programs. It provides various
            Facilities such as Library, Sports, Cafeteria, Labs, Multimedia,
            Internet, E-library, Journal, Counselling, Educational Tours,
            Scholarship, Conference and Internship for deserving students.
          </p>

          <Specifications />

          <p className="text-[16px] font-semibold my-3">
            Our Missions and Values
          </p>

          <p className="text-[14px] my-3 font-light text-justify">
            At DMC Campus, our mission is to develop principled and insightful
            leaders who can transform organizations and the society we live in,
            through innovative education, research and networking. At DMC, we
            believe in and share some fundamental values. Guided and inspired by
            these values, we strive for excellence in everything we do.
          </p>

          <div className="flex flex-wrap w-full h-auto">
            {aboutItems.map((item, index) => {
              return (
                <div className="flex flex-col justify-around m-3 w-[40%] h-[150px] text-justify">
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

      <div className="w-full">
        <RegisterSection />
        <Footer />
      </div>
    </>
  );
};
export default About;
