import { useState } from "react";
import { graduate, undergraduate } from "../assets";
import { graduateItems, underGraduateItems } from "../constants";
import { styles } from "../styles";
import { motion } from "framer-motion";
import { slideIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const Programs = () => {
  const [currentGraduateProgramIndex, setCurrentGraduateProgramIndex] =
    useState(0);
  const [
    currentUnderGraduateProgramIndex,
    setCurrentUnderGraduateProgramIndex,
  ] = useState(0);

  return (
    <div
      className={`${styles.padding} bg-slate-200 w-full h-auto sm:h-[1000px]`}
    >
      <motion.div
        variants={textVariant()}
        className="w-full h-[13%] flex flex-col justify-center items-center mb-4"
      >
        <p className={`${styles.sectionHeadText}`}>ACADEMIC PROGRAMS</p>
        <p
          className={`${styles.sectionSubText} text-center text-slate-700 my-2`}
        >
          Broaden your knowledge and capabilities by capitalizing on Apex’s
          rigorous academics
          <br /> and industry-relevant learning opportunities
        </p>
      </motion.div>
      <div className="w-full h-[90%] flex flex-col">
        <motion.div
          variants={slideIn("left", "spring", 0.5, 1.5)}
          className="w-full h-[50%] flex flex-col sm:flex-row justify-between bg-white"
        >
          <div className="w-full sm:w-[60%] h-full flex flex-col justify-around">
            <div className="flex flex-col justify-around w-full mx-4 h-[40%] my-4">
              <div className="flex w-[90%]  flex-col justify-center h-[70%]">
                <p className="text-[16px] sm:text-[23px]  ">
                  GRADUATE PROGRAMS
                </p>
                <p className="text-[14px] sm:text-[16px] text-slate-600 my-2 text-justify">
                  Our graduate programs transform you into top-flight managers
                  and business leaders.
                </p>
              </div>
              <div className="flex items-center gap-4 w-full h-[30%] ">
                {graduateItems.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className={`p-2 sm:w-[15%] uppercase ${
                        index == currentGraduateProgramIndex
                          ? "bg-red-900 text-white"
                          : "bg-red-700 text-slate-200"
                      } hover:w-[17%] hover:p-3 text-[14px] sm:text-[16px]`}
                      onClick={() => setCurrentGraduateProgramIndex(index)}
                    >
                      {item.title}
                    </button>
                  );
                })}
              </div>
            </div>
            <hr className="text-slate-500 mx-3" />
            <div className="w-[90%] sm:w-full h-[60%] flex flex-col items-start justify-center mx-4 my-auto">
              <p className="text-[16px] sm:text-[22px] font-light my-2">
                {graduateItems[currentGraduateProgramIndex].fullTitle}
              </p>
              <p className="text-slate-600 text-[14px] sm:text-[16px] my-2 text-justify">
                {graduateItems[currentGraduateProgramIndex].content}
              </p>
            </div>
          </div>
          <div className="hidden sm:flex w-[29%] h-auto ">
            <img
              src={graduate}
              alt="graduate Image"
              className="object-contain"
            />
          </div>
        </motion.div>

        <motion.div
          variants={slideIn("right", "spring", 1, 1.5)}
          className="w-full h-[49%] flex justify-between items-center mt-1 bg-white"
        >
          <div className="hidden sm:flex w-[27%] h-full ">
            <img
              src={undergraduate}
              alt="under-graduate Image"
              className="object-contain"
            />
          </div>
          <div className="w-full sm:w-[60%] h-full flex flex-col justify-center">
            <div className="flex flex-col justify-around w-full mx-2 h-[70%]">
              <div className="flex flex-col justify-center w-[90%]">
                <p className="text-[16px] sm:text-[20px] my-2">
                  UNDER-GRADUATE PROGRAMS
                </p>
                <p className="text-[14px] sm:text-[16px] text-slate-600 my-2 text-justify">
                  Our programs–featuring the perfect blend of theory-,
                  experience-, and observation- based learning–are taught in
                  participative environments that extend beyond the classroom
                  walls.
                </p>
              </div>
              <div className="flex items-center  gap-4 w-full my-2">
                {underGraduateItems.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className={`p-2  w-[15%] uppercase text-white ${
                        index == currentUnderGraduateProgramIndex
                          ? "bg-red-900 text-white"
                          : "bg-red-700 text-slate-200"
                      } hover:w-[17%] text-[14px] sm:text-[16px] hover:p-3`}
                      onClick={() => setCurrentUnderGraduateProgramIndex(index)}
                    >
                      {item.title}
                    </button>
                  );
                })}
              </div>
            </div>
            <hr className="text-slate-500 mx-3" />
            <div className="sm:w-full h-[65%] flex flex-col items-start mx-2 w-[90%] justify-center">
              <p className="text-[16px] sm:text-[22px] font-light my-2">
                {underGraduateItems[currentUnderGraduateProgramIndex].fullTitle}
              </p>
              <p className="text-slate-600 my-2 text-[14px] sm:text-[16px] text-justify">
                {underGraduateItems[currentUnderGraduateProgramIndex].content}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default SectionWrapper(Programs, "");
