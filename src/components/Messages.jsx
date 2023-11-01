import { Tilt } from "react-tilt";
import { messageItems } from "../constants";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

const MessageCard = ({ index, img, title, content }) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary h-[50%] p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className=" flex flex-col justify-center items-center w-full h-[30%]">
          <img className="rounded-3xl w-[80%] h-[90%]" src={img} alt={title} />
          <div className="flex flex-col">
            <div className="flex items-center ml-1 md:ml-3 font-semibold">
              <p className="text-red-900 text-8px md:text-18px ml-3 md:ml-9">
                {title}
              </p>
              <div className="ml-2 w-[8%] h-[2px] border-b-4 border-red-900 rounded-3xl" />
            </div>
            <p className="text-[12px] md:text-[14px] text-center text-2xl font-bold md:font-extrabold mx-8">
              {content}
            </p>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Messages = () => {
  return (
    <div className="w-[95%] h-[930px] md:h-[450px] mt-4 mb-2 mx-auto">
      <div className="border-dashed border-b-4 rounded-xl mx-auto border-red-900" />
      <div
        className="bg-red-900 w-[80px] h-[16%] flex justify-start mt-0.5 ml-[30px] rounded-b-xl"
        style={{ position: "absolute", zIndex: -1 }}
      ></div>
      <div className="w-full h-full flex flex-row flex-wrap justify-around items-center mx-auto md:mx-auto mt-auto md:mt-auto  mb-auto">
        {messageItems.map((message, index) => (
          <MessageCard key={`message-${index}`} index={index} {...message} />
        ))}
      </div>
    </div>
  );
};

export default Messages;
