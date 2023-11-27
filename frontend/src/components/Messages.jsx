import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { fadeIn, slideIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import useFetch from "./UseFetch";
import { def } from "../assets";
import { messageItems } from "../constants";

const Messages = () => {
  // const oldMessages = useFetch(`${import.meta.env.VITE_APP_API_ROOT}/messages`);

  // const messages = oldMessages?.slice()?.reverse();
  const messages = messageItems;
  console.log("Message items is : ", messages);

  return (
    <div className={`sm:px-28 px-6 sm:py-6 py-5 w-[95%] h-auto`}>
      <div
        className="bg-[#212529] w-[80px] h-[14%] flex justify-start mt-0.5  rounded-t-xl"
        style={{ position: "absolute", zIndex: -1 }}
      ></div>
      <div className=" w-[95%] h-full flex flex-col items-center justify-center mx-8">
        <div className="w-full h-auto sm:h-[400px] mt-5 flex justify-center items-center">
          <Tilt
            options={{
              max: 45,
              scale: 1,
              speed: 100,
            }}
            className="h-full mt-2 rounded-2xl w-full"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center w-full h-[500px] sm:h-full shadow-xl rounded-xl">
              <motion.div
                variants={slideIn("left", "spring", 0.5, 0.75)}
                className="h-[50%] sm:h-full w-full "
              >
                <img
                  className="rounded-t-xl object-contain w-full h-full rounded-l-xl "
                  src={messages?.[0]?.imageUrl || def}
                  alt={messages?.[0]?.title?.rendered}
                />
              </motion.div>
              <motion.div
                variants={slideIn("right", "spring", 0.5, 0.75)}
                className="h-[50%] sm:h-full w-full "
              >
                <div className="flex flex-col h-full w-full">
                  <div className="flex items-center w-full h-[15%] font-semibold">
                    <p
                      className={`${"text-red-900 "}  text-[14px] md:text-[17px] ml-3 md:ml-8`}
                    >
                      {messages?.[0]?.title.rendered}
                    </p>
                    <div
                      className={`${"border-red-900"}  ml-2 w-[8%] h-[2px] border-b-4 rounded-3xl`}
                    />
                  </div>
                  <p className="text-[14px] md:text-[18px] h-[15%] font-semibold text-2xl ml-3 md:ml-8">
                    {messages?.[0]?.["_message_name"] || "Loading..."}
                  </p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: messages?.[0]?.content?.rendered,
                    }}
                    className="text-[10px] md:text-[14px] text-justify text-2xl mx-8 line-clamp-6"
                  ></p>
                </div>
              </motion.div>
            </div>
          </Tilt>
        </div>

        <div className="w-full h-auto mt-5 flex flex-wrap justify-between items-center">
          <motion.div
            variants={fadeIn("left", "spring", 1.5, 0.75)}
            className="h-full w-full sm:w-[35%]"
          >
            <Tilt
              options={{
                max: 45,
                scale: 1,
                speed: 450,
              }}
              className="h-[500px] sm:h-full mt-2 rounded-2xl w-full"
            >
              <div className=" flex flex-col justify-between items-center w-full h-full shadow-2xl rounded-xl">
                <img
                  className="rounded-t-xl w-full object-contain h-[50%]"
                  src={messages?.[2]?.imageUrl || def}
                  alt={messages?.[2]?.title?.rendered}
                />
                <div className="flex flex-col w-full h-[50%]">
                  <div className="flex items-center w-full h-[15%] font-semibold">
                    <p
                      className={`${"text-red-900 "}  text-[14px] md:text-[17px] ml-3 md:ml-8`}
                    >
                      {messages?.[2]?.title.rendered}
                    </p>
                    <div
                      className={`${"border-red-900"}  ml-2 w-[8%] h-[2px] border-b-4 rounded-3xl`}
                    />
                  </div>
                  <p className="text-[14px] md:text-[18px] h-[15%] font-semibold text-2xl ml-3 md:ml-8">
                    {messages?.[2]?.["_message_name"] || "Loading..."}
                  </p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: messages?.[2]?.content?.rendered,
                    }}
                    className="text-[10px] md:text-[14px] text-justify text-2xl mx-8 line-clamp-6"
                  ></p>
                </div>
              </div>
            </Tilt>
          </motion.div>

          <motion.div
            variants={fadeIn("right", "spring", 1.5, 0.75)}
            className="h-full w-full sm:w-[35%]"
          >
            <Tilt
              options={{
                max: 45,
                scale: 1,
                speed: 450,
              }}
              className="h-[500px] sm:h-full mt-2 rounded-2xl w-full"
            >
              <div className=" flex flex-col justify-between items-center w-full h-full shadow-2xl rounded-xl">
                <img
                  className="rounded-t-xl object-contain w-full h-[50%]"
                  src={messages?.[1]?.imageUrl || def}
                  alt={messages?.[1]?.title?.rendered}
                />
                <div className="flex flex-col w-full h-[50%]">
                  <div className="flex items-center w-full h-[15%] font-semibold">
                    <p
                      className={`${"text-red-900 "}  text-[14px] md:text-[17px] ml-3 md:ml-8`}
                    >
                      {messages?.[1]?.title.rendered}
                    </p>
                    <div
                      className={`${"border-red-900"}  ml-2 w-[8%] h-[2px] border-b-4 rounded-3xl`}
                    />
                  </div>
                  <p className="text-[14px] md:text-[18px] h-[15%] font-semibold text-2xl ml-3 md:ml-8">
                    {messages?.[1]?.["_message_name"] || "Loading..."}
                  </p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: messages?.[1]?.content?.rendered,
                    }}
                    className="text-[10px] md:text-[14px] text-justify text-2xl mx-8 line-clamp-6"
                  ></p>
                </div>
              </div>
            </Tilt>
          </motion.div>
        </div>
      </div>
      <div
        className="bg-red-900 w-[80px] h-[14%] hidden md:flex justify-end -mt-24 right-40 rounded-b-xl"
        style={{ position: "absolute", zIndex: -1 }}
      ></div>
    </div>
  );
};

export default SectionWrapper(Messages, "messages");
