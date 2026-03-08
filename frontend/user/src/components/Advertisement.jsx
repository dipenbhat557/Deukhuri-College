import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

const Advertisement = () => {
  const [present, setPresent] = useState(true);
  const [advertisement, setAdvertisement] = useState([]);
  const [loadingAd, setLoadingAd] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoadingAd(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_ROOT}/api/advertisement`
        );
        const receivedData = response?.data ?? [];
        setAdvertisement(Array.isArray(receivedData) ? receivedData : []);
      } catch (error) {
        console.error("Error fetching advertisements:", error);
        setAdvertisement([]);
      } finally {
        setLoadingAd(false);
      }
    };

    fetchDocuments();
  }, []);

  // Only show overlay when not loading and we have at least one ad
  const showOverlay = present && !loadingAd && advertisement?.length > 0;

  if (!showOverlay) return null;

  const firstAd = advertisement[0];
  const hasImage = firstAd?.img;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[43vh] sm:w-[85vh] md:w-[90vh] lg:w-[90%] h-full top-16 left-4 right-4 md:left-14 md:right-10 fixed z-50 bg-slate-900 opacity-25" />
      <div className="w-[40vh] sm:w-[75vh] md:w-[80vh] lg:w-[80%] top-28 left-8 right-4 md:left-24 md:right-10 fixed z-50 h-[800px] sm:h-[600px] flex flex-col ">
        <FaTimes
          className="text-4xl cursor-pointer text-red-900 text-right"
          onClick={() => setPresent(false)}
        />
        <div className="h-[500px] w-auto ">
          {hasImage ? (
            <img
              src={`data:image/jpeg;base64,${firstAd.img}`}
              alt="Advertisement"
              className="w-full h-full object-contain"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default Advertisement;
