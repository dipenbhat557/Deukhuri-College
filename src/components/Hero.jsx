import React, { useEffect, useState, useRef } from "react";
import { heroElements } from "../constants";
import Navbar from "./Navbar";
import { BiSolidRightArrow } from "react-icons/bi";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import "../index.css"; // Import your CSS file for animations

const Hero = ({ scrolled }) => {
  const [currentElement, setCurrentElement] = useState(0);
  const videoRefs = heroElements.map(() => useRef(null));

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
      <div className="w-full h-[620px] relative">
        <div className="video-container">
          {heroElements.map((element, index) => (
            <div
              key={index}
              className={`video-slide absolute w-full h-full  ${
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
                className="h-full w-full object-cover"
              />

              <div className="h-[40%] flex items-center text-white justify-between absolute bottom-7 w-[45%] gap-3 z-10">
                <BiSolidRightArrow className="text-red-900 text-9xl mb-2 ml-0 w-[16%]" />
                <p className="font-semibold sm:text-[35px] text-[20px] leading-snug tracking-wide md:text-[45px] w-[60%]">
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

export default Hero;
