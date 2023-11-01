import { specConst } from "../constants";

const Specifications = () => {
  return (
    <div className="flex w-[80%] mx-auto mt-2 h-[100px] md:h-[160px] py-3 px-7">
      <div className="flex h-full  w-full items-center justify-around bg-red-900 rounded-2xl">
        {specConst.map((spec, index) => {
          return (
            <div
              key={index}
              className="flex items-center  flex-col h-full w-[18%] pt-2 hover:bg-red-950 hover:rounded-lg hover:m-2"
            >
              <div className="h-[35%] w-[35%] md:pb-2">
                <img
                  className=" object-cover rounded-xl"
                  src={spec.img}
                  alt={`Spec ${index}`}
                />
              </div>
              <p className="text-white text-center w-[43%] h-[50%] md:w-[45%] mt-4 md:mt-10 text-[6px] md:text-[10px] font-semibold">
                {spec.content}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Specifications;
