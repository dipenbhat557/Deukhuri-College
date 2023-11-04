import { facebook, instagram, logo, twitter } from "../assets";
import { styles } from "../styles";

const Footer = () => {
  const handleReadMore = () => {};
  return (
    <div
      className={`${styles.paddingX} w-full h-[420px] flex flex-col sm:h-[400px] bg-gray-500 pt-2`}
    >
      <div className="flex w-full h-[40%] items-center justify-between">
        <img
          src={logo}
          alt="Deukhuri logo"
          className="w-[30%] h-full object-contain"
        />
        <p
          className={`${styles.sectionHeadText} text-center w-[70%] text-white`}
        >
          "Home of Students"
        </p>
      </div>

      <div className="w-full h-[50%] text-white flex justify-between items-center">
        <div className="h-full w-[35%] flex flex-col items-center justify-around">
          <p className="text-[18px]">Deukhuri multiple campus</p>
          <p className="text-[16px] text-slate-300">Lamahi-6, Dang, Nepal</p>
          <p className="text-[16px] text-slate-300">
            +977 98765789, 098769 , 098790
          </p>
          <p className="text-[16px] text-slate-300">deukhuricampus@gmail.com</p>
        </div>
        <div className="h-full w-[20%] flex flex-col items-center justify-around">
          <p className="text-[18px]">Other Links</p>
          <a
            href="/admission"
            className="text-[16px] text-slate-300 cursor-pointer"
          >
            Admission
          </a>
          <a
            href="/contact"
            className="text-[16px] text-slate-300 cursor-pointer"
          >
            Contact
          </a>
          <a
            href="/contact"
            className="text-[16px] text-slate-300 cursor-pointer"
          >
            Location
          </a>
          <a
            href="/about"
            className="text-[16px] text-slate-300 cursor-pointer"
          >
            Life At DMC
          </a>
        </div>
        <div className="h-full w-[35%] flex flex-col items-center justify-around">
          <p className="text-[18px]"> Social Links</p>
          <div className="flex items-start gap-5 justify-start">
            <img
              src={instagram}
              alt="instagram"
              className="rounded-2xl cursor-pointer"
            />
            <img
              src={twitter}
              alt="twitter"
              className="rounded-2xl cursor-pointer"
            />
            <img
              src={facebook}
              alt="facebook"
              className="rounded-2xl cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className=" w-full  flex items-center justify-center text-center">
        <p className=" text-[14px] md:text-[17px] text-white bg-red-900 p-2 rounded-t-md leading-loose">
          Copyright &copy;2023-24 Gorkha Secondary School
        </p>
      </div>
    </div>
  );
};
export default Footer;
