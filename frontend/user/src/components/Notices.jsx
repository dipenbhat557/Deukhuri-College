import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { def, noticeBg } from "../assets";
import { IoMdInformationCircle } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { slideIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import axios from "axios";

const notices = [
  {
    title: "Important Notice #1",
    img: "/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAyRXhpZgAATU0AAgAAIABgAAEAAAABV9ADmUABAD/2wBDAAoHBwkHBgoJCAkLCwoMDxwQDw4NDh4WFxIZJCAmIyIoKSMiLCwoM...",
  },
  {
    title: "Urgent Update",
    img: "/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAyRXhpZgAATU0AAgAAIABgAAEAAAABV9ADmUABAD/2wBDAAoHBwkHBgoJCAkLCwoMDxwQDw4NDh4WFxIZJCAmIyIoKSMiLCwoM...",
  },
  {
    title: "Reminder Notice",
    img: "/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAyRXhpZgAATU0AAgAAIABgAAEAAAABV9ADmUABAD/2wBDAAoHBwkHBgoJCAkLCwoMDxwQDw4NDh4WFxIZJCAmIyIoKSMiLCwoM...",
  },
  {
    title: "Scheduled Maintenance",
    img: "/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAyRXhpZgAATU0AAgAAIABgAAEAAAABV9ADmUABAD/2wBDAAoHBwkHBgoJCAkLCwoMDxwQDw4NDh4WFxIZJCAmIyIoKSMiLCwoM...",
  },
  {
    title: "New Policy Announcement",
    img: "/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAyRXhpZgAATU0AAgAAIABgAAEAAAABV9ADmUABAD/2wBDAAoHBwkHBgoJCAkLCwoMDxwQDw4NDh4WFxIZJCAmIyIoKSMiLCwoM...",
  },
  {
    title: "Holiday Notice",
    img: "/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAyRXhpZgAATU0AAgAAIABgAAEAAAABV9ADmUABAD/2wBDAAoHBwkHBgoJCAkLCwoMDxwQDw4NDh4WFxIZJCAmIyIoKSMiLCwoM...",
  },
  {
    title: "Office Closure",
    img: "/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAyRXhpZgAATU0AAgAAIABgAAEAAAABV9ADmUABAD/2wBDAAoHBwkHBgoJCAkLCwoMDxwQDw4NDh4WFxIZJCAmIyIoKSMiLCwoM...",
  },
  {
    title: "System Upgrade",
    img: "/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAyRXhpZgAATU0AAgAAIABgAAEAAAABV9ADmUABAD/2wBDAAoHBwkHBgoJCAkLCwoMDxwQDw4NDh4WFxIZJCAmIyIoKSMiLCwoM...",
  },
  {
    title: "Annual Report",
    img: "/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAyRXhpZgAATU0AAgAAIABgAAEAAAABV9ADmUABAD/2wBDAAoHBwkHBgoJCAkLCwoMDxwQDw4NDh4WFxIZJCAmIyIoKSMiLCwoM...",
  },
  {
    title: "Important Notice #1",
    img: "/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAyRXhpZgAATU0AAgAAIABgAAEAAAABV9ADmUABAD/2wBDAAoHBwkHBgoJCAkLCwoMDxwQDw4NDh4WFxIZJCAmIyIoKSMiLCwoM...",
  },
  {
    title: "Urgent Update",
    img: "/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAyRXhpZgAATU0AAgAAIABgAAEAAAABV9ADmUABAD/2wBDAAoHBwkHBgoJCAkLCwoMDxwQDw4NDh4WFxIZJCAmIyIoKSMiLCwoM...",
  },
  {
    title: "Reminder Notice",
    img: "/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAyRXhpZgAATU0AAgAAIABgAAEAAAABV9ADmUABAD/2wBDAAoHBwkHBgoJCAkLCwoMDxwQDw4NDh4WFxIZJCAmIyIoKSMiLCwoM...",
  },
  {
    title: "Scheduled Maintenance",
    img: "/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAyRXhpZgAATU0AAgAAIABgAAEAAAABV9ADmUABAD/2wBDAAoHBwkHBgoJCAkLCwoMDxwQDw4NDh4WFxIZJCAmIyIoKSMiLCwoM...",
  },
  {
    title: "Important Notice #1",
    img: "/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAyRXhpZgAATU0AAgAAIABgAAEAAAABV9ADmUABAD/2wBDAAoHBwkHBgoJCAkLCwoMDxwQDw4NDh4WFxIZJCAmIyIoKSMiLCwoM...",
  },
  {
    title: "Urgent Update",
    img: "/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAyRXhpZgAATU0AAgAAIABgAAEAAAABV9ADmUABAD/2wBDAAoHBwkHBgoJCAkLCwoMDxwQDw4NDh4WFxIZJCAmIyIoKSMiLCwoM...",
  },
  {
    title: "Reminder Notice",
    img: "/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAyRXhpZgAATU0AAgAAIABgAAEAAAABV9ADmUABAD/2wBDAAoHBwkHBgoJCAkLCwoMDxwQDw4NDh4WFxIZJCAmIyIoKSMiLCwoM...",
  },
  {
    title: "Scheduled Maintenance",
    img: "/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAyRXhpZgAATU0AAgAAIABgAAEAAAABV9ADmUABAD/2wBDAAoHBwkHBgoJCAkLCwoMDxwQDw4NDh4WFxIZJCAmIyIoKSMiLCwoM...",
  },
  {
    title: "Important Notice #1",
    img: "/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAyRXhpZgAATU0AAgAAIABgAAEAAAABV9ADmUABAD/2wBDAAoHBwkHBgoJCAkLCwoMDxwQDw4NDh4WFxIZJCAmIyIoKSMiLCwoM...",
  },
  {
    title: "Urgent Update",
    img: "/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAyRXhpZgAATU0AAgAAIABgAAEAAAABV9ADmUABAD/2wBDAAoHBwkHBgoJCAkLCwoMDxwQDw4NDh4WFxIZJCAmIyIoKSMiLCwoM...",
  },
  {
    title: "Reminder Notice",
    img: "/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAyRXhpZgAATU0AAgAAIABgAAEAAAABV9ADmUABAD/2wBDAAoHBwkHBgoJCAkLCwoMDxwQDw4NDh4WFxIZJCAmIyIoKSMiLCwoM...",
  },
  {
    title: "Scheduled Maintenance",
    img: "/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAyRXhpZgAATU0AAgAAIABgAAEAAAABV9ADmUABAD/2wBDAAoHBwkHBgoJCAkLCwoMDxwQDw4NDh4WFxIZJCAmIyIoKSMiLCwoM...",
  },
  {
    title: "Important Notice #1",
    img: "/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAyRXhpZgAATU0AAgAAIABgAAEAAAABV9ADmUABAD/2wBDAAoHBwkHBgoJCAkLCwoMDxwQDw4NDh4WFxIZJCAmIyIoKSMiLCwoM...",
  },
  {
    title: "Urgent Update",
    img: "/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAyRXhpZgAATU0AAgAAIABgAAEAAAABV9ADmUABAD/2wBDAAoHBwkHBgoJCAkLCwoMDxwQDw4NDh4WFxIZJCAmIyIoKSMiLCwoM...",
  },
  {
    title: "Reminder Notice",
    img: "/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAyRXhpZgAATU0AAgAAIABgAAEAAAABV9ADmUABAD/2wBDAAoHBwkHBgoJCAkLCwoMDxwQDw4NDh4WFxIZJCAmIyIoKSMiLCwoM...",
  },
  {
    title: "Scheduled Maintenance",
    img: "/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAyRXhpZgAATU0AAgAAIABgAAEAAAABV9ADmUABAD/2wBDAAoHBwkHBgoJCAkLCwoMDxwQDw4NDh4WFxIZJCAmIyIoKSMiLCwoM...",
  },
];

const Notices = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [noticesPerPage] = useState(5);

  // useEffect(() => {
  //   const fetchDocuments = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${import.meta.env.VITE_APP_API_ROOT}/api/notice`
  //       );
  //       let receivedData = response?.data;
  //       receivedData = receivedData?.filter((d) => d?.header === false);
  //       setNotices(receivedData);
  //     } catch (error) {
  //       console.error("Error fetching notices:", error);
  //     }
  //   };

  //   fetchDocuments();
  // }, []);

  const createBlobUrl = (base64Data) => {
    if (!base64Data || typeof base64Data !== "string") {
      console.error("Invalid base64 data");
      return "";
    }

    try {
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length)
        .fill()
        .map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" });
      return URL.createObjectURL(blob);
    } catch (e) {
      console.error("Failed to decode base64 data:", e);
      return "";
    }
  };

  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div
      className={`${styles.padding} flex flex-col sm:flex-row justify-between items-center w-full h-auto sm:h-[650px] mt-4`}
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
            className={`${styles.sectionHeadText} text-red-900 font-semibold h-full mt-7 ml-4`}
          >
            Notices
          </p>
        </div>
        <div className="flex w-full h-[65%]  flex-col items-start gap-2">
          {currentNotices.length > 0 ? (
            currentNotices.map((notice, index) => (
              <div
                key={index}
                className={`${
                  index === currentIndex ? "border-l-4 border-red-900 " : ""
                } w-full h-[70px] border-b-2 flex items-center pl-4 cursor-pointer`}
                onClick={() => setCurrentIndex(index)}
              >
                <IoMdInformationCircle
                  className={`${index === currentIndex ? "text-red-900 " : ""}`}
                />
                <p
                  className={`${
                    index === currentIndex ? "font-semibold" : "font-light"
                  } text-[10px] sm:text-[14px] ml-1 sm:ml-4 py-1 line-clamp-1`}
                >
                  {notice?.title}
                </p>
              </div>
            ))
          ) : (
            <p className="text-[16px] text-red-700 font-semibold">Loading...</p>
          )}
        </div>
        <div className="flex justify-center h-[10%] items-center gap-2 mt-4">
          {[...Array(Math.ceil(notices.length / noticesPerPage)).keys()].map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === page + 1
                    ? "bg-red-900 text-white"
                    : "bg-gray-200"
                }`}
              >
                {page + 1}
              </button>
            )
          )}
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="flex flex-col w-full sm:w-[60%] h-[400px] items-center justify-around border-x-2 pb-9 border-y-2 border-red-900 rounded-xl p-4"
      >
        <p className="w-[50%] text-[13px] sm:text-[16px] font-semibold h-auto my-4">
          {currentNotices[currentIndex]?.title}
        </p>
        <div className="w-[80%] h-[95%] relative flex justify-center items-center">
          <img
            src={
              `data:image/jpeg;base64,${currentNotices[currentIndex]?.img}` ||
              def
            }
            alt="Notice Image"
            className="w-[95%] h-[90%] object-contain -z-1 "
          />
          <div className="w-[93%] sm:w-[82%] h-[60%] sm:h-[90%] bg-black absolute bg-opacity-20 hover:bg-opacity-0" />
          <div className="bg-white w-[50px] h-[50px] flex items-center justify-center rounded-full left-[50%] top-[45%] text-red-900 absolute text-3xl hover:bg-red-900 hover:text-white">
            {currentNotices[currentIndex]?.img && (
              <a
                href={createBlobUrl(currentNotices[currentIndex].img)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiOutlineSearch />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Notices, "notices");
