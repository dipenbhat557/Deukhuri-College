import { logo } from "../assets";

const Loading = () => {
  return (
    <div className="h-[717px] w-full flex flex-col items-center justify-center">
      <img src={logo} alt="Logo" className="h-[30%] w-[30%] object-contain" />
      <p className="text-[30px] font-bold tracking-widest mt-10 ">Loading...</p>
    </div>
  );
};
export default Loading;
