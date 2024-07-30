import { useNavigate } from "react-router-dom";
import { styles } from "../styles";
import { def } from "../assets";
import Subscriptions from "./Subscriptions";
import Footer from "./Footer";
import HeroHeader from "./HeroHeader";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";

// Sample data
const events = [
  {
    id: 1,
    title: "Event 1",
    description: "This is a description of the first event.",
    image:
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/5+AAwAB/QLADAAEAAAAAElFTkSuQmCC",
  },
  {
    id: 2,
    title: "Event 2",
    description: "This is a description of the second event.",
    image:
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/5+AAwAB/QLADAAEAAAAAElFTkSuQmCC",
  },
  {
    id: 3,
    title: "Event 3",
    description: "This is a description of the third event.",
    image:
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/5+AAwAB/QLADAAEAAAAAElFTkSuQmCC",
  },
  {
    id: 4,
    title: "Event 4",
    description: "This is a description of the fourth event.",
    image:
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/5+AAwAB/QLADAAEAAAAAElFTkSuQmCC",
  },
  {
    id: 5,
    title: "Event 5",
    description: "This is a description of the fifth event.",
    image:
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/5+AAwAB/QLADAAEAAAAAElFTkSuQmCC",
  },
];

const EventPage = () => {
  const navigate = useNavigate();
  const [eventsData, setEventsData] = useState(events);

  //   useEffect(() => {
  //     const fetchDocuments = async () => {
  //       try {
  //         const response = await axios.get(
  //           `${import.meta.env.VITE_APP_API_ROOT}/api/event`
  //         );
  //         let receivedData = response?.data;
  //         setEventsData(receivedData);
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
            src={def}
            alt="event background"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <HeroHeader />
        <Navbar />
      </div>

      <div className={`${styles.padding} w-full h-auto flex flex-col gap-4`}>
        <p className="text-[35px] text-[#6D603F]">Events</p>
        <p className="text-[12px] sm:text-[18px] leading-relaxed text-justify ">
          Join us for an exciting and informative event hosted by the Deukhuri
          Multiple Campus! We are thrilled to bring together local businesses,
          entrepreneurs, and community members to foster collaboration and
          economic growth in Lamahi. The event will feature engaging discussions
          on current business trends, networking opportunities, and
          presentations from industry leaders. Whether you are a seasoned
          professional or just starting your entrepreneurial journey, this event
          offers a unique platform to connect, learn, and share ideas. Come be a
          part of this vibrant gathering that aims to strengthen the business
          community in Lamahi. Mark your calendars for an enriching experience
          that promises valuable insights and connections for the growth of your
          business.
        </p>
      </div>

      <div className={`${styles.padding} w-full h-auto`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {eventsData.map((event) => {
            const img = `data:image/jpeg;base64,${event.image || ""}` || def;

            return (
              <div
                key={event.id}
                className="flex flex-col h-[500px] sm:h-[650px] rounded-lg shadow-lg overflow-hidden bg-white hover:bg-[#6D603F] hover:text-white transition duration-300"
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
                  className="mt-auto py-2 px-4 rounded-lg bg-[#6D603F] text-white text-[14px] mx-auto mb-4"
                  onClick={() => navigate(`/afterevent/${event.id}`)}
                >
                  Know more
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <Subscriptions />
      <Footer />
    </>
  );
};

export default EventPage;
