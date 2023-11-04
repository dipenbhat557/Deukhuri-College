import { BiPhoneCall } from "react-icons/bi";
import { ImLocation2 } from "react-icons/im";
import { logo } from "../assets";
import { styles } from "../styles";
import { useNavigate } from "react-router-dom";

const HeroHeader = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`${styles.padding} max-w-7xl relative z-0 min-w-full h-[80px] my-1 mx-auto flex items-center justify-between`}
      >
        <img
          src={logo}
          alt="logo"
          className="object-contain w-20 h-20 cursor-pointer"
          onClick={() => navigate("/")}
        />

        <div className="flex items-center gap-6">
          <a
            href="/admission"
            className="bg-red-900 text-[13px] md:text-18px p-3 rounded-xl text-white mr-4 hover:bg-red-950"
          >
            ADMISSION FORM
          </a>
          <a
            href="/contact"
            className="text-[13px] md:text-18px text-white p-3 rounded-xl bg-red-900 hover:bg-red-950"
          >
            CONNECT WITH US
          </a>

          <ImLocation2
            className="text-red-900 mx-3 text-2xl hover:bg-red-950  hover:text-4xl hover:rounded-xl hover:text-white hover:p-2"
            onClick={() => navigate("/contact")}
          />
        </div>
      </div>
      <div className=" w-[90%] border-dashed border-b-4 rounded-xl mx-auto border-red-950 mb-2" />
    </>
  );
};

export default HeroHeader;
