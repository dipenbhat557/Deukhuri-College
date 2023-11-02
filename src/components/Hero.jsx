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
    <>
      <div className="w-full h-[600px] relative">
        {heroElements.map((element, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity -z-40 duration-300 ${
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
              className="h-full w-full object-cover -z-50"
            />

            <div className="h-[40%] flex items-center justify-between absolute bottom-7 w-[45%] gap-3 text-slate-800 z-10">
              <BiSolidRightArrow className="text-red-900 text-9xl mb-2 ml-0 w-[16%]" />
              <p className="font-semibold sm:text-[30px] text-[20px] leading-loose md:text-[40px] w-[60%]">
                {element.text}
              </p>
              <MdOutlineArrowForwardIos className="text-9xl text-red-900 w-[19%]" />
            </div>
          </div>
        ))}

        <div className="w-full z-30 h-full bg-black bg-opacity-5 absolute top-0 left-0 flex flex-col justify-between text-white">
          <Navbar active="HOME" style={{ background: "transparent" }} />
        </div>
      </div>
    </>
  );
};

export default Hero;
