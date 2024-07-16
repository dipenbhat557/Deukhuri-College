import React, { useState } from "react";
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    navigate("/detailed-form");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        Personal and Academic Information
      </h2>
      <form>
        <div className="mb-4">
          <label className="block mb-2">Program</label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            name="program"
            value={formData.program}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Academic Year</label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            name="academicYear"
            value={formData.academicYear}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Year/Semester</label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            name="yearSemester"
            value={formData.yearSemester}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Medium</label>
          <input
            className="p-2 border border-gray-300 rounded"
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
            className="p-2 border border-gray-300 rounded"
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
            className="p-2 border border-gray-300 rounded"
            type="text"
            name="team"
            value={formData.team}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Shift</label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            name="shift"
            value={formData.shift}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Major Subject</label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            name="majorSubject"
            value={formData.majorSubject}
            onChange={handleChange}
          />
        </div>
        <button
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
          type="button"
          onClick={handleNext}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default StudentForm1;
