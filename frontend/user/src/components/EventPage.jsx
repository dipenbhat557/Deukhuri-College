import { useNavigate } from "react-router-dom";
import { styles } from "../styles";
import { def } from "../assets";
import Subscriptions from "./Subscriptions";
import Footer from "./Footer";
import HeroHeader from "./HeroHeader";
import Navbar from "./Navbar";
import useFetch from "./UseFetch";
import { useEffect, useState } from "react";

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

const EventPage = () => {
  const navigate = useNavigate();
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
          Multiple Campus ! We are thrilled to bring together local businesses,
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

      <div
        className={`${styles.padding} h-auto w-full flex flex-col items-center justify-between`}
      >
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between items-start gap-4 h-auto w-full">
          {events?.map((event, index) => {
            const img = `data:image/jpeg;base64,${event?.img || ""}` || def;

            return (
              <div
                key={index}
                className="h-[600px] sm:h-[680px] w-full sm:w-[28%] flex flex-wrap flex-col justify-between items-center"
              >
                <div className="flex flex-col justify-around h-[90%] w-full rounded-lg hover:bg-[#6D603F] hover:text-white">
                  <div className="w-full h-[50%] relative">
                    <img
                      src={img}
                      alt={`img-${index}`}
                      className="object-cover w-full h-full rounded-t-lg"
                    />
                    <p className="absolute bg-[#F1E8D7] text-slate-800 top-0 right-0 text-[12px] w-[27%] h-[13%] p-2 rounded-bl-md rounded-tr-lg">
                      {`#${event?.stat || "Loading.."}`}
                    </p>
                  </div>
                  <div className="w-[full] h-[50%] flex flex-col ">
                    <p className="w-full h-[10%] pr-3 text-end mt-2">
                      {event?.date || "Loading..."}
                    </p>
                    <p className="w-full h-[90%] p-3 leading-loose text-[18px] line-clamp-5">
                      {event?.content || "Loading..."}
                    </p>
                  </div>
                </div>

                <button
                  className="border-4 h-[7%] sm:h-[6%] w-[100px] sm:w-[200px] border-[#6D603F] text-[16px] rounded-lg"
                  onClick={() =>
                    navigate("/afterevent", { state: { id: index } })
                  }
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
