import { NavLink, useNavigate } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";

interface AdmissionData {
    id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    name_nep: string;
    dobn: string;
    phone: string;
    email: string;
    marital_status: number;
    gender: number;
    sub_caste: number;
    caste: number;
    bloodgroup: string;
    citiz_no: string;
    religion: string;
    nationality: string;
    province: number;
    district: number;
    municipality: number;
    wardno: number;
    add_nep: string;
    tempadd: string;
    sms_mob_no: string;
    dorm_facility: boolean;
    bus_facility: boolean;
    father_name: string;
    fath_ph: string;
    father_qualification: number;
    mother_name: string;
    moth_ph: string;
    mother_qualification: number;
    verified:boolean;
  }
  
const Admission = () => {
  const [admissions, setAdmissions] = useState<AdmissionData[]>([]);
  const navigate = useNavigate();
  const [dataDeleted, setDataDeleted] = useState(false);

  useEffect(() => {
    
    const fetchDocuments = async () => {
      const response = await axios.get(`${import.meta.env.VITE_APP_API_ROOT}/api/admission`);
      const recievedData = response?.data;
      setAdmissions(recievedData);
    };

    fetchDocuments();
  }, []);

  const handleDelete = async (id: number) => {
    await axios.delete(`${import.meta.env.VITE_APP_API_ROOT}/api/admission/${id}`)
    console.log("Deleted successfully");
    
    setAdmissions((prevAdmissions) => prevAdmissions.filter((admission) => admission?.id !== id));
    setDataDeleted(true);

    setTimeout(() => {
      setDataDeleted(false);
    }, 3000);

  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Admissions" />

      <div className="flex justify-end py-2 ">
        <button className="bg-gray-300 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ">
          <NavLink to="/forms/admission-form"> Add New Admission</NavLink>
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
                  Name
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
              {admissions?.map((admission, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {admission?.id}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {`${admission?.first_name} ${admission?.last_name}`}
                    </h5>
                  </td>
                  <td className="border-b  border-[#eee] py-5 px-4 dark:border-strokedark">
                    <button
                      onClick={() =>{
                        if(!admission?.verified){
                        navigate("/forms/admission-form", {
                          state: { admission: admission },
                        })
                      }
                      }
                      }
                      className={`${admission?.verified ? "bg-green-500 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded-full`}
                    >
                      {admission?.verified ? "Verified":"Verify"}
                    </button>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex justify-center items-center space-x-3.5">
                      <MdDelete
                        className="text-2xl text-red-400 cursor-pointer"
                        onClick={() => handleDelete(admission?.id)}
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

export default Admission;
