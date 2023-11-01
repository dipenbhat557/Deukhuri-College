import { useEffect, useRef, useState } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { vid1 } from "../assets";
import { styles } from "../styles";

const VideoTour = () => {
  const [autoplay, setAutoplay] = useState(false);
  const videoRef = useRef(null);

  const handleReadmore = () => {
    // Implement your read more logic here
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setAutoplay(true);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`${styles.padding} w-[98%] h-[450px] md:h-[510px] mt-4 mb-0 mx-auto bg-white`}
    >
      <div className="h-[10%] w-full">
        <div className="flex items-center h-[15%]  font-semibold">
          <p className=" text-[10px] text-red-900 md:text-[15px]">
            A SHORT VIDEO TOUR
          </p>
        </div>
        <p className="h-[90%] text-black text-[22px] font-semibold">
          Welcome to
          <br /> Deukhuri Multiple Campus
        </p>
      </div>
      <div className="h-[85%] w-full flex flex-wrap items-center justify-between mt-8">
        <div className="relative h-full w-[48%]">
          <iframe
            ref={videoRef}
            src={vid1}
            title="Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            className="rounded-2xl bg-slate-500"
          />
        </div>
        <motion.div
          className="h-full w-[40%] flex items-center justify-center flex-col bg-gradient-to-b from-red-900 to-red-50 mb-4 p-auto rounded-2xl"
          variants={fadeIn("up", "spring", 1, 0.75)}
        >
          <Tilt
            options={{
              max: 45,
              scale: 1,
              speed: 450,
            }}
            className=" p-5 flex flex-col items-center justify-center rounded-2xl h-full w-full"
          >
            <p className="text-[20px] font-semibold mb-2 text-center">
              Introduction
            </p>
            <p className="md:text-[18px] text-[12.5px] text-center">
              Deukhuri Group was established in 1998 AD, Dang founded by a group
              of Gurkhas (Lahures) to provide quality education for current and
              future generation of students. The Gorkha Group has been running 3
              schools
            </p>
            <button
              className="bg-red-900 text-white font-semibold rounded-md p-2 mt-3 hover:bg-red-950 cursor-pointer"
              onClick={handleReadmore}
            >
              Read more
            </button>
          </Tilt>
        </motion.div>
      </div>
    </div>
  );
};
export default VideoTour;
