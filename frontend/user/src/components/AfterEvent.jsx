import { useRef, useState } from "react";
import { def } from "../assets";
import { styles } from "../styles";
import { useLocation } from "react-router-dom";
import emailjs from "emailjs-com";
import Footer from "./Footer";
import HeroHeader from "./HeroHeader";
import Navbar from "./Navbar";

const oldEvents = [
  {
    img: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/5+AAwAB/QLADAAEAAAAAElFTkSuQmCC", // Base64 encoded 1x1 pixel PNG
    stat: "001",
    date: "2024-07-28",
    content: "Event 1: This is a description of the first event.",
  },
  {
    img: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/5+AAwAB/QLADAAEAAAAAElFTkSuQmCC", // Base64 encoded 1x1 pixel PNG
    stat: "002",
    date: "2024-07-29",
    content: "Event 2: This is a description of the second event.",
  },
  {
    img: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/5+AAwAB/QLADAAEAAAAAElFTkSuQmCC", // Base64 encoded 1x1 pixel PNG
    stat: "003",
    date: "2024-07-30",
    content: "Event 3: This is a description of the third event.",
  },
  {
    img: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/5+AAwAB/QLADAAEAAAAAElFTkSuQmCC", // Base64 encoded 1x1 pixel PNG
    stat: "004",
    date: "2024-07-31",
    content: "Event 4: This is a description of the fourth event.",
  },
  {
    img: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/5+AAwAB/QLADAAEAAAAAElFTkSuQmCC", // Base64 encoded 1x1 pixel PNG
    stat: "005",
    date: "2024-08-01",
    content: "Event 5: This is a description of the fifth event.",
  },
];

const AfterEvent = () => {
  const location = useLocation();
  const [events, setEvents] = useState(oldEvents);

  //   useEffect(() => {
  //     const fetchDocuments = async () => {
  //       try {
  //         const response = await axios.get(
  //           `${import.meta.env.VITE_APP_API_ROOT}/api/event`
  //         );
  //         let receivedData = response?.data;
  //         setEvents(receivedData);
  //       } catch (error) {
  //         console.error("Error fetching notices:", error);
  //       }
  //     };

  //     fetchDocuments();
  //   }, []);

  return (
    <>
      <div className="relative w-full h-[500px] sm:h-[880px]">
        <div className="absolute inset-0 z-[-2]">
          <img
            src={events?.[location?.state?.id]?.img || def}
            alt={`event bg`}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <HeroHeader />
        <Navbar />
      </div>

      <div className={`${styles.padding} w-full h-auto flex flex-col gap-4`}>
        <p className="text-[14px] sm:text-[20px] leading-relaxed text-center">
          Deukhuri Multiple Campus hosts a dazzling event, welcoming actors in
          vibrant attire. Amid cheers and awards, the night celebrates talent,
          fostering a vibrant arts community in Lamahi.
        </p>
        <div className="flex">
          <p className="text-[22px] sm:text-[35px] text-[#6D603F]">Event</p>
          <p className="bg-[#F1E8D7] text-[12px] sm:text-[18px] rounded-lg p-2 ml-2">
            {`#${events?.[location?.state?.id]?.stat || "Loading..."}`}
          </p>
        </div>
        <p className="text-[14px] sm:text-[20px] leading-relaxed text-center">
          {events?.[location?.state?.id]?.content}
        </p>
      </div>

      <div className="w-full text-center">
        <button className="text-[14px] sm:text-[20px] h-[60px] w-[30%] sm:w-[15%] bg-[#6D603F] font-medium text-white rounded-lg p-1 sm:p-2">
          Register now
        </button>
      </div>
      <div className={`${styles.padding} gap-8 flex flex-col `}>
        <div className="flex w-full items-center gap-3">
          <p className="text-[14px] sm:text-[18px] font-medium text-[#6D603F]">
            Event Name :{" "}
          </p>
          <p>{events?.[location?.state?.id]?.name || "NA"} </p>
        </div>

        <div className="flex w-full items-center gap-3">
          <p className="text-[14px] sm:text-[18px] font-medium text-[#6D603F]">
            Date :{" "}
          </p>
          <p>{events?.[location?.state?.id]?.date}</p>
        </div>

        <div className="flex w-full items-center gap-3">
          <p className="text-[14px] sm:text-[18px] font-medium text-[#6D603F]">
            Agenda or Schedule :{" "}
          </p>
          <p>{events?.[location?.state?.id]?.agenda || "NA"} </p>
        </div>
        <div className="flex w-full items-center gap-3">
          <p className="text-[14px] sm:text-[18px] font-medium text-[#6D603F]">
            Speakers and Presenters :{" "}
          </p>
          <p>{events?.[location?.state?.id]?.speaker || "NA"} </p>
        </div>

        <div className="flex w-full items-center gap-3">
          <p className="text-[14px] sm:text-[18px] font-medium text-[#6D603F]">
            Sponsors and Partners :{" "}
          </p>
          <p>{events?.[location?.state?.id]?.sponser || "NA"} </p>
        </div>

        <div className="flex w-full items-center gap-3">
          <p className="text-[14px] sm:text-[18px] font-medium text-[#6D603F]">
            Contact Information :{" "}
          </p>
          <p>{events?.[location?.state?.id]?.contact || "NA"} </p>
        </div>

        <div className="flex w-full items-center gap-3">
          <p className="text-[14px] sm:text-[18px] font-medium text-[#6D603F]">
            Food and Beverages :{" "}
          </p>
          <p>{events?.[location?.state?.id]?.food || "NA"} </p>
        </div>

        <div className="flex w-full items-center gap-3">
          <p className="text-[14px] sm:text-[18px] font-medium text-[#6D603F]">
            Target Audience :{" "}
          </p>
          <p>{events?.[location?.state?.id]?.audience || "NA"} </p>
        </div>
      </div>

      <div
        className={`${styles.padding} flex flex-col sm:flex-row jusitfy-around sm:justify-between items-start w-full h-auto`}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1354202.6980213935!2d82.07730032212807!3d27.76189270619047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399799b1ea979477%3A0x66d23a10685e1572!2sUdyog%20Banijya%20Sangh%2C%20Deukhury!5e0!3m2!1sen!2sin!4v1706104388854!5m2!1sen!2sin"
          allowFullScreen=""
          id="location"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[500px] mt-3 sm:mt-0 sm:my-auto"
        ></iframe>
      </div>

      <Footer />
    </>
  );
};

export default AfterEvent;
