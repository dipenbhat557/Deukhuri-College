// HeroHeader.jsx

import { ImLocation2 } from "react-icons/im";
import { form, logo } from "../assets";
import { styles } from "../styles";
import { useNavigate } from "react-router-dom";
import useFetch from "./UseFetch";

const stripHtmlTags = (html) => {
  // Use a regex to remove HTML tags
  const navigate = useNavigate();
  return html.replace(/<[^>]*>?/gm, "");
};

const HeroHeader = () => {
  const navigate = useNavigate();

  const headerNotices = useFetch(
    `${import.meta.env.VITE_APP_API_ROOT}/notice-headers`
  );

  return (
    <>
      <div
        className={`${styles.padding}  relative z-0 min-w-[95%] h-[80px]  my-1 overflow-x-hidden flex items-center justify-between`}
      >
        <div className="flex w-[40%] sm:w-[50%] items-start gap-5">
          <img
            src={logo}
            alt="logo"
            className="object-contain w-20 h-20 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="flex flex-col w-[65%] items-start justify-center left-2 mr-3 text-[#4092DD]">
            <p className="text-[10px] w-full ml-0 text-center mt-2 font-semibold sm:font-medium sm:text-[30px]">
              देउखुरी बहुमुखी क्याम्पस
            </p>

            <p className="text-[8px] w-full sm:text-center sm:text-[18px]">
              लमही, दाङ
            </p>
          </div>
        </div>
        <div className="flex sm:ml-0 items-center gap-2 sm:gap-6">
          <a
            onClick={() => navigate("/publications")}
            target="_blank"
            className="bg-red-900 text-[10px] sm:text-[15px] md:text-20px p-1 sm:p-3 rounded-md sm:rounded-xl cursor-pointer text-white mr-4 hover:bg-red-950"
          >
            QAA/PUBLICATIONS
          </a>
          <a
            href="/contact"
            className="text-[10px] sm:text-[15px] md:text-20px text-white p-1 sm:p-3 rounded-md sm:rounded-xl bg-red-900 hover:bg-red-950"
          >
            CONNECT WITH US
          </a>

          <ImLocation2
            className="hidden sm:flex text-red-900 mx-3 cursor-pointer text-2xl hover:bg-red-950  hover:text-4xl hover:rounded-xl hover:text-white hover:p-2"
            onClick={() => navigate("/contact#location")}
          />
        </div>
      </div>
      <marquee className="w-[90%] h-[40px] p-2 my-2 bg-red-900 mx-[5%]">
        {headerNotices?.map((notice, index) => (
          <div
            key={index}
            dangerouslySetInnerHTML={{
              __html: stripHtmlTags(
                index !== headerNotices.length - 1
                  ? ` ${notice?.content?.rendered || "Loading..."} || &nbsp  `
                  : ` ${notice?.content?.rendered || "Loading..."} `
              ),
            }}
            style={{ display: "inline-block" }}
            className="text-white font-semibold"
          />
        ))}
      </marquee>
    </>
  );
};

export default HeroHeader;
