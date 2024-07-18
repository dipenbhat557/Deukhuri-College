import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { MdSkipNext } from "react-icons/md";
import Footer from "../Footer";
import HeroHeader from "../HeroHeader";
import studentFormState from "../../store";

const StudentForm1 = () => {
  const [formData, setFormData] = useRecoilState(studentFormState);
  const [error, setError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const requiredFields = [
      "program",
      "acdmc_year",
      "year_semester",
      "medium",
      "shift",
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

  const handleNext = () => {
    navigate("/form2");
  };

  return (
    <>
      <HeroHeader />
      <div className="p-8 w-full bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">
          Personal and Academic Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {error && (
            <p className="text-red-800 text-md">
              Fill all the compulsory fields first!!
            </p>
          )}
          <p className="text-red-800 text-md">
            Fields with (*) are compulsory.
          </p>
        </div>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block mb-2">
              Program<span className="text-red-500">*</span>
            </label>
            <select
              name="program"
              value={formData.program}
              onChange={handleChange}
              required
              className="select"
            >
              <option value={1}>BBS</option>
              <option value={2}>MBS</option>
              <option value={3}>BA</option>
              <option value={4}>B.Ed</option>
              <option value={5}>M.Ed</option>
            </select>
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
            <label className="block mb-2">
              Academic Year<span className="text-red-500">*</span>
            </label>
            <select
              className="select"
              name="acdmc_year"
              value={formData.academicYear}
              onChange={handleChange}
              required
            >
              <option value={1}>2080-2084</option>
              <option value={2}>2079-2083</option>
              <option value={3}>2078-2082</option>
              <option value={4}>2077-2081</option>
            </select>
            <input
              className="p-2 w-full border border-gray-300 rounded"
              type="text"
              name="acdmc_year"
              value={formData.academicYear}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              Year/Semester<span className="text-red-500">*</span>
            </label>
            <select
              className="select"
              name="year_semester"
              value={formData.yearSemester}
              onChange={handleChange}
              required
            >
              <option value="First Year">First Year</option>
              <option value="Second Year">Second Year</option>
              <option value="Third Year">Third Year</option>
              <option value="Fourth Year">Fourth Year</option>
              <option value="Complete Year">Complete Year</option>
            </select>

            <input
              className="p-2 w-full border border-gray-300 rounded"
              type="text"
              name="year_semester"
              value={formData.yearSemester}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              Medium<span className="text-red-500">*</span>
            </label>
            <select
              className="select"
              name="medium"
              value={formData.medium}
              onChange={handleChange}
              required
            >
              <option value={1}>English</option>
              <option value={2}>Nepali</option>
            </select>

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
            <label className="block mb-2">
              Section<span className="text-red-500">*</span>
            </label>
            <select
              className="select"
              name="sec"
              value={formData.section}
              onChange={handleChange}
              required
            >
              <option value={1}>No Section</option>
            </select>
            <input
              className="p-2 w-full border border-gray-300 rounded"
              type="text"
              name="sec"
              value={formData.section}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              Team <span className="text-red-500"></span>
            </label>
            <select
              className="select"
              name="team"
              value={formData.team}
              onChange={handleChange}
              required
            >
              <option value={1}>No Team</option>
            </select>
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
            <label className="block mb-2">
              Shift<span className="text-red-500">*</span>
            </label>
            <select
              className="select"
              name="shift"
              value={formData.shift}
              onChange={handleChange}
              required
            >
              <option value={1}>Morning</option>
              <option value={2}>Evening</option>
              <option value={3}>Night</option>
            </select>
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
            <label className="block mb-2">Major Subject </label>
            <select
              name="maj_subj"
              value={formData.majorSubject}
              onChange={handleChange}
            >
              <option value={1}></option>
            </select>
            <input
              className="p-2 w-full border border-gray-300 rounded"
              type="text"
              name="maj_subj"
              value={formData.majorSubject}
              onChange={handleChange}
            />
          </div>
        </form>
        <div className="flex w-full justify-end">
          <button
            className={`py-2 w-[25%] md:w-[10%] flex items-center justify-center gap-3 ${
              isFormValid
                ? "bg-blue-500 hover:bg-blue-700 cursor-pointer"
                : "bg-gray-500"
            } text-white rounded`}
            type="button"
            onClick={handleNext}
            disabled={!isFormValid}
          >
            <MdSkipNext size={20} />
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudentForm1;
