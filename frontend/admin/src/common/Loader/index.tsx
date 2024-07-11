import { iconLogo } from "../../assets";

const Loader = () => {
  return (
    <div className="h-[717px] w-full flex flex-col items-center justify-center">
      <img
        src={iconLogo}
        alt="Logo"
        className="h-[30%] animate-spin w-[30%] object-contain"
      />
    </div>
  );
};

export default Loader;
