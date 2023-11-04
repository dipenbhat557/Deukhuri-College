import { Tilt } from "react-tilt";
import { messageItems } from "../constants";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { styles } from "../styles";
import { useEffect, useState } from "react";

const Messages = () => {
  const [currentMessages, setCurrentMessages] = useState([
    messageItems[0],
    messageItems[1],
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to update the current events based on the currentIndex
  const updateCurrentMessages = () => {
    const startIndex = currentIndex;
    const endIndex = startIndex + 3;
    const nextIndex = endIndex % messageItems.length;
    if (endIndex !== messageItems.length - 1) {
      setCurrentMessages(
        messageItems
          .slice(startIndex, endIndex)
          .concat(messageItems.slice(0, nextIndex))
      );
    } else {
      setCurrentMessages(messageItems.slice(startIndex, endIndex));
    }
  };

  // Function to handle automatic switching of events
  const handleAutoSwitch = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % messageItems.length;
      return newIndex;
    });
  };

  useEffect(() => {
    // Initialize current events
    updateCurrentMessages();

    // Set up automatic switching every 5 seconds (adjust as needed)
    const interval = setInterval(handleAutoSwitch, 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className={`${styles.padding} h-[930px] md:h-[680px]`}>
      <div className="border-dashed border-b-4 rounded-xl  border-red-900" />
      <div
        className="bg-red-900 w-[80px] h-[16%] flex justify-start mt-0.5 ml-[30px] rounded-b-xl"
        style={{ position: "absolute", zIndex: -1 }}
      ></div>
      <div className="w-full h-[95%] flex flex-wrap justify-around items-center">
        {currentMessages.map((message, index) => (
          <motion.div
            key={index}
            variants={fadeIn("up", "spring", index * 0.5, 0.75)}
            className="h-full w-full sm:w-[30%]"
          >
            <Tilt
              options={{
                max: 45,
                scale: 1,
                speed: 450,
              }}
              className="bg-tertiary h-full mt-2 rounded-2xl w-full"
            >
              <div className=" flex flex-col justify-center items-center w-full h-full">
                <img
                  className="rounded-3xl w-[80%] h-[50%]"
                  src={message.img}
                  alt={message.title}
                />
                <div className="flex flex-col w-full h-[30%]">
                  <div className="flex items-center w-full h-[15%] ml-1 md:ml-3 font-semibold">
                    <p className="text-red-900 text-[8px] md:text-[20px] ml-3 md:ml-9">
                      {message.title}
                    </p>
                    <div className="ml-2 w-[8%] h-[2px] border-b-4 border-red-900 rounded-3xl" />
                  </div>
                  <p className="text-[12px] md:text-[16px] h-[85%] text-center text-2xl mx-8">
                    {message.content}
                  </p>
                </div>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
