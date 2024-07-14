import { NavLink, useNavigate } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";

interface NoticeData {
  id: number;
  shortTitle: string;
  fullTitle:string;
  header: boolean;
  img: string;
}

const Notice = () => {
  const [notices, setNotices] = useState<NoticeData[]>([]);
  const navigate = useNavigate();
  const [dataDeleted, setDataDeleted] = useState(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_ROOT}/api/notice`
      );
      const recievedData = response?.data;
      setNotices(recievedData);
    };

    fetchDocuments();
  }, []);

  const handleDelete = async (id: number) => {
    await axios.delete(`${import.meta.env.VITE_APP_API_ROOT}/api/notice/${id}`);
    console.log("Deleted successfully");

    setNotices((prevNotices) =>
      prevNotices.filter((notice) => notice?.id !== id)
    );
    setDataDeleted(true);

    setTimeout(() => {
      setDataDeleted(false);
    }, 3000);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Notices" />

      <div className="flex justify-end py-2 ">
        <button className="bg-gray-300 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ">
          <NavLink to="/forms/notice-form"> Add New Notice</NavLink>
        </button>
      </div>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {dataDeleted && (
            <div className="w-full mx-auto h-[60px] opacity-70 bg-red-400 text-white  mb-2 flex items-center justify-center rounded-lg">
              Data Deleted Successfully !!
            </div>
          )}
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Id
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Title
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Update
                </th>
                <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                  Delete
                </th>
              </tr>
            </thead>

            <tbody>
              {notices?.map((notice, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {notice?.id}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {notice?.title}
                    </h5>
                  </td>
                  <td className="border-b  border-[#eee] py-5 px-4 dark:border-strokedark">
                    <button
                      onClick={() =>
                        navigate("/forms/notice-form", {
                          state: { notice: notice },
                        })
                      }
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex justify-center items-center space-x-3.5">
                      <MdDelete
                        className="text-2xl text-red-400 cursor-pointer"
                        onClick={() => handleDelete(notice?.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Notice;
