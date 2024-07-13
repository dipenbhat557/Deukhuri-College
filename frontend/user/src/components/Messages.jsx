import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { fadeIn, slideIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import useFetch from "./UseFetch";
import { def } from "../assets";
import { useEffect, useState } from "react";
import axios from "axios";
// import { messageItems } from "../constants";

const Messages = () => {

  const [messages,setMessages] = useState([])

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_ROOT}/api/message`
        );
        let receivedData = await response?.data;
        console.log("messages are ",receivedData)
        setMessages(receivedData);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className={`sm:px-28 px-6 sm:py-6 py-5 w-[95%] h-auto`}>
      <div
        className="bg-[#212529] w-[80px] h-[100px] flex justify-start mt-0.5  rounded-t-xl"
        style={{ position: "absolute", zIndex: -1 }}
      ></div>
      <div className=" w-[95%] h-full flex flex-col items-center justify-center mx-8">
        <div className="w-full mt-5 flex justify-center items-center">
          <Tilt
            options={{
              max: 45,
              scale: 1,
              speed: 100,
            }}
            className="h-full mt-2 rounded-2xl w-full"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center w-full h-auto sm:h-full shadow-xl rounded-xl">
              <motion.div
                variants={slideIn("left", "spring", 0.5, 0.75)}
                className="h-[50%] sm:h-[400px] w-full "
              >
                <img
                  className="rounded-t-xl object-contain w-full h-full rounded-l-xl "
                  src={`data:image/jpeg;base64,${messages?.[0]?.img}` || def}
                  alt={messages?.[0]?.name}
                />
              </motion.div>
              <motion.div
                variants={slideIn("right", "spring", 0.5, 0.75)}
                className="h-auto w-full "
              >
                <div className="flex flex-col h-[98%] w-full pb-2">
                  <div className="flex items-center w-full h-[15%] font-semibold">
                    <p
                      className={`${"text-red-900 "}  text-[14px] md:text-[17px] ml-3 md:ml-8`}
                    >
                      Message from {messages?.[0]?.designation}
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
                      __html: messages?.[0]?.message,
                    }}
                    className="text-[10px] md:text-[14px] h-auto text-justify text-2xl mx-8 "
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
              className="h-full mt-2 rounded-2xl w-full"
            >
              <div className=" flex flex-col justify-between items-center w-full h-full shadow-2xl rounded-xl">
                <img
                  className="rounded-t-xl w-full object-contain h-[50%]"
                  src={`data:image/jpeg;base64,${messages?.[2]?.img}` || def}
                  alt={messages?.[2]?.name}
                />
                <div className="flex flex-col w-full h-[50%]">
                  <div className="flex items-center w-full h-[15%] font-semibold">
                    <p
                      className={`${"text-red-900 "}  text-[14px] md:text-[17px] ml-3 md:ml-8`}
                    >
                      Message from {messages?.[2]?.designation}
                    </p>
                    <div
                      className={`${"border-red-900"}  ml-2 w-[8%] h-[2px] border-b-4 rounded-3xl`}
                    />
                  </div>
                  <p className="text-[14px] md:text-[18px] h-[15%] font-semibold text-2xl ml-3 md:ml-8">
                    {messages?.[2]?.name || "Loading..."}
                  </p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: messages?.[2]?.message,
                    }}
                    className="text-[10px] md:text-[14px] text-justify text-2xl mx-8 "
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
              className="h-full mt-2 rounded-2xl w-full"
            >
              <div className=" flex flex-col justify-between items-center w-full h-full shadow-2xl rounded-xl">
                <img
                  className="rounded-t-xl object-contain w-full h-[50%]"
                  src={`data:image/jpeg;base64,${messages?.[1]?.img}` || def}
                  alt={messages?.[1]?.name}
                />
                <div className="flex flex-col w-full h-[50%]">
                  <div className="flex items-center w-full h-[15%] font-semibold">
                    <p
                      className={`${"text-red-900 "}  text-[14px] md:text-[17px] ml-3 md:ml-8`}
                    >
                      Message from {messages?.[1]?.designation}
                    </p>
                    <div
                      className={`${"border-red-900"}  ml-2 w-[8%] h-[2px] border-b-4 rounded-3xl`}
                    />
                  </div>
                  <p className="text-[14px] md:text-[18px] h-[15%] font-semibold text-2xl ml-3 md:ml-8">
                    {messages?.[1]?.name || "Loading..."}
                  </p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: messages?.[1]?.message,
                    }}
                    className="text-[10px] md:text-[14px] text-justify text-2xl mx-8"
                  ></p>
                </div>
              </div>
            </Tilt>
          </motion.div>
        </div>
      </div>
      <div
        className="bg-red-900 w-[80px] h-[14%] hidden md:flex justify-end -mt-24 right-40  rounded-tr-xl"
        style={{ position: "absolute", zIndex: -10 }}
      ></div>
    </div>
  );
};

export default SectionWrapper(Messages, "messages");
