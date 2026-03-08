import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { base64ToFile } from "../store";

const BlogForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location?.state?.blog;
  const [formData, setFormData] = useState({
    id: blog?.id || 0,
    title: blog?.title || "",
    description: blog?.description || "",
  });

  const [img, setImg] = useState<File | null>(null);
  const [dataSaved, setDataSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


useEffect(() => {
  if (blog?.img) {
    const fileName = "example.jpg";
    const mimeType = "image/jpeg"; 

    const file = base64ToFile(blog?.img, fileName, mimeType);

    setImg(file);
  }
}, [blog]); // Ensure useEffect runs whenever blog changes


  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("blog", JSON.stringify({title:formData?.title,description:formData?.description}));
    if (img) {
      formDataToSend.append("file", img);
    }

    console.log(formDataToSend)

    setIsSubmitting(true);
    try {
      if (blog?.id) {
        await axios.put(`${import.meta.env.VITE_APP_API_ROOT}/api/blog/${blog.id}`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post(`${import.meta.env.VITE_APP_API_ROOT}/api/blog`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      setFormData({
        id: 0,
        title: "",
        description: "",
      });
      setImg(null);
      setDataSaved(true);
      setTimeout(() => setDataSaved(false), 3000);
      navigate("/blogs");
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsSubmitting(false);
    }

    window.scrollTo(0, 0);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("selectef file is ",file)
    if (file) {
      setImg(file);
    }
  };



  return (
    <DefaultLayout>
      <Breadcrumb pageName="Blogs" />
      <div className="flex justify-end py-2">
        <button className="bg-gray-300 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          <NavLink to="/blogs">Go to Blogs</NavLink>
        </button>
      </div>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {dataSaved && (
            <div className="w-full h-[60px] bg-[#06905E] mb-2 flex items-center justify-center rounded-lg">
              Data Uploaded Successfully !!
            </div>
          )}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Input Fields</h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">Title</label>
                <input
                  value={formData.title}
                  name="title"
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      title: e.target.value,
                    }))
                  }
                  type="text"
                  placeholder="Title Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">Description</label>
                <textarea
                  value={formData.description}
                  name="description"
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      description: e.target.value,
                    }))
                  }
                  rows={10}
                  placeholder="Description"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">Attach Image</label>
                 {img && (
                    <div className="mt-2">
                      <img src={URL.createObjectURL(img)} alt="Selected Image" className="max-w-full h-auto" />
                    </div>
                  )}
                <input
                  onChange={handleFileChange}
                  type="file"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-9 sm:fixed right-16">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-[160px]">
            <div className="flex flex-col gap-5.5 p-6 items-center">
              <button
                type="button"
                onClick={() => navigate("/blogs")}
                className="w-full rounded border border-stroke bg-gray-100 py-2 px-4 text-center text-black font-medium hover:bg-gray-200 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:bg-meta-3 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-1 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-blue-500 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Posting...</span>
                  </>
                ) : (
                  <span>Post</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default BlogForm;
