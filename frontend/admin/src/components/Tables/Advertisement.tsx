import { NavLink, useNavigate } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { def } from "../../assets";

interface AdvertisementData {
  id: number;

  img: string;
}

const Advertisement = () => {
  const [advertisements, setAdvertisements] = useState<AdvertisementData[]>([]);
  const navigate = useNavigate();
  const [dataDeleted, setDataDeleted] = useState(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_ROOT}/api/advertisement`
      );
      const recievedData = response?.data;
      setAdvertisements(recievedData);
    };

    fetchDocuments();
  }, []);

  const handleDelete = async (id: number) => {
    await axios.delete(
      `${import.meta.env.VITE_APP_API_ROOT}/api/advertisement/${id}`
    );
    console.log("Deleted successfully");

    setAdvertisements((prevAdvertisements) =>
      prevAdvertisements.filter((advertisement) => advertisement?.id !== id)
    );
    setDataDeleted(true);

    setTimeout(() => {
      setDataDeleted(false);
    }, 3000);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Advertisements" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {dataDeleted && (
            <div className="w-full mx-auto h-[60px] opacity-70 bg-red-400 text-white  mb-2 flex items-center justify-center rounded-lg">
              Data Deleted Successfully !!
            </div>
          )}
          <div className="mb-4">
            <img
              src={`data:image/jpeg;base64,${advertisements?.[0]?.img}` || def}
              className="rounded-lg max-h-40 w-auto max-w-xs object-contain border border-stroke"
              alt="Advertisement"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() =>
                navigate("/forms/advertisement-form", {
                  state: { advertisement: advertisements?.[0] },
                })
              }
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </button>
            {advertisements?.[0]?.id != null && (
              <button
                onClick={() => handleDelete(advertisements[0].id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center gap-1"
              >
                <MdDelete className="w-5 h-5" />
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Advertisement;
