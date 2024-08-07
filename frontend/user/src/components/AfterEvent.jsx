import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { def } from "../assets";
import { styles } from "../styles";
import Footer from "./Footer";
import HeroHeader from "./HeroHeader";
import Navbar from "./Navbar";


const AfterEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [allEvents, setAllEvents] = useState(oldEvents);
  const [otherEvents, setOtherEvents] = useState([]);

    useEffect(() => {
      const fetchDocuments = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_API_ROOT}/api/event`
          );
          let receivedData = response?.data;
          setAllEvents(receivedData);
        } catch (error) {
          console.error("Error fetching notices:", error);
        }
      };

      fetchDocuments();
    }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchEvent = () => {
      let foundEvent = allEvents.find((event) => event.id === parseInt(id));
      setEvent(foundEvent);
      foundEvent = allEvents.filter((event) => event?.id !== parseInt(id));
      setOtherEvents(foundEvent);
    };

    fetchEvent();
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <>
      <div className="relative w-full h-[500px] sm:h-[880px]">
        <div className="absolute inset-0 z-[-2]">
          <img
            src={event.image || def}
            alt="event background"
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
          <p className="text-[22px] sm:text-[25px] text-red-900">Event</p>
          <p className="bg-red-700 bg-opacity-30 text-[12px] sm:text-[18px] rounded-lg p-2 ml-2">
            {`#${event.id}`}
          </p>
        </div>
        <div className="flex w-full items-center gap-3">
          <p className="text-[14px] text-center w-full px-2 sm:text-[18px] font-semibold ">
            {event.title}
          </p>
        </div>
        <p className="text-[14px] sm:text-[20px] leading-relaxed text-center">
          {event.description}
        </p>
      </div>

      <div className={`${styles.padding} w-full h-auto`}>
        <p className="font-semibold text-red-900  text-[25px] sm:text-[30px]">
          More like this
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {otherEvents?.map((event) => {
            const img = `data:image/jpeg;base64,${event.image || ""}` || def;

            return (
              <div
                key={event.id}
                className="flex flex-col h-[500px] sm:h-[650px] rounded-lg shadow-lg overflow-hidden bg-white hover:bg-red-900 hover:text-white transition duration-300"
              >
                <div className="relative w-full h-[50%]">
                  <img
                    src={img}
                    alt={`img-${event.id}`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col p-4 h-[50%]">
                  <p className="text-[18px] font-semibold mb-2">
                    {event.title || "Loading..."}
                  </p>
                  <p className="text-[14px] leading-loose line-clamp-4">
                    {event.description || "Loading..."}
                  </p>
                </div>
                <button
                  className="mt-auto py-2 px-4 rounded-lg bg-red-900 text-white text-[14px] mx-auto mb-4"
                  onClick={() => navigate(`/afterevent/${event.id}`)}
                >
                  Know more
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={`${styles.padding} flex flex-col sm:flex-row justify-around sm:justify-between items-start w-full h-auto`}
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
