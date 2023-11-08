import { Tilt } from "react-tilt";
import { messageItems } from "../constants";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { styles } from "../styles";
import { useEffect, useState } from "react";
import { SectionWrapper } from "../hoc";

const Messages = () => {
  const [currentMessages, setCurrentMessages] = useState([
    messageItems[0],
    messageItems[1],
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const updateCurrentMessages = () => {
    setCurrentMessages([
      messageItems[currentIndex],
      messageItems[(currentIndex + 1) % messageItems.length],
    ]);
  };

  const handleAutoSwitch = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % messageItems.length;
      return newIndex;
    });
  };

  useEffect(() => {
    updateCurrentMessages();
    const interval = setInterval(handleAutoSwitch, 7000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className={`sm:px-28 px-6 sm:py-6 py-5 w-[95%] h-auto md:h-[760px]`}>
      <div
        className="bg-[#212529] w-[80px] h-[14%] flex justify-start mt-0.5  rounded-t-xl"
        style={{ position: "absolute", zIndex: -1 }}
      ></div>
      <div className="w-[95%] h-full flex items-center justify-center mx-8">
        <div className="w-full h-[80%] mt-5 flex flex-wrap justify-between items-center">
          {currentMessages.map((message, index) => (
            <motion.div
              key={index}
              variants={fadeIn("up", "spring", index * 0.5, 0.75)}
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
                    src={message.img}
                    alt={message.title}
                  />
                  <div className="flex flex-col w-full h-[50%]">
                    <div className="flex items-center w-full h-[15%] font-semibold">
                      <p
                        className={`${
                          index == 0 ? "text-[#212529] " : "text-red-900 "
                        }  text-[14px] md:text-[17px] ml-3 md:ml-8`}
                      >
                        {message.title}
                      </p>
                      <div
                        className={`${
                          index == 0 ? "border-[#212529]" : "border-red-900"
                        }  ml-2 w-[8%] h-[2px] border-b-4 rounded-3xl`}
                      />
                    </div>
                    <p className="text-[14px] md:text-[18px] h-[15%] font-semibold text-2xl ml-3 md:ml-8">
                      {message.name}
                    </p>
                    <p className="text-[10px] md:text-[14px] h-[85%] text-justify text-2xl mx-8">
                      {message.content}
                    </p>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
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
