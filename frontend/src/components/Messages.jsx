import { Tilt } from "react-tilt";
// import { messageItems } from "../constants";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import useFetch from "./UseFetch";
import { def } from "../assets";

const Messages = () => {
  const messages = useFetch(`${import.meta.env.VITE_APP_API_ROOT}/messages`);
  console.log(messages);

  return (
    <div className={`sm:px-28 px-6 sm:py-6 py-5 w-[95%] h-auto`}>
      <div
        className="bg-[#212529] w-[80px] h-[14%] flex justify-start mt-0.5  rounded-t-xl"
        style={{ position: "absolute", zIndex: -1 }}
      ></div>
      <div className=" w-[95%] h-full flex flex-col items-center justify-center mx-8">
        <div className="w-full h-[50%] mt-5 flex flex-wrap justify-center items-center">
          <motion.div
            variants={fadeIn("up", "spring", 0.5, 0.75)}
            className="h-full w-full sm:w-[35%]"
          >
            <Tilt
              options={{
                max: 45,
                scale: 1,
                speed: 450,
              }}
              className="h-auto sm:h-full mt-2 rounded-2xl w-full"
            >
              <div className=" flex flex-col justify-between items-center w-full h-full shadow-2xl rounded-xl">
                <img
                  className="rounded-t-xl w-full h-[50%]"
                  src={messages?.[0]?.imageUrl || def}
                  alt={messages?.[0]?.title?.rendered}
                />
                <div className="flex flex-col w-full h-[50%]">
                  <div className="flex items-center w-full h-[15%] font-semibold">
                    <p
                      className={`${"text-red-900 "}  text-[14px] md:text-[17px] ml-3 md:ml-8`}
                    >
                      Message from {messages?.[0]?.title.rendered}
                    </p>
                    <div
                      className={`${"border-red-900"}  ml-2 w-[8%] h-[2px] border-b-4 rounded-3xl`}
                    />
                  </div>
                  <p className="text-[14px] md:text-[18px] h-[15%] font-semibold text-2xl ml-3 md:ml-8">
                    {messages?.[0]?.["_message_name"]}
                  </p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: messages?.[0]?.content?.rendered,
                    }}
                    className="text-[10px] md:text-[14px] text-justify text-2xl mx-8 line-clamp-6"
                  ></p>
                </div>
              </div>
            </Tilt>
          </motion.div>
        </div>

        <div className="w-full h-auto mt-5 flex flex-wrap justify-between items-center">
          <motion.div
            variants={fadeIn("left", "spring", 0.5, 0.75)}
            className="h-full w-full sm:w-[35%]"
          >
            <Tilt
              options={{
                max: 45,
                scale: 1,
                speed: 450,
              }}
              className="h-auto sm:h-full mt-2 rounded-2xl w-full"
            >
              <div className=" flex flex-col justify-between items-center w-full h-full shadow-2xl rounded-xl">
                <img
                  className="rounded-t-xl w-full h-[50%]"
                  src={messages?.[0]?.imageUrl || def}
                  alt={messages?.[0]?.title?.rendered}
                />
                <div className="flex flex-col w-full h-[50%]">
                  <div className="flex items-center w-full h-[15%] font-semibold">
                    <p
                      className={`${"text-red-900 "}  text-[14px] md:text-[17px] ml-3 md:ml-8`}
                    >
                      Message from {messages?.[0]?.title.rendered}
                    </p>
                    <div
                      className={`${"border-red-900"}  ml-2 w-[8%] h-[2px] border-b-4 rounded-3xl`}
                    />
                  </div>
                  <p className="text-[14px] md:text-[18px] h-[15%] font-semibold text-2xl ml-3 md:ml-8">
                    {messages?.[0]?.["_message_name"]}
                  </p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: messages?.[0]?.content?.rendered,
                    }}
                    className="text-[10px] md:text-[14px] text-justify text-2xl mx-8 line-clamp-6"
                  ></p>
                </div>
              </div>
            </Tilt>
          </motion.div>

          <motion.div
            variants={fadeIn("right", "spring", 0.5, 0.75)}
            className="h-full w-full sm:w-[35%]"
          >
            <Tilt
              options={{
                max: 45,
                scale: 1,
                speed: 450,
              }}
              className="h-auto sm:h-full mt-2 rounded-2xl w-full"
            >
              <div className=" flex flex-col justify-between items-center w-full h-full shadow-2xl rounded-xl">
                <img
                  className="rounded-t-xl w-full h-[50%]"
                  src={messages?.[0]?.imageUrl || def}
                  alt={messages?.[0]?.title?.rendered}
                />
                <div className="flex flex-col w-full h-[50%]">
                  <div className="flex items-center w-full h-[15%] font-semibold">
                    <p
                      className={`${"text-red-900 "}  text-[14px] md:text-[17px] ml-3 md:ml-8`}
                    >
                      Message from {messages?.[0]?.title.rendered}
                    </p>
                    <div
                      className={`${"border-red-900"}  ml-2 w-[8%] h-[2px] border-b-4 rounded-3xl`}
                    />
                  </div>
                  <p className="text-[14px] md:text-[18px] h-[15%] font-semibold text-2xl ml-3 md:ml-8">
                    {messages?.[0]?.["_message_name"]}
                  </p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: messages?.[0]?.content?.rendered,
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
        className="bg-red-900 w-[80px] h-[14%] hidden sm:flex justify-end -mt-24 right-40 rounded-b-xl"
        style={{ position: "absolute", zIndex: -1 }}
      ></div>
    </div>
  );
};

export default SectionWrapper(Messages, "messages");
