import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentForm1 = () => {
  const [formData, setFormData] = useState({
    program: "",
    academicYear: "",
    yearSemester: "",
    medium: "",
    section: "",
    team: "",
    shift: "",
    majorSubject: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const requiredFields = ["program", "academicYear", "yearSemester", "medium", "majorSubject", "shift"];
    const isValid = requiredFields.every((field) => formData[field].trim() !== "");
    setIsFormValid(isValid);
  }, [formData]);

  const handleNext = () => {
    navigate("/form2");
  };

  return (
    <div className="p-8 w-full bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Personal and Academic Information</h2>
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block mb-2">Program<span className="text-red-500">*</span></label>
          <input
            className="p-2 w-full border border-gray-300 rounded"
            type="text"
            name="program"
            value={formData.program}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Academic Year<span className="text-red-500">*</span></label>
          <input
            className="p-2 w-full border border-gray-300 rounded"
            type="text"
            name="academicYear"
            value={formData.academicYear}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Year/Semester<span className="text-red-500">*</span></label>
          <input
            className="p-2 w-full border border-gray-300 rounded"
            type="text"
            name="yearSemester"
            value={formData.yearSemester}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Medium<span className="text-red-500">*</span></label>
          <input
            className="p-2 w-full border border-gray-300 rounded"
            type="text"
            name="medium"
            value={formData.medium}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Section</label>
          <input
            className="p-2 w-full border border-gray-300 rounded"
            type="text"
            name="section"
            value={formData.section}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Team</label>
          <input
            className="p-2 w-full border border-gray-300 rounded"
            type="text"
            name="team"
            value={formData.team}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Shift<span className="text-red-500">*</span></label>
          <input
            className="p-2 w-full border border-gray-300 rounded"
            type="text"
            name="shift"
            value={formData.shift}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Major Subject <span className="text-red-500">*</span></label>
          <input
            className="p-2 w-full border border-gray-300 rounded"
            type="text"
            name="majorSubject"
            value={formData.majorSubject}
            onChange={handleChange}
          />
        </div>
        
      </form>
      <div className="flex w-full justify-end"><button
          className={`py-2 w-[10%] ${isFormValid ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-500"} text-white rounded`}
          type="button"
          onClick={handleNext}
          disabled={!isFormValid}
        >
          Next
        </button></div>
    </div>
  );
};

export default StudentForm1;
