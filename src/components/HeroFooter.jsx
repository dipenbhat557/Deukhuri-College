import { footerConstants } from "../constants";

const HeroFooter = () => {
  const handleExplore = () => {};
  return (
    <div className="flex relative flex-row items-center justify-around bg-red-900 w-full md:h-[130px] h-[115px] text-white">
      {footerConstants.map((item, index) => {
        return (
          <div
            key={index}
            className="flex flex-row h-[80%] md:h-full w-[25%] md:w-[22%]  md:ml-6 p-3 hover:bg-red-950 hover:rounded-xl"
          >
            <img
              src={`${item.img}`}
              alt={`Image ${item.index}`}
              className="h-[24%] md:h-[32%] rounded-md object-contain"
            />
            <div className="ml-1 md:ml-8 mt-0">
              <p className="text-[14px] md:text-[18px] font-semibold">
                {item.header}
              </p>
              <p className=" text-[10px] font-light md:text-[14px]">
                {item.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default HeroFooter;
