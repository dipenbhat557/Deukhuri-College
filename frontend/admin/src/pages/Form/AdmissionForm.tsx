import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const AdmissionForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const admission = location?.state?.admission;
  const [formData, setFormData] = useState({
    id: admission?.id || 0,
    first_name: admission?.first_name || "",
    middle_name: admission?.middle_name || "",
    last_name: admission?.last_name || "",
    name_nep: admission?.name_nep || "",
    dobn: admission?.dobn || "",
    phone: admission?.phone || "",
    email: admission?.email || "",
    marital_status: admission?.marital_status || 0,
    gender: admission?.gender || 0,
    sub_caste: admission?.sub_caste || 0,
    caste: admission?.caste || 1,
    bloodgroup: admission?.bloodgroup || "",
    citiz_no: admission?.citiz_no || "",
    religion: admission?.religion || "",
    nationality: admission?.nationality || "Nepalese",
    province: admission?.province || 1,
    district: admission?.district || 0,
    municipality: admission?.municipality || 0,
    wardno: admission?.wardno || 0,
    add_nep: admission?.add_nep || "",
    tempadd: admission?.tempadd || "",
    sms_mob_no: admission?.sms_mob_no || "",
    dorm_facility: admission?.dorm_facility || false,
    bus_facility: admission?.bus_facility || false,
    father_name: admission?.father_name || "",
    fath_ph: admission?.fath_ph || "",
    father_qualification: admission?.father_qualification || 0,
    mother_name: admission?.mother_name || "",
    moth_ph: admission?.moth_ph || "",
    mother_qualification: admission?.mother_qualification || 0,
    verified: admission?.verified || false
  });

  const [dataSaved, setDataSaved] = useState(false);

  const handleSubmit = async () => {
    const admissionURL = "https://dmcapi.prefacetechnology.com.np/nexapp-college-academics/academics-student-add-details/";

    const { id, sub_caste, ...dataToSend } = formData;

    const bodyData = { ...dataToSend, sub_caste: "" };
    console.log("body data is ",bodyData)

    try {
        const res = await axios.post(admissionURL,bodyData , {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const response = await res.data;
        console.log("response is ",response)
      
      setFormData({
        id: 0,
        first_name: "",
        middle_name: "",
        last_name: "",
        name_nep: "",
        dobn: "",
        phone: "",
        email: "",
        marital_status: 0,
        gender: 0,
        sub_caste: 0,
        caste: 1,
        bloodgroup: "",
        citiz_no: "",
        religion: "",
        nationality: "Nepalese",
        province: 1,
        district: 0,
        municipality: 0,
        wardno: 0,
        add_nep: "",
        tempadd: "",
        sms_mob_no: "",
        dorm_facility: false,
        bus_facility: false,
        father_name: "",
        fath_ph: "",
        father_qualification: 0,
        mother_name: "",
        moth_ph: "",
        mother_qualification: 0,
        verified:false
      });
      setDataSaved(true);
      setTimeout(() => setDataSaved(false), 3000);
      await axios.put(`${import.meta.env.VITE_APP_API_ROOT}/api/admission/verify/${id}`)
      console.log("Verified successfully");
      navigate("/admission");
    } catch (error) {
      console.error("Error saving admission:", error);
    }

    window.scrollTo(0, 0);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Admissions" />
      <div className="flex justify-end py-2">
        <button className="bg-gray-300 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          <NavLink to="/admission">Go to Admissions</NavLink>
        </button>
      </div>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {dataSaved && (
            <div className="w-full h-[60px] bg-[#06905E] mb-2 flex items-center justify-center rounded-lg">
              Data Saved Successfully !!
            </div>
          )}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Input Fields</h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              {Object.keys(formData).map((key) => (
                <div key={key}>
                  <label className="mb-3 block text-black dark:text-white">{key.replace(/_/g, ' ').toUpperCase()}</label>
                  {typeof formData[key as keyof typeof formData] === 'boolean' ? (
                    <input
                      type="checkbox"
                      checked={formData[key as keyof typeof formData] as boolean}
                      onChange={(e) =>
                        setFormData((prevState) => ({
                          ...prevState,
                          [key]: e.target.checked,
                        }))
                      }
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  ) : (
                    <input
                      value={formData[key as keyof typeof formData] as string}
                      name={key}
                      onChange={(e) =>
                        setFormData((prevState) => ({
                          ...prevState,
                          [key]: e.target.value,
                        }))
                      }
                      type={typeof formData[key as keyof typeof formData] === 'number' ? 'number' : 'text'}
                      placeholder={key.replace(/_/g, ' ')}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-9 sm:fixed right-16">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col gap-5.5 p-40 items-center justify-evenly">
              <div>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 tracking-wide text-white font-bold py-2 px-9 rounded opacity-80 shadow-1"
                >
                  <span className="tracking-wider px-3">Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AdmissionForm;
