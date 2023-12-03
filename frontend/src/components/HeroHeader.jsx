import { ImLocation2 } from "react-icons/im";
import { form, logo } from "../assets";
import { styles } from "../styles";
import { useNavigate } from "react-router-dom";

const HeroHeader = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`${styles.padding} max-w-7xl relative z-0 min-w-full h-[80px]  my-1 mx-auto flex items-center justify-between`}
      >
        <div className="flex ">
          <img
            src={logo}
            alt="logo"
            className="object-contain w-20  h-20 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="flex flex-col items-start justify-center ml-5 mr-3">
            <p className="text-[10px] ml-0 font-semibold sm:font-medium text-justify sm:text-[30px]   text-red-900">
              देउखुरी बहुमुखी क्याम्पस
            </p>

            <p className="text-[8px] sm:text-[18px]">लमही, दाङ</p>
          </div>
        </div>
        <div className="flex ml-2 sm:ml-0 items-center gap-2 sm:gap-6">
          <a
            href={form}
            target="_blank"
            className="bg-red-900 text-[10px] sm:text-[13px] md:text-18px p-1 sm:p-3 rounded-md sm:rounded-xl text-white mr-4 hover:bg-red-950"
          >
            ADMISSION FORM
          </a>
          <a
            href="/contact"
            className="text-[10px] sm:text-[13px] md:text-18px text-white p-1 sm:p-3 rounded-md sm:rounded-xl bg-red-900 hover:bg-red-950"
          >
            CONNECT WITH US
          </a>

          <ImLocation2
            className="hidden sm:flex text-red-900 mx-3 text-2xl hover:bg-red-950  hover:text-4xl hover:rounded-xl hover:text-white hover:p-2"
            onClick={() => navigate("/contact#location")}
          />
        </div>
      </div>
      <div className=" w-[90%] border-dashed border-b-4 rounded-xl mx-auto border-red-950 mb-2" />
    </>
  );
};

export default HeroHeader;
