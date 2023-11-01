import { useEffect, useState } from "react";
import { notices } from "../constants";
import { styles } from "../styles";

const Notices = () => {
  const [currentNotices, setCurrentNotices] = useState([
    notices[0],
    notices[1],
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to update the current events based on the currentIndex
  const updateCurrentNotices = () => {
    const startIndex = currentIndex;
    const endIndex = startIndex + 2;
    const nextIndex = endIndex % notices.length;
    if (endIndex !== notices.length - 1) {
      setCurrentNotices(
        notices.slice(startIndex, endIndex).concat(notices.slice(0, nextIndex))
      );
    } else {
      setCurrentNotices(notices.slice(startIndex, endIndex));
    }
  };

  // Function to handle automatic switching of events
  const handleAutoSwitch = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % notices.length;
      return newIndex;
    });
  };

  useEffect(() => {
    // Initialize current events
    updateCurrentNotices();

    // Set up automatic switching every 5 seconds (adjust as needed)
    const interval = setInterval(handleAutoSwitch, 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleShowNotices = () => {};

  return (
    <div
      className={`h-[380px] md:h-[540px] w-full flex flex-col ${styles.padding}`}
    >
      <div className="flex items-center justify-center h-[20%]">
        <p className={`${styles.sectionHeadText}`}>Latest Notices</p>
        <div className="sm:w-[18%] md:w-[10%] w-[20%] h-[5px] border-b-4 ml-4 border-black rounded-3xl" />
      </div>
      <div className="flex h-[70%] w-full justify-around items-center mx-auto">
        {currentNotices.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col h-[90%] md:h-full w-[28%] hover:w-[33%]  hover:bg-red-900 hover:rounded-xl hover:text-white items-center justify-center"
            >
              <img
                src={`${item.img}`}
                alt={`Image ${item.index}`}
                className="h-[65%] md:h-[70%] w-full rounded-2xl object-contain mt-0"
              />
              <p className="text-[14px] h-[18%] md:h-[22%] md:w-[70%]  md:text-[18px] text-center my-2">
                {item.title}
              </p>
              <button
                className="bg-red-900 h-[10%] text-white font-semibold w-[50%] md:w-[30%] p-2 text-[12px] hover:bg-red-950 rounded-xl mb-2"
                onClick={handleShowNotices}
              >
                Read more
              </button>
            </div>
          );
        })}
      </div>
      <div className=" w-full h-[10%] flex items-center justify-center md:mt-2">
        <button className="hover:bg-red-900 hover:text-white w-[50%] md:w-[30%] border-2 rounded-xl">
          View All News & Updates
        </button>
      </div>
    </div>
  );
};
export default Notices;
