import { useEffect, useState } from "react";
import useFetch from "./UseFetch";
import { FaTimes } from "react-icons/fa";
import { def } from "../assets";
import axios from "axios";

const Advertisement = () => {
  const [present, setPresent] = useState(true);
  return <>{present && <Notice setPresent={setPresent} />}</>;
};
export default Advertisement;

const Notice = ({ setPresent }) => {
  const [advertisement, setAdvertisement] = useState([]);
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_ROOT}/api/advertisement`
        );
        let receivedData = await response?.data;
        // console.log("advertisement is ",receivedData)
        setAdvertisement(receivedData); 
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[43vh] sm:w-[85vh] md:w-[90vh] lg:w-[90%] h-full top-16 left-4 right-4 md:left-14 md:right-10 fixed z-50 bg-slate-900 opacity-25" />
      <div className="w-[40vh] sm:w-[75vh] md:w-[80vh] lg:w-[80%]   top-28 left-8 right-4 md:left-24 md:right-10 fixed z-50 h-[800px] sm:h-[600px] flex flex-col ">
        <FaTimes
          className="text-4xl cursor-pointer text-red-900 text-right"
          onClick={() => setPresent(false)}
        />
        <div className="h-[500px] w-auto ">
          <img
            src={`data:image/jpeg;base64,${advertisement?.[0]?.img}` || def}
            alt="No notices for now"
            className="w-full h-full object-contain "
          />
        </div>
      </div>
    </div>
  );
};
