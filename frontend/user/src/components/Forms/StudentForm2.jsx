import React, { useState } from "react";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <h3 className="text-2xl font-bold mb-6">Student Information</h3>
        <div className="mb-4">
          <label className="block mb-2">First Name</label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Middle Name</label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Last Name</label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Name (Nepali)</label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            name="nameNepali"
            value={formData.nameNepali}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Date of Birth (BS)</label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="date"
            name="dateOfBirthBS"
            value={formData.dateOfBirthBS}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Phone Number</label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">E-mail</label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Marital Status</label>
          <select
            className="p-2 border border-gray-300 rounded"
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Gender</label>
          <select
            className="p-2 border border-gray-300 rounded"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Ethnicity</label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            name="ethnicity"
            value={formData.ethnicity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Caste</label>
          <select
            className="p-2 border border-gray-300 rounded"
            name="caste"
            value={formData.caste}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            {/* Add caste options */}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Blood Group</label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Citizenship No</label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            name="citizenshipNo"
            value={formData.citizenshipNo}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Religion</label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Nationality</label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Province</label>
          <select
            className="p-2 border border-gray-300 rounded"
            name="province"
            value={formData.province}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            {/* Add province options */}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">District</label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Municipality</label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            name="municipality"
            value={formData.municipality}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Ward No</label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            name="wardNo"
            value={formData.wardNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Address (Nepali)</label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            name="addressNepali"
            value={formData.addressNepali}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Temporary Address</label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            name="temporaryAddress"
            value={formData.temporaryAddress}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">SMS No</label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            name="smsNo"
            value={formData.smsNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Dorm Facility</label>
          <select
            className="p-2 border border-gray-300 rounded"
            name="dormFacility"
            value={formData.dormFacility}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Bus Facility</label>
          <select
            className="p-2 border border-gray-300 rounded"
            name="busFacility"
            value={formData.busFacility}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <h3 className="text-2xl font-bold mb-6 mt-8">Parent Information</h3>
        <div className="mb-4">
          <label className="block mb-2">Father Name</label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Father Phone No</label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="tel"
            name="fatherPhoneNo"
            value={formData.fatherPhoneNo}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Father Qualification</label>
          <select
            className="p-2 border border-gray-300 rounded"
            name="fatherQualification"
            value={formData.fatherQualification}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            {/* Add qualification options */}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Mother Name</label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Mother Phone No</label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="tel"
            name="motherPhoneNo"
            value={formData.motherPhoneNo}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Mother Qualification</label>
          <select
            className="p-2 border border-gray-300 rounded"
            name="motherQualification"
            value={formData.motherQualification}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            {/* Add qualification options */}
          </select>
        </div>

        <button
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default StudentForm2;
