import React, { useEffect, useState, useRef } from "react";
import { heroElements } from "../constants";
import Navbar from "./Navbar";
import { BiSolidRightArrow } from "react-icons/bi";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import "../index.css";
import { SectionWrapper } from "../hoc";

const Hero = () => {
  const [currentElement, setCurrentElement] = useState(0);
  const videoRefs = heroElements.map(() => useRef(null));
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= 105) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    // const debouncedHandleScroll = debounce(handleScroll, 100); // Adjust the delay time (in milliseconds) as needed
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentElement(
        (prevElement) => (prevElement + 1) % heroElements.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Pause all videos
    videoRefs.forEach((videoRef) => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    });

    // Play the current video
    if (videoRefs[currentElement].current) {
      const video = videoRefs[currentElement].current;
      video.load(); // Reload the video
      video.play(); // Start playing

      // Listen for the video's end and loop it
      video.addEventListener("ended", () => {
        video.currentTime = 0;
        video.play();
      });
    }
  }, [currentElement, videoRefs]);

  return (
    <>
      <div className="w-full h-[500px] sm:h-[616px] relative">
        <div className="video-container">
          {heroElements.map((element, index) => (
            <div
              key={index}
              className={`absolute w-full h-full  ${
                index === currentElement ? "visible" : "hidden"
              }`}
            >
              <div
                className={`video-slide w-full h-full video-element ${
                  index === currentElement ? "video-fade-in" : "video-fade-out"
                }`}
              >
                <video
                  ref={videoRefs[index]}
                  src={element.video}
                  title="Video BG"
                  autoPlay // Autoplay the video
                  muted
                  controls={false} // Hide video controls
                  style={{
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  className=" object-cover"
                />
              </div>

              <div
                className={`text-slide h-[40%] flex items-center justify-between absolute bottom-7 w-[45%] gap-3 z-10 ${
                  index === currentElement ? "text-fade-in" : "text-fade-out"
                }`}
              >
                <BiSolidRightArrow className="text-red-900 text-9xl mb-2 ml-0 w-[16%]" />
                <p className="font-semibold text-white sm:text-[35px] text-[20px] leading-snug tracking-wide md:text-[45px] w-[60%]">
                  {element.text}
                </p>
                <MdOutlineArrowForwardIos className="text-9xl text-red-900 w-[19%] cursor-pointer" />
              </div>
            </div>
          ))}
        </div>

        <div className="w-full z-30 h-full bg-black bg-opacity-30 absolute top-0 left-0 flex flex-col justify-between text-white">
          {scrolled || <Navbar active="HOME" scrolled={scrolled} />}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Hero, "hero");
