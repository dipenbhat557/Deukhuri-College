import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { base64ToFile } from "../store";

const PublicationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const publication = location?.state?.publication;
  const [formData, setFormData] = useState({
    id: publication?.id || 0,
    title: publication?.title || "",
  });

  const [img, setImg] = useState<File | null>(null);
  const [dataSaved, setDataSaved] = useState(false);

  useEffect(() => {
    if (publication?.file) {
      const fileName = "example.pdf";
      const mimeType = "application/pdf";

      const file = base64ToFile(publication?.file, fileName, mimeType);

      setImg(file);
    }
  }, [publication]); // Ensure useEffect runs whenever publication changes

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append(
      "title",
        formData?.title,
    );
    if (img) {
      formDataToSend.append("file", img);
    }

    console.log(formDataToSend);

    try {
      if (publication?.id) {
        await axios.put(
          `${
            import.meta.env.VITE_APP_API_ROOT
          }/api/publication/${publication?.id}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        console.log("formdata is" , formData )
        await axios.post(
          `${import.meta.env.VITE_APP_API_ROOT}/api/publication`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      setFormData({
        id: 0,
        title: "",
      });
      setImg(null);
      setDataSaved(true);
      setTimeout(() => setDataSaved(false), 3000);
      navigate("/publications");
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    window.scrollTo(0, 0);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("selectef file is ", file);
    if (file) {
      setImg(file);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Publications" />
      <div className="flex justify-end py-2">
        <button className="bg-gray-300 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          <NavLink to="/publications">Go to Publications</NavLink>
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
              <h3 className="font-medium text-black dark:text-white">
                Input Fields
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Title
                </label>
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
                <label className="mb-3 block text-black dark:text-white">
                  Attach File
                </label>
                {img && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(img)}
                      alt="Selected File"
                      className="max-w-full h-auto"
                    />
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
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col gap-5.5 p-40 items-center justify-evenly">
              <div>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 tracking-wide text-white font-bold py-2 px-9 rounded opacity-80 shadow-1"
                >
                  <span className="tracking-wider px-3">Post</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PublicationForm;
