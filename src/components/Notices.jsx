import { useEffect, useState } from "react";
import { notices } from "../constants";
import { styles } from "../styles";
import { noticeBg } from "../assets";
import { IoMdInformationCircle } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";

const Notices = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div
      className={`${styles.padding} flex justify-between items-center w-full h-[400px] mt-4`}
    >
      <div className="w-[30%] h-full flex flex-col justify-around items-center">
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

        {notices.map((notice, index) => {
          return (
            <div
              key={index}
              className={`${
                index == currentIndex ? "border-l-4 border-red-900 " : ""
              } w-full h-[20%] border-b-2  flex  items-center pl-4 cursor-pointer`}
              onClick={() => setCurrentIndex(index)}
            >
              <IoMdInformationCircle
                className={`${index == currentIndex ? "text-red-900 " : ""}`}
              />
              <p
                className={`${
                  index == currentIndex ? "font-semibold" : "font-light"
                } text-[14px]  ml-4`}
              >
                {notice.title}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col w-[60%] h-[400px] items-center justify-around border-x-2 pb-9 border-y-2 border-red-900 rounded-xl p-4">
        <p className="w-[50%] text-[16px] font-semibold h-auto my-4">
          {notices[currentIndex].title}
        </p>
        <div className="w-[80%] h-[95%] relative flex justify-center items-center">
          <img
            src={notices[currentIndex].img}
            alt="Notice Image"
            className="w-[95%] h-[90%] object-contain  -z-1 "
          />
          <div className="w-[82%] h-[90%] bg-black absolute bg-opacity-20 hover:bg-opacity-0" />
          <div className="bg-white w-[50px] h-[50px] flex items-center justify-center rounded-full left-[50%] top-[45%] text-red-900 absolute text-3xl hover:bg-red-900 hover:text-white">
            <AiOutlineSearch />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Notices;
