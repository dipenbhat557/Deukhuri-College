import { useEffect, useRef, useState } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { styles } from "../styles";
import { useNavigate } from "react-router-dom";
import { SectionWrapper } from "../hoc";

const VideoTour = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [autoplay, setAutoplay] = useState(true);

  const handleReadmore = () => {
    navigate("/about");
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
      className={`${styles.padding} h-auto flex flex-col sm:h-auto mt-4 mb-0 mx-auto bg-white`}
    >
      <motion.div variants={textVariant()} className="h-[10%] w-full">
        <div className="flex items-center h-[15%] font-semibold">
          <p className="text-[10px] text-red-900 md:text-[15px]">
            A SHORT VIDEO TOUR
          </p>
        </div>
        <p className="h-[90%] text-black text-[22px] font-semibold">
          Welcome to
          <br /> Deukhuri Multiple Campus
        </p>
      </motion.div>
      <div className="h-auto sm:h-auto w-full flex flex-wrap items-center justify-between mt-8">
        <motion.div
          variants={fadeIn("right", "spring", 1, 0.75)}
          className="relative h-[200px] w-full sm:h-[300px] sm:w-[48%]"
        >
          <iframe
            ref={videoRef}
            src="https://www.youtube.com/embed/zQj04ywrimM?autoplay=1&mute=1&loop=1&controls=0"
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
            className="rounded-2xl bg-red-900"
          />
        </motion.div>
        <motion.div
          className="h-auto sm:h-auto w-full sm:w-[48%] mt-4 sm:mt-0 flex items-center justify-center flex-col bg-gradient-to-b from-red-900 to-red-50 mb-4 p-auto rounded-2xl"
          variants={fadeIn("left", "spring", 1, 0.75)}
        >
          <Tilt
            options={{
              max: 45,
              scale: 1,
              speed: 450,
            }}
            className="p-5 flex flex-col items-center justify-center rounded-2xl h-full w-full"
          >
            <p className="text-[20px] font-semibold mb-2 text-center">
              Introduction
            </p>
            <p className="md:text-[18px] text-[12.5px] text-center">
              Deukhuri Multiple Campus was established in 2005 AD (2062 BS) as a
              community campus located in Lamahi, Deukhuri, Dang district of
              Nepal. This campus is running with the supports of community
              people and University Grants Commission of Nepal. It is affiliated
              to Tribhuvan University (TU) for Bachelor and Master Degree
              programs. It has been imparting quality education in the
              facilities of Management, Arts and Science.
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

export default SectionWrapper(VideoTour, "");
