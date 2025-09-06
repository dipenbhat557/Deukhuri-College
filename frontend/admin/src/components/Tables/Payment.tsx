import {  NavLink, useNavigate } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";

interface PaymentData {
  id: number;
  userId:number;
  verified:boolean;
  img: string;
}

const Payment = () => {
  const [payments, setPayments] = useState<PaymentData[]>([]);
  const navigate = useNavigate();
  const [dataDeleted, setDataDeleted] = useState(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_ROOT}/api/payment`
      );
      const recievedData = response?.data;
      setPayments(recievedData);
    };

    fetchDocuments();
  }, []);

  const handleDelete = async (id: number) => {
    await axios.delete(
      `${import.meta.env.VITE_APP_API_ROOT}/api/payment/${id}`
    );
    console.log("Deleted successfully");

    setPayments((prevPayments) =>
      prevPayments.filter((payment) => payment?.id !== id)
    );
    setDataDeleted(true);

    setTimeout(() => {
      setDataDeleted(false);
    }, 3000);
  };

   const handleButtonClick = (payment:PaymentData) => {
    if (!payment.verified) {
      navigate("/forms/payment-form", {
        state: { payment: payment },
      });
    }
  };

  return (
      <DefaultLayout>
      <Breadcrumb pageName="Payments" />

      <div className="flex justify-end py-2 ">
        <button className="bg-gray-300 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ">
          <NavLink to="/forms/payment-form"> Add New Payment</NavLink>
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
                  Admission Id
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
              {payments?.map((payment, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {payment?.id}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {payment?.userId}
                    </h5>
                  </td>
                  <td className="border-b  border-[#eee] py-5 px-4 dark:border-strokedark">
                  <button
                      onClick={() => handleButtonClick(payment)}
                      className={`text-white font-bold py-2 px-4 rounded-full ${
                        payment.verified ? "bg-green-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
                      }`}
                      disabled={payment.verified}
                    >
                      {payment.verified ? "Verified" : "Verify"}
                    </button>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex justify-center items-center space-x-3.5">
                      <MdDelete
                        className="text-2xl text-red-400 cursor-pointer"
                        onClick={() => handleDelete(payment?.id)}
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

export default Payment;
