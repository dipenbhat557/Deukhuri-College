import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { def, noticeBg } from "../assets";
import { IoMdInformationCircle } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { slideIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import axios from "axios";

const Notices = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [noticesPerPage] = useState(5);
  const [loadingImages, setLoadingImages] = useState({});
  const [noticeImages, setNoticeImages] = useState({});

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_ROOT}/api/notice`
        );
        let receivedData = response?.data;
        receivedData = receivedData?.filter((d) => d?.header === false);
        receivedData = receivedData?.reverse();
        setNotices(receivedData);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchDocuments();
  }, []);

  useEffect(() => {
    if (notices.length > 0 && currentNotices.length > 0 && currentNotices[0]?.id) {
      fetchNoticeImage(currentNotices[0].id);
    }
  }, [notices, currentPage]);

  const fetchNoticeImage = async (noticeId) => {
    if (noticeImages[noticeId] || loadingImages[noticeId]) {
      return; 
    }

    setLoadingImages(prev => ({ ...prev, [noticeId]: true }));

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_ROOT}/api/notice/${noticeId}/img`,
        { responseType: 'arraybuffer' }
      );
      
      const base64 = btoa(
        new Uint8Array(response.data)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      
      setNoticeImages(prev => ({ ...prev, [noticeId]: base64 }));
    } catch (error) {
      console.error("Error fetching notice image:", error);
    } finally {
      setLoadingImages(prev => ({ ...prev, [noticeId]: false }));
    }
  };

  const createBlobUrl = (base64Data, fileType = "image/jpeg") => {
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
      const blob = new Blob([byteArray], { type: fileType });
      return URL.createObjectURL(blob);
    } catch (e) {
      console.error("Failed to decode base64 data:", e);
      return "";
    }
  };

  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);
  const totalPages = Math.ceil(notices.length / noticesPerPage) || 1;
  const maxVisiblePages = 5;
  const halfVisible = Math.floor(maxVisiblePages / 2);
  const visibleEnd = Math.min(totalPages, currentPage + halfVisible);
  const visibleStart = Math.max(1, visibleEnd - maxVisiblePages + 1);
  const visiblePageNumbers = [];
  for (let i = visibleStart; i <= visibleEnd; i++) visiblePageNumbers.push(i);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNoticeClick = (index) => {
    setCurrentIndex(index);
    const notice = currentNotices[index];
    if (notice && notice.id) {
      fetchNoticeImage(notice.id);
    }
  };

  return (
    <div
      className={`${styles.padding} flex flex-col sm:flex-row justify-between items-center w-full h-auto sm:h-[650px] mt-4`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="w-full sm:w-[30%] h-full sm:min-h-[650px] flex flex-col items-center mb-5 sm:mb-0 overflow-hidden"
      >
        {/* Sticky header: does not scroll */}
        <div className="flex w-full flex-shrink-0 justify-start items-center sticky top-0 z-10 bg-white py-2">
          <img
            src={noticeBg}
            alt="Notice bg"
            className="h-16 w-[20%] object-contain"
          />
          <p
            className={`${styles.sectionHeadText} text-red-900 font-semibold mt-7 ml-4`}
          >
            Notices
          </p>
        </div>
        {/* Scrollable notice list only */}
        <div className="flex w-full flex-1 min-h-0 flex-col items-start gap-2 overflow-y-auto">
          {currentNotices.length > 0 ? (
            currentNotices.map((notice, index) => (
              <div
                key={index}
                className={`${
                  index === currentIndex ? "border-l-4 border-red-900 " : ""
                } w-full h-[70px] flex-shrink-0 border-b-2 flex items-center pl-4 cursor-pointer`}
                onClick={() => handleNoticeClick(index)}
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
        {/* Pagination: max 5 numbers + Prev/Next */}
        <div className="flex flex-shrink-0 justify-center items-center gap-1 sm:gap-2 mt-4 pb-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-2 py-1 rounded bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 text-sm font-medium"
            aria-label="Previous page"
          >
            Prev
          </button>
          {visiblePageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`min-w-[32px] px-2 py-1 rounded text-sm ${
                currentPage === page
                  ? "bg-red-900 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-2 py-1 rounded bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 text-sm font-medium"
            aria-label="Next page"
          >
            Next
          </button>
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
          {loadingImages[currentNotices[currentIndex]?.id] ? (
            <div className="w-[95%] h-[90%] flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-900"></div>
            </div>
          ) : (() => {
            const currentNotice = currentNotices[currentIndex];
            const imageData = currentNotice?.id ? noticeImages[currentNotice.id] : null;
            const fileType = currentNotice?.fileType || "image/jpeg";
            const isPdf = fileType === "application/pdf";

            return (
              <>
                {isPdf ? (
                  imageData ? (
                    <embed
                      src={createBlobUrl(imageData, "application/pdf")}
                      type="application/pdf"
                      className="w-[95%] h-[90%]"
                    />
                  ) : (
                    <div className="w-[95%] h-[90%] flex items-center justify-center text-gray-400 text-sm">
                      No file attached
                    </div>
                  )
                ) : (
                  <>
                    <img
                      src={
                        currentNotice?.id && imageData
                          ? `data:${fileType};base64,${imageData}`
                          : def
                      }
                      alt="Notice Image"
                      className="w-[95%] h-[90%] object-contain -z-1"
                    />
                    <div className="w-[93%] sm:w-[82%] h-[60%] sm:h-[90%] bg-black absolute bg-opacity-20 hover:bg-opacity-0" />
                  </>
                )}
                <div className="bg-white w-[50px] h-[50px] flex items-center justify-center rounded-full left-[50%] top-[45%] text-red-900 absolute text-3xl hover:bg-red-900 hover:text-white">
                  {currentNotice?.id && imageData && (
                    <a
                      href={createBlobUrl(imageData, fileType)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <AiOutlineSearch />
                    </a>
                  )}
                </div>
              </>
            );
          })()}
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Notices, "notices");
