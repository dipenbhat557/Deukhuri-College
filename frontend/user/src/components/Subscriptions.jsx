import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { useState } from "react";
import axios from "axios";
const Subscription = () => {

  const [formData, setFormData] = useState({
    email:  "",
  });
  const [dataSaved, setDataSaved] = useState(false);

  const handleSubscribe = async () => {
      try {
        await axios.post(
          `${import.meta.env.VITE_APP_API_ROOT}/api/subscribed`,
          { email: formData?.email },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
      setFormData({
        email: "",
      });
      setDataSaved(true);
      setTimeout(() => setDataSaved(false), 3000);
    };

  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.5, 0.75)}
      className="flex flex-col w-[100%] h-[330px] sm:h-[300px] justify-center items-center text-white mt-6 bg-gradient-to-b from-red-950 to-red-400 pt-4"
    >
      {dataSaved && (
            <div className="w-full h-[60px] bg-[#06905E] mb-2 flex items-center justify-center rounded-lg">
              Data Uploaded Successfully !!
            </div>
          )}
      <div className="flex flex-row md:w-[25%] items-center justify-center mt-2">
        <div className="w-[8%] h-[5px] border-b-4 border-[#DB0E0E]  mr-2 flex-grow" />
        <p className="font-extrabold text-xl sm:text-2xl">SUBSCRIPTION</p>
        <div className="w-[8%] h-[5px] border-b-4 ml-2 border-[#DB0E0E] flex-grow" />
      </div>
      <p className="font-extrabold my-2 sm:my-3 text-[16px] sm:text-[20px]">
        Join our Newsletter
      </p>
      <p className="w-[40%] sm:w-[25%] text-center font-semibold text-[12px] md:text-[16px] md:leading-loose m-2">
        Subscribe to our Newsletter to get the latest news, updates delivered
        directly to your inbox.
      </p>
      <div className="my-2 mb-6 flex-wrap justify-center items-center flex flex-row">
        <input
        value={formData.email}
                  name="email"
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      email: e.target.value,
                    }))
                  }
          type="text"
          placeholder="Enter your mail address"
          className="p-2 px-4 sm:px-10 rounded-xl"
        />
        <button
          onClick={handleSubscribe}
          className="bg-red-900 font-bold text-white  mt-2 hover:bg-red-800 ml-3 p-2 px-4 shadow-lg shadow-black  rounded-xl"
        >
          Subscribe
        </button>
      </div>
    </motion.div>
  );
};
export default SectionWrapper(Subscription, "");
