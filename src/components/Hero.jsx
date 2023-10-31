import { useEffect, useState } from "react";
import { heroElements } from "../constants";
import Navbar from "./Navbar";
import { BiSolidRightArrow } from "react-icons/bi";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const Hero = () => {
  const [currentElement, setCurrentElement] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentElement(
        (prevElement) => (prevElement + 1) % heroElements.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const video = document.getElementById("hero-video");
    video.load(); // Reload the video
    video.play(); // Start playing

    // Listen for the video's end and loop it
    video.addEventListener("ended", () => {
      video.currentTime = 0;
      video.play();
    });
  }, [currentElement]);

  return (
    <div className="w-full h-[600px] bg-gray-300 relative">
      <Navbar />
      <div className="w-full h-full">
        {heroElements.map((element, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-300 ${
              index === currentElement ? "opacity-100" : "opacity-0"
            }`}
          >
            <video
              id="hero-video"
              src={element.video}
              title="Video"
              autoPlay // Autoplay the video
              controls={false} // Hide video controls
              style={{
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              className="h-full object-cover"
            />
            <div className=" h-[40%] flex ml-0 items-center justify-between absolute bottom-7  w-[60%] gap-3 text-black z-10">
              <BiSolidRightArrow className="text-red-900 text-9xl mb-2 ml-0 w-[16%]" />
              <p className="font-semibold sm:text-[30px] text-[20px] leading-loose md:text-[40px] w-[65%]">
                {element.text}
              </p>
              <MdOutlineArrowForwardIos className="text-9xl text-red-900 w-[19%]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
