import React, { useState, useEffect } from "react";
import { FaSave } from "react-icons/fa"

const StudentForm2 = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    nameNepali: "",
    dateOfBirthBS: "",
    phoneNumber: "",
    email: "",
    maritalStatus: "",
    gender: "",
    ethnicity: "",
    caste: "",
    bloodGroup: "",
    citizenshipNo: "",
    religion: "",
    nationality: "Nepalese",
    province: "",
    district: "",
    municipality: "",
    wardNo: "",
    addressNepali: "",
    temporaryAddress: "",
    smsNo: "",
    dormFacility: "",
    busFacility: "",
    fatherName: "",
    fatherPhoneNo: "",
    fatherQualification: "",
    motherName: "",
    motherPhoneNo: "",
    motherQualification: "",
  });

  const [error,setError] = useState(false)

  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const requiredFields = [
      "firstName", "lastName", "nameNepali", "dateOfBirthBS", "phoneNumber",
      "email", "maritalStatus", "gender", "ethnicity", "caste", "religion",
      "province", "district", "municipality", "wardNo", "smsNo", "fatherName",
      "fatherQualification", "motherName", "motherQualification"
    ];
    const isValid = requiredFields.every((field) => formData[field].trim() !== "");
    setIsFormValid(isValid);
    setError(!isValid)
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="p-8 w-full bg-gray-100 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <h3 className="text-2xl font-bold mb-6 sm:col-span-2">Student Information</h3>
         {error && <p className="text-red-800 text-md">Fill all the compulsory fields first!!</p>}
      <p className="text-red-800 text-md">Fields with (*) are compulsory.</p>
     
        {[
          { label: "First Name", name: "firstName", type: "text", required: true },
          { label: "Middle Name", name: "middleName", type: "text" },
          { label: "Last Name", name: "lastName", type: "text", required: true },
          { label: "Name (Nepali)", name: "nameNepali", type: "text", required: true },
          { label: "Date of Birth (BS)", name: "dateOfBirthBS", type: "date", required: true },
          { label: "Phone Number", name: "phoneNumber", type: "tel", required: true },
          { label: "E-mail", name: "email", type: "email", required: true },
          { label: "Marital Status", name: "maritalStatus", type: "select", options: ["", "Single", "Married"], required: true },
          { label: "Gender", name: "gender", type: "select", options: ["", "Male", "Female", "Other"], required: true },
          { label: "Ethnicity", name: "ethnicity", type: "text", required: true },
          { label: "Caste", name: "caste", type: "select", options: [""] /* Add options here */, required: true },
          { label: "Blood Group", name: "bloodGroup", type: "text" },
          { label: "Citizenship No", name: "citizenshipNo", type: "text" },
          { label: "Religion", name: "religion", type: "text", required: true },
          { label: "Nationality", name: "nationality", type: "text", readOnly: true },
          { label: "Province", name: "province", type: "select", options: [""] /* Add options here */, required: true },
          { label: "District", name: "district", type: "text", required: true },
          { label: "Municipality", name: "municipality", type: "text", required: true },
          { label: "Ward No", name: "wardNo", type: "text", required: true },
          { label: "Address (Nepali)", name: "addressNepali", type: "text" },
          { label: "Temporary Address", name: "temporaryAddress", type: "text" },
          { label: "SMS No", name: "smsNo", type: "text", required: true },
          { label: "Dorm Facility", name: "dormFacility", type: "select", options: ["", "Yes", "No"] },
          { label: "Bus Facility", name: "busFacility", type: "select", options: ["", "Yes", "No"] },
        ].map((field, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-2">
              {field.label}{field.required && <span className="text-red-500">*</span>}
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
                  <option key={i} value={option.toLowerCase()}>{option}</option>
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

        <h3 className="text-2xl font-bold mb-6 sm:col-span-2 mt-8">Parent Information</h3>
        {[
          { label: "Father Name", name: "fatherName", type: "text", required: true },
          { label: "Father Phone No", name: "fatherPhoneNo", type: "tel" },
          { label: "Father Qualification", name: "fatherQualification", type: "select", options: [""] /* Add options here */, required: true },
          { label: "Mother Name", name: "motherName", type: "text", required: true },
          { label: "Mother Phone No", name: "motherPhoneNo", type: "tel" },
          { label: "Mother Qualification", name: "motherQualification", type: "select", options: [""] /* Add options here */, required: true },
        ].map((field, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-2">
              {field.label}{field.required && <span className="text-red-500">*</span>}
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
                  <option key={i} value={option.toLowerCase()}>{option}</option>
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
      <div className="flex w-full justify-end"><button
          className={`py-2  w-[10%] flex items-center justify-center gap-3 ${isFormValid ? "bg-blue-500 hover:bg-blue-700 cursor-pointer" : "bg-gray-500"} text-white rounded`}
          type="button"
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          <FaSave size={20}/>
          Save
        </button></div>
    </div>
  );
};

export default StudentForm2;
