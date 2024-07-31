import React, { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdSkipPrevious } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import studentFormState from "../../store";
import axios from "axios";

const StudentForm2 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useRecoilState(studentFormState);
  const [error, setError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [castes, setCastes] = useState([]);
  const [casteIndexes, setCasteIndexes] = useState([]);

  useEffect(() => {
    const casteUrl = `https://dmcapi.prefacetechnology.com.np/nexapp-college-academics/student-academics-sub-caste-list-view/?caste_id=${formData?.ethnicity}`;
    const something = async () => {
      if (formData?.ethnicity !== 0) {
        const res = await axios.get(casteUrl);
        const finalRes = await res.data.data;
        // console.log(finalRes);
        const cas = finalRes?.map((c) => c?.sub_caste_name);
        setCastes(cas);
        const casInd = finalRes?.map((c) => c?.sub_caste_id);
        setCasteIndexes(casInd);

        // console.log("castes are ", castes);
        // console.log("caste indexes are ", casteIndexes);
      }
    };
    something();
  }, [formData?.ethnicity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  //https://dmcapi.prefacetechnology.com.np/nexapp-college-academics/academics-province-wise-district-list/?province_id=1
  const [district, setdistrict] = useState([]);
  const [districtIndexes, setdistrictIndexes] = useState([]);

  useEffect(() => {
    const districtUrl = `https://dmcapi.prefacetechnology.com.np/nexapp-college-academics/academics-province-wise-district-list/?province_id=${formData?.province}`;
    const something = async () => {
      if (formData?.province !== 0) {
        const res = await axios.get(districtUrl);
        const finalRes = await res.data;
        console.log(finalRes);
        const dis = finalRes?.map((c) => c?.district_name);
        setdistrict(dis);
        const disInd = finalRes?.map((c) => c?.district_id);
        setdistrictIndexes(disInd);

        // console.log("castes are ", castes);
        // console.log("caste indexes are ", casteIndexes);
      }
    };
    something();
  }, [formData?.province]);

  const [municipality, setMunicipality] = useState([]);
  const [municipalityIndexes, setMunicipalityIndexes] = useState([]);

  useEffect(() => {
    const municipalityUrl = `https://dmcapi.prefacetechnology.com.np/nexapp-college-academics/academics-district-wise-municiplity-list/?district_id=${formData?.district}`;
    const something = async () => {
      if (formData?.district !== 0) {
        const res = await axios.get(municipalityUrl);
        const finalRes = await res.data;
        console.log(finalRes);
        const mun = finalRes?.map((c) => c?.mun_name);
        setMunicipality(mun);
        const munInd = finalRes?.map((c) => c?.id);
        setMunicipalityIndexes(munInd);

        // console.log("castes are ", castes);
        // console.log("caste indexes are ", casteIndexes);
      }
    };
    something();
  }, [formData?.district]);

  const [qa, setQa] = useState([]);
  const [qaIndexes, setQaIndexes] = useState([]);

  useEffect(() => {
    const qaUrl = `https://dmcapi.prefacetechnology.com.np/nexapp-college-academics/academics-student-add-required-data-list/`;
    const something = async () => {
      const res = await axios.get(qaUrl);
      const finalRes = await res.data.program;
      // console.log(finalRes);
      const qaf = finalRes?.map((c) => c?.programname);
      setQa(qaf);
      const qafInd = finalRes?.map((c) => c?.programid);
      setQaIndexes(qafInd);

      // console.log("castes are ", castes);
      // console.log("caste indexes are ", casteIndexes);
    };
    something();
  }, []);

  useEffect(() => {
    const requiredFields = [
      "first_name",
      "last_name",
      "name_nep",
      "dobn",
      "phone",
      ,
      "marital_status",
      "gender",
      "sub_caste",
      "caste",
      "religion",
      "nationality",

      "province",
      "district",
      "municipality",
      "wardno",
      "sms_mob_no",
      "father_name",
      "father_qualification",
      "mother_name",
      "mother_qualification",
    ];
    const isValid = requiredFields.every(
      (field) => formData[field].trim() !== ""
    );
    setIsFormValid(isValid);
    setError(!isValid);
  }, [formData]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const admissionURL = "https://dmcapi.prefacetechnology.com.np/nexapp-college-academics/academics-student-add-details";

    const res = await axios.post(admissionURL,formData);
    const response = await res.data;
    console.log(response)

    console.log(formData);
  };

  return (
    <div className="p-8 w-full bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-6 sm:col-span-2">
        Student Information
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {error && (
          <p className="text-red-800 text-md">
            Fill all the compulsory fields first!!
          </p>
        )}
        <p className="text-red-800 text-md">Fields with (*) are compulsory.</p>
      </div>

      <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            label: "First Name",
            name: "first_name",
            type: "text",
            required: true,
          },
          { label: "Middle Name", name: "middle_name", type: "text" },
          {
            label: "Last Name",
            name: "last_name",
            type: "text",
            required: true,
          },
          {
            label: "Name (Nepali)",
            name: "name_nep",
            type: "text",
            required: true,
          },
          {
            label: "Date of Birth (BS)",
            name: "dobn",
            type: "date",
            required: true,
          },
          {
            label: "Phone Number",
            name: "phone",
            type: "tel",
            required: true,
          },
          { label: "E-mail", name: "email", type: "email" },
          {
            label: "Marital Status",
            name: "marital_status",
            type: "select",
            options: ["", "Single", "Married"],
            values: ["", "1", "2"],
            required: true,
          },
          {
            label: "Gender",
            name: "gender",
            type: "select",
            options: ["", "Male", "Female", "Other"],
            values: ["", "2", "1", "0"],
            required: true,
          },
          {
            label: "Ethnicity",
            name: "ethnicity",
            options: [
              "1.EDJ ",
              "2.Dalits",
              "3.Madhesi",
              "4.Others",
              "5.Janajati",
            ],
            values: ["1", "2", "3", "4", "5"],
            type: "select",
            required: true,
          },
          {
            label: "Caste",
            name: "caste",
            type: "select",
            options: castes /* Add options here */,
            values: casteIndexes,
            required: true,
          },
          { label: "Blood Group", name: "bloodgroup", type: "text" },
          { label: "Citizenship No", name: "citiz_no", type: "text" },
          {
            label: "Religion",
            name: "religion",
            type: "select",
            options: [
              " ",
              "Hinduism",
              "Buddhism",
              "Christanity",
              "Jainism",
              "Judaism",
              "Sikhism",
            ],
            values: [
              "hinduism",
              "buddhism",
              "christanity",
              "jainism",
              "judaism",
              "sikhism",
            ],
            required: true,
          },
          {
            label: "Nationality",
            name: "nationality",
            type: "text",
            readOnly: true,
            required: true,
          },
          {
            label: "Province",
            name: "province",
            type: "select",
            options: [
              "",
              "Province No. 1",
              "Province No. 2",
              "Bagmati Province",
              "Gandaki Province",
              "Lumbini Province",
              "Karnali Province",
              "Sudurpashchim Province",
            ] /* Add options here */,
            values: ["", "1", "2", "3", "4", "5", "6", "7"],
            required: true,
          },
          {
            label: "District",
            name: "district",
            type: "select",
            options: district,
            values: districtIndexes,
            required: true,
          },
          {
            label: "Municipality",
            name: "municipality",
            options: municipality,
            values: municipalityIndexes,
            type: "select",
            required: true,
          },
          { label: "Ward No", name: "wardno", type: "text", required: true },
          { label: "Address (Nepali)", name: "add_nep", type: "text" },
          {
            label: "Temporary Address",
            name: "tempadd",
            type: "text",
          },
          { label: "SMS No", name: "sms_mob_no", type: "text", required: true },
          {
            label: "Dorm Facility",
            name: "dorm_facility",
            type: "select",
            options: ["", "Yes", "No"],
            values: ["", "false", "true"],
          },
          {
            label: "Bus Facility",
            name: "bus_facility",
            type: "select",
            options: ["", "Yes", "No"],
            values: ["", "false", "true"],
          },
        ].map((field, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-2">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === "select" ? (
              <select
                className="p-2 w-full border border-gray-300 rounded"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
              >
                {field.options.map((option, i) => (
                  <option key={i} value={field?.values?.[i]}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className="p-2 w-full border border-gray-300 rounded"
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
                readOnly={field.readOnly}
              />
            )}
          </div>
        ))}

        <h3 className="text-2xl font-bold mb-6 sm:col-span-2 mt-8">
          Parent Information
        </h3>
        {[
          {
            label: "Father Name",
            name: "father_name",
            type: "text",
            required: true,
          },
          { label: "Father Phone No", name: "fath_ph", type: "tel" },
          {
            label: "Father Qualification",
            name: "father_qualification ",
            type: "select",
            options:[ "",...qa],
            values: qaIndexes,
            required: true,
          },
          {
            label: "Mother Name",
            name: "mother_name",
            type: "text",
            required: true,
          },
          { label: "Mother Phone No", name: "moth_ph", type: "tel" },
          {
            label: "Mother Qualification",
            name: "mother_qualification",
            type: "select",
            options:["" ,...qa],
            values: qaIndexes,
            required: true,
          },
        ].map((field, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-2">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === "select" ? (
              <select
                className="p-2 w-full border border-gray-300 rounded"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
              >
                {field.options.map((option, i) => (
                  <option key={i} value={option.toLowerCase()}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className="p-2 w-full border border-gray-300 rounded"
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
              />
            )}
          </div>
        ))}
      </form>
      <div className="flex w-full justify-between">
        <button
          className={`py-2 w-[25%] md:w-[10%] flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-700 cursor-pointer text-white rounded`}
          type="button"
          onClick={() => navigate("/form1")}
        >
          <MdSkipPrevious size={20} />
          Prev
        </button>
        <button
          className={`py-2 w-[25%] md:w-[10%] flex items-center justify-center gap-3 ${
            isFormValid
              ? "bg-blue-500 hover:bg-blue-700 cursor-pointer"
              : "bg-gray-500"
          } text-white rounded`}
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          <FaSave size={20} />
          Save
        </button>
      </div>
    </div>
  );
};

export default StudentForm2;
