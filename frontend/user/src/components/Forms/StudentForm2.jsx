
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      program: prevFormData.program || "",
      acdmc_year: prevFormData.acdmc_year || "",
      year_semester: prevFormData.year_semester || "",
      medium: prevFormData.medium || "",
      sec: prevFormData.sec || "",
      team: prevFormData.team || "",
      shift: prevFormData.shift || "",
      maj_subj: prevFormData.maj_subj || "",
      first_name: prevFormData.first_name || "",
      middle_name: prevFormData.middle_name || "",
      last_name: prevFormData.last_name || "",
      name_nep: prevFormData.name_nep || "",
      dobn: prevFormData.dobn || "",
      phone: prevFormData.phone || "",
      email: prevFormData.email || "",
      marital_status: prevFormData.marital_status || 0,
      gender: prevFormData.gender || 0,
      sub_caste: prevFormData.sub_caste || 0,
      caste: prevFormData.caste || 1,
      bloodgroup: prevFormData.bloodgroup || "",
      citiz_no: prevFormData.citiz_no || "",
      religion: prevFormData.religion || "",
      nationality: prevFormData.nationality || "Nepalese",
      province: prevFormData.province || 1,
      district: prevFormData.district || 0,
      municipality: prevFormData.municipality || 0,
      wardno: prevFormData.wardno || 0,
      add_nep: prevFormData.add_nep || "",
      tempadd: prevFormData.tempadd || "",
      sms_mob_no: prevFormData.sms_mob_no || "",
      dorm_facility: prevFormData.dorm_facility || false,
      bus_facility: prevFormData.bus_facility || false,
      father_name: prevFormData.father_name || "",
      fath_ph: prevFormData.fath_ph || "",
      father_qualification: prevFormData.father_qualification || 0,
      mother_name: prevFormData.mother_name || "",
      moth_ph: prevFormData.moth_ph || "",
      mother_qualification: prevFormData.mother_qualification || 0,
    }));
  }, []);

  useEffect(() => {
    const casteUrl = `https://dmcapi.prefacetechnology.com.np/nexapp-college-academics/student-academics-sub-caste-list-view/?caste_id=${formData?.caste}`;
    const fetchCasteData = async () => {
      if (formData?.caste !== 0) {
        const res = await axios.get(casteUrl);
        const finalRes = await res.data.data;
        const cas = finalRes?.map((c) => c?.sub_caste_name);
        setCastes(cas);
        const casInd = finalRes?.map((c) => c?.sub_caste_id);
        setCasteIndexes(casInd);
      }
    };
    fetchCasteData();
  }, [formData?.caste]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [district, setdistrict] = useState([]);
  const [districtIndexes, setdistrictIndexes] = useState([]);

  useEffect(() => {
    const districtUrl = `https://dmcapi.prefacetechnology.com.np/nexapp-college-academics/academics-province-wise-district-list/?province_id=${formData?.province}`;
    const fetchDistrictData = async () => {
      if (formData?.province !== 0) {
        const res = await axios.get(districtUrl);
        const finalRes = await res.data;
        const dis = finalRes?.map((c) => c?.district_name);
        setdistrict(dis);
        const disInd = finalRes?.map((c) => c?.district_id);
        setdistrictIndexes(disInd);
      }
    };
    fetchDistrictData();
  }, [formData?.province]);

  const [municipality, setMunicipality] = useState([]);
  const [municipalityIndexes, setMunicipalityIndexes] = useState([]);

  useEffect(() => {
    const municipalityUrl = `https://dmcapi.prefacetechnology.com.np/nexapp-college-academics/academics-district-wise-municiplity-list/?district_id=${formData?.district}`;
    const fetchMunicipalityData = async () => {
      if (formData?.district !== 0) {
        const res = await axios.get(municipalityUrl);
        const finalRes = await res.data;
        const mun = finalRes?.map((c) => c?.mun_name);
        setMunicipality(mun);
        const munInd = finalRes?.map((c) => c?.id);
        setMunicipalityIndexes(munInd);
      }
    };
    fetchMunicipalityData();
  }, [formData?.district]);

  const [qa, setQa] = useState([]);
  const [qaIndexes, setQaIndexes] = useState([]);

  useEffect(() => {
    const qaUrl = `https://dmcapi.prefacetechnology.com.np/nexapp-college-academics/academics-student-add-required-data-list/`;
    const fetchQaData = async () => {
      const res = await axios.get(qaUrl);
      const finalRes = await res.data.program;
      const qaf = finalRes?.map((c) => c?.programname);
      setQa(qaf);
      const qafInd = finalRes?.map((c) => c?.programid);
      setQaIndexes(qafInd);
    };
    fetchQaData();
  }, []);

  useEffect(() => {
    const requiredFields = [
      "first_name",
      "last_name",
      "name_nep",
      "dobn",
      "phone",
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
    console.log(formData);
    const isValid = requiredFields.every(
      (field) => formData[field] && formData[field].toString().trim() !== ""
    );
    setIsFormValid(isValid);
    setError(!isValid);
  }, [formData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const admissionURL = "https://dmcapi.prefacetechnology.com.np/nexapp-college-academics/academics-student-add-details";

    // const res = await axios.post(admissionURL,formData);
    // const response = await res.data;
    // console.log(response)
    console.log(formData);
    navigate("/");
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
            name: "caste",
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
            name: "sub_caste",
            type: "select",
            options: castes,
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
              "Islam",
              "Others",
            ],
            values: ["", "1", "2", "3", "4", "5"],
            required: true,
          },
          {
            label: "Nationality",
            name: "nationality",
            type: "select",
            options: ["", "Nepali", "Indian", "Others"],
            values: ["", "1", "2", "3"],
            required: true,
          },
          {
            label: "Province",
            name: "province",
            type: "select",
            options: [
              "",
              "Province 1",
              "Madesh Pradesh",
              "Bagmati Pradesh",
              "Gandaki Pradesh",
              "Lumbini Pradesh",
              "Karnali Pradesh",
              "Sudurpaschim Pradesh",
            ],
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
            type: "select",
            options: municipality,
            values: municipalityIndexes,
            required: true,
          },
          {
            label: "Ward Number",
            name: "wardno",
            type: "text",
            required: true,
          },
          {
            label: "SMS Mobile Number",
            name: "sms_mob_no",
            type: "tel",
            required: true,
          },
          {
            label: "Father's Name",
            name: "father_name",
            type: "text",
            required: true,
          },
          {
            label: "Father's Qualification",
            name: "father_qualification",
            type: "select",
            options:qa,
            values:qaIndexes,
            required: true,
          },{
            label: "Father's Phone No",
            name: "fath_ph",
            type: "text",
            required: false,
          },
          {
            label: "Mother's Name",
            name: "mother_name",
            type: "text",
            required: true,
          },
          {
            label: "Mother's Qualification",
            name: "mother_qualification",
            type: "select",
            options: qa,
            values: qaIndexes,
            required: true,
          },{
            label: "Mother's Phone No",
            name: "moth_ph",
            type: "text",
            required: false,
          }
        ].map(({ label, name, type, options, values, required }) => (
          <div key={name} className="mb-4">
            <label htmlFor={name} className="block text-gray-700">
              {label}
              {required && <span className="text-red-500">*</span>}
            </label>
            {type === "select" ? (
              <select
                id={name}
                name={name}
                onChange={handleChange}
                value={formData[name] || ""}
                className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              >
                {options?.map((option, index) => (
                  <option key={index} value={values[index]}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={name}
                name={name}
                type={type}
                onChange={handleChange}
                value={formData[name] || ""}
                className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                required={required}
              />
            )}
          </div>
        ))}
        <div className="col-span-2 flex justify-between mt-6">
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center"
            onClick={() => navigate(-1)}
          >
            <MdSkipPrevious className="mr-2" />
            Back
          </button>
          <button
            type="submit"
            className={`px-4 py-2 ${
              isFormValid ? "bg-green-500" : "bg-gray-500"
            } text-white rounded-md flex items-center`}
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            <FaSave className="mr-2" />
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm2;
