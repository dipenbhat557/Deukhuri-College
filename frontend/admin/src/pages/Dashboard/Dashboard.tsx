import React, { useEffect, useState } from "react";

import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currUser } from "../store";
import { Timestamp, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface HistoryData {
  title: string;
  user: string;
  date: string;
  item: string;
  role: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = useRecoilValue(currUser);
  const [history, setHistory] = useState<HistoryData[]>([]);

  useEffect(() => {
    if (currentUser?.role !== "admin") {
      navigate("/signin");
    }

    const fetchDocuments = async () => {
      const querySnapshot = await getDocs(collection(db, "history"));
      const gotHistory: { data: HistoryData; dateObj: Date }[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const date = data.date;
        let dateObject: Date | null = null;

        if (date instanceof Timestamp) {
          dateObject = date.toDate();
        } else {
          console.error("Invalid or missing date field:", date);
        }

        if (dateObject) {
          const h: HistoryData = {
            title: data?.title,
            date: "",
            role: data?.role,
            user: data?.user,
            item: data?.item,
          };
          gotHistory.push({ data: h, dateObj: dateObject });
        }
      });

      gotHistory.sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());

      const sortedHistory: HistoryData[] = gotHistory.map((entry) => {
        return {
          ...entry.data,
          date: entry.dateObj.toString().slice(0, 21),
        };
      });

      setHistory(sortedHistory);
    };

    fetchDocuments();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Dashboard" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Title
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Item
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Role
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Date & Time
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Updated By
                </th>
              </tr>
            </thead>
            <tbody>
              {history?.map((item, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {item?.title}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{item?.item}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{item?.role}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <p className="text-black dark:text-white">{item?.date}</p>
                    </div>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {item?.user}
                    </h5>
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

export default Dashboard;
