import { admissionBg } from "../assets";
import { programs } from "../constants";
import Footer from "./Footer";
import HeroHeader from "./HeroHeader";
import Navbar from "./Navbar";
import Subscription from "./Subscriptions";

const Admission = () => {
  const handleApply = () => {};

  return (
    <>
      <HeroHeader />
      <div className="w-full h-[616px] relative">
        <img
          src={admissionBg}
          alt="Admission BG"
          className="w-full h-full object-cover -z-10"
        />

        <div className="w-full h-full bg-black bg-opacity-5 absolute top-2 left-0 flex flex-col justify-between items-center text-white">
          <Navbar active="ADMISSION" style={{ background: "transparent" }} />

          <div className="w-[60%] h-[15%] flex flex-col ">
            <div className="w-full h-[60%] text-center pt-2 bg-red-900">
              <p className="text-[20px] font-bold text-white">Admission</p>
            </div>
            <div className="w-full h-[40%] bg-white" />
          </div>
        </div>
      </div>

      {programs.map((program, index) => {
        return (
          <div className="flex flex-col items-center justify-around w-full p-3  ">
            <p className="uppercase text-[20px] font-semibold ">
              {program.title}
            </p>
            <p className="text-[15px] font-semibold m-3 text-slate-700 w-[70%] text-center">
              {program.desc}
            </p>

            <div className="flex justify-between flex-wrap w-full h-auto ">
              {program.items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col h-[90%] md:h-full w-[40%] hover:w-[42%] mx-5 hover:bg-red-900 hover:text-white  justify-around"
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
                    <div className="w-full flex items-center justify-center px-3">
                      <button
                        className="h-[10%]  border-l-2 border-r-4 border-t-2 border-b-8 shadow-2xl border-slate-300  w-[50%] md:w-[30%] p-2 text-[14px] hover:bg-red-950 mb-2"
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

      <div className="w-full">
        <Subscription />
        <Footer />
      </div>
    </>
  );
};
export default Admission;
