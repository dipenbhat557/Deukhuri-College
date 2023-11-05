import { Tilt } from "react-tilt";
import { blogBg, program } from "../assets";
import { messageItems, programs } from "../constants";
import { styles } from "../styles";
import { fadeIn } from "../utils/motion";
import Footer from "./Footer";
import HeroHeader from "./HeroHeader";
import Navbar from "./Navbar";
import RegisterSection from "./RegisterSection";
import { motion } from "framer-motion";
import Subscription from "./Subscriptions";

const Blog = () => {
  return (
    <>
      <HeroHeader />
      <div className="w-full h-[616px] relative">
        <img
          src={blogBg}
          alt="Graduate BG"
          className="w-full h-full object-cover -z-10"
        />

        <div className="w-full h-full bg-black bg-opacity-5 absolute top-2 left-0 flex flex-col justify-between items-center text-white">
          <Navbar active="BLOG" style={{ background: "transparent" }} />

          <div className="w-[60%] h-[15%] flex flex-col ">
            <div className="w-full h-[60%] text-center pt-2 bg-red-900">
              <p className="text-[20px] font-bold text-white">Blog</p>
            </div>
            <div className="w-full h-[40%] bg-white" />
          </div>
        </div>
      </div>
      <div className={`${styles.padding} w-full h-auto relative`}>
        <div className="w-full h-[10%] flex items-start justify-center">
          <p className="text-[25px] font-bold">Message's from our Faculty</p>
        </div>
        <div
          className="bg-red-950 w-[80px] h-[100px] flex justify-start top-20 ml-[40px] rounded-t-xl"
          style={{ position: "absolute", zIndex: -1 }}
        ></div>

        <div className="w-full h-[80%] flex flex-wrap justify-around items-center mb-16">
          {messageItems.map((message, index) => (
            <Tilt
              options={{
                max: 45,
                scale: 1,
                speed: 450,
              }}
              className=" mt-9 rounded-2xl h-[590px] w-full sm:w-[35%]"
            >
              <div className=" flex mt-10 flex-col justify-center items-center w-full h-full shadow-2xl p-4">
                <img
                  className="rounded-3xl w-[80%] h-[55%]"
                  src={message.img}
                  alt={message.title}
                />
                <div className="flex flex-col w-full h-[40%]">
                  <div className="flex items-center w-full h-[15%] ml-1 md:ml-3 font-semibold">
                    <p className="text-red-900 text-[8px] md:text-[20px] ml-3 md:ml-9">
                      {message.title}
                    </p>
                    <div className="ml-2 w-[8%] h-[2px] border-b-4 border-red-900 rounded-3xl" />
                  </div>
                  <p className="text-[14px] md:text-[18px] h-[85%] font-semibold text-2xl ml-3 md:ml-10">
                    {message.name}
                  </p>
                  <p className="text-[12px] md:text-[16px] h-[85%] text-center text-2xl mx-8">
                    {message.content}
                  </p>
                </div>
              </div>
            </Tilt>
          ))}
        </div>
        <div
          className="bg-red-900 w-[80px] h-[90px] flex justify-end bottom-4 right-28 rounded-b-xl"
          style={{ position: "absolute", zIndex: -1 }}
        ></div>
      </div>

      <div className="w-full">
        <RegisterSection />
        <Subscription />
        <Footer />
      </div>
    </>
  );
};
export default Blog;
