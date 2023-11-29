import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { def, noticeBg } from "../assets";
import { IoMdInformationCircle } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { slideIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import useFetch from "./UseFetch";
import { useNavigate } from "react-router-dom";

const Notices = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  let notices = useFetch(`${import.meta.env.VITE_APP_API_ROOT}/notices`);

  useEffect(() => {
    console.log("Notices : ", notices?.[currentIndex]?.imageUrl);
  }, [notices]);

  return (
    <div
      className={`${styles.padding} flex flex-col sm:flex-row justify-between items-center w-full h-auto sm:h-[400px]  mt-4`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="w-full sm:w-[30%] h-full flex flex-col justify-around items-center mb-5 sm:mb-0 overflow-y-scroll"
      >
        <div className="flex w-full h-[25%] justify-start items-center">
          <img
            src={noticeBg}
            alt="Notice bg"
            className="h-full w-[20%] object-contain"
          />
          <p
            className={`${styles.sectionHeadText}  text-red-900 font-semibold h-full mt-7 ml-4`}
          >
            Notices
          </p>
        </div>

        {notices?.length > 0 ? (
          notices.map((notice, index) => {
            return (
              <div
                key={index}
                className={`${
                  index == currentIndex ? "border-l-4 border-red-900 " : ""
                } w-full h-[70px] border-b-2  flex  items-center pl-4 cursor-pointer`}
                onClick={() => setCurrentIndex(index)}
              >
                <IoMdInformationCircle
                  className={`${index == currentIndex ? "text-red-900 " : ""}`}
                />
                <p
                  className={`${
                    index == currentIndex ? "font-semibold" : "font-light"
                  }text-[10px] sm:text-[14px] ml-1 sm:ml-4 py-1 line-clamp-1`}
                >
                  {notice.title.rendered}
                </p>
              </div>
            );
          })
        ) : (
          <p className="text-[16px] text-red-700 font-semibold">Loading...</p>
        )}
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="flex flex-col w-full sm:w-[60%] h-[400px] items-center justify-around border-x-2 pb-9 border-y-2 border-red-900 rounded-xl p-4"
      >
        <p className="w-[50%] text-[13px] sm:text-[16px] font-semibold h-auto my-4">
          {notices?.[currentIndex]?.title?.rendered}
        </p>
        <div className="w-[80%] h-[95%] relative flex justify-center items-center">
          <img
            src={notices?.[currentIndex]?.imageUrl || def}
            alt="Notice Image"
            className="w-[95%] h-[90%] object-contain  -z-1 "
          />
          <div className="w-[93%] sm:w-[82%] h-[60%] sm:h-[90%] bg-black absolute bg-opacity-20 hover:bg-opacity-0" />
          <div className="bg-white w-[50px] h-[50px] flex items-center justify-center rounded-full left-[50%] top-[45%] text-red-900 absolute text-3xl hover:bg-red-900 hover:text-white">
            <a href={notices?.[currentIndex]?.imageUrl} target="_blank">
              <AiOutlineSearch />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default SectionWrapper(Notices, "notices");
