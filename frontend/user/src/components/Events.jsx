import { useNavigate } from "react-router-dom";
import { styles } from "../styles";
import { def } from "../assets";
import { useEffect, useState } from "react";

const events = [
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

const Events = () => {
  const navigate = useNavigate();
  //   const [events, setEvents] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const createBlobUrl = (base64Data) => {
    if (!base64Data || typeof base64Data !== "string") {
      console.error("Invalid base64 data");
      return "";
    }

    try {
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length)
        .fill()
        .map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" });
      return URL.createObjectURL(blob);
    } catch (e) {
      console.error("Failed to decode base64 data:", e);
      return "";
    }
  };

  const updateCurrentEvents = () => {
    const startIndex = currentIndex;
    const endIndex = startIndex + 3;
    let nextIndex = endIndex % events?.length;

    if (endIndex > events?.length - 1) {
      setCurrentEvents(
        events?.slice(startIndex, endIndex).concat(events?.slice(0, nextIndex))
      );
    } else {
      setCurrentEvents(events?.slice(startIndex, endIndex));
    }
  };

  const handleAutoSwitch = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % events?.length;
      return newIndex;
    });
  };

  useEffect(() => {
    updateCurrentEvents();

    const interval = setInterval(handleAutoSwitch, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, events]);

  return (
    <div
      className={`${styles.padding} h-auto w-full flex flex-col items-center justify-between`}
    >
      <p className="w-full font-medium text-[#6D603F] text-[20px] sm:text-[42.79px] h-[80px]">
        Events
      </p>

      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between gap-3 items-start h-auto w-full">
        {currentEvents?.map((event, index) => {
          // Base64 image data handling
          const img =
            `data:image/jpeg;base64,${event?.[currentIndex]?.img}` || def;

          return (
            <div
              key={index}
              className="flex flex-col justify-around h-[500px] sm:h-[650px] w-full sm:w-[28%] rounded-lg hover:bg-[#6D603F] hover:text-white"
            >
              <div className="w-full h-[50%] relative">
                <img
                  src={img}
                  alt={`img-${index}`}
                  className="object-cover w-full h-full rounded-t-lg"
                />
                <p className="absolute bg-[#F1E8D7] text-slate-800 top-0 right-0 text-[11px] sm:text-[14px] w-[30%] h-[13%] p-1 sm:p-2 rounded-bl-md rounded-tr-lg">
                  {`#${event?.stat || "Loading.."}`}
                </p>
              </div>
              <div className="w-[full] h-[50%] flex flex-col ">
                <p className="w-full h-[10%] pr-3 text-end mt-2">
                  {event?.date || "Loading..."}
                </p>
                <p className="w-full h-[80%] p-3 sm:leading-loose text-[14px] sm:text-[20px] line-clamp-6">
                  {`${event?.content || "Loading..."}`}
                </p>
                <button
                  className="h-[10%] rounded-md w-[30%] text-[10px] sm:text-[14px] text-white bg-[#6D505F] mx-auto"
                  onClick={() => navigate("/events")}
                >
                  Read more...
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="text-[18px] sm:text-[23.42px] border-4 border-[#6D603F] px-2 sm:px-5 rounded-xl py-1 w-[30%] sm:w-[14%] h-[50px] sm:h-[60px] mt-10"
        onClick={() => navigate("/events")}
      >
        More
      </button>
    </div>
  );
};

export default Events;
