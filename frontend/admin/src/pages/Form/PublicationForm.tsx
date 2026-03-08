import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PublicationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const publication = location?.state?.publication;
  const [formData, setFormData] = useState({
    id: publication?.id || 0,
    title: publication?.title || "",
    type: publication?.type ?? "",
  });

  const [img, setImg] = useState<File | null>(null);
  const [dataSaved, setDataSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingFileLoaded, setExistingFileLoaded] = useState(false);

  useEffect(() => {
    const fetchFile = async () => {
      if (publication?.id) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_API_ROOT}/api/publication/${publication.id}/file`,
            { responseType: 'arraybuffer' }
          );
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const file = new File([blob], 'publication.pdf', { type: 'application/pdf' });
          setImg(file);
          setExistingFileLoaded(true);
        } catch (error) {
          console.log('No existing file or error fetching file');
          setExistingFileLoaded(false);
        }
      } else {
        setExistingFileLoaded(false);
      }
    };

    fetchFile();
  }, [publication]); // Ensure useEffect runs whenever publication changes

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData?.title ?? "");
    const typeValue = (formData?.type ?? "").trim();
    if (typeValue) {
      formDataToSend.append("type", typeValue);
    }
    if (img) {
      formDataToSend.append("file", img);
    }

    console.log(formDataToSend);

    setIsSubmitting(true);
    try {
      if (publication?.id) {
        await axios.put(
          `${import.meta.env.VITE_APP_API_ROOT
          }/api/publication/${publication?.id}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        console.log("formdata is", formData)
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
        type: "",
      });
      setImg(null);
      setDataSaved(true);
      setTimeout(() => setDataSaved(false), 3000);
      navigate("/publications");
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsSubmitting(false);
    }

    window.scrollTo(0, 0);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("selectef file is ", file);
    if (file) {
      setImg(file);
      setExistingFileLoaded(false);
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
                  Type
                </label>
                <input
                  value={formData.type}
                  name="type"
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      type: e.target.value,
                    }))
                  }
                  type="text"
                  placeholder="e.g. Syllabus, Results, Brochure"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <p className="text-xs text-bodydark dark:text-bodydark mt-1">
                  Used to group publications in tabs on the user site. Leave empty for &quot;Other&quot;.
                </p>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Attach File (PDF)
                </label>
                {img && (
                  <div className="mt-2 mb-3 p-3 rounded-lg border border-stroke bg-meta-2 dark:bg-boxdark dark:border-strokedark">
                    {existingFileLoaded ? (
                      <>
                        <p className="text-sm font-medium text-black dark:text-white">
                          Current file: <span className="text-primary font-semibold">{img.name}</span> (loaded from server)
                        </p>
                        <p className="text-xs text-bodydark dark:text-bodydark mt-1">
                          Choose a new file below to replace this PDF.
                        </p>
                      </>
                    ) : (
                      <p className="text-sm font-medium text-black dark:text-white">
                        New file selected: <span className="text-primary font-semibold">{img.name}</span>
                      </p>
                    )}
                  </div>
                )}
                <input
                  onChange={handleFileChange}
                  type="file"
                  accept="application/pdf,.pdf"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
                {publication?.id && !img && (
                  <p className="text-xs text-bodydark dark:text-bodydark mt-1">
                    Loading current file…
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-9 sm:fixed right-16 w-[160px]">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col gap-3 p-6 items-center justify-center">
              <button
                type="button"
                onClick={() => navigate("/publications")}
                disabled={isSubmitting}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded shadow-1 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600 hover:opacity-100 opacity-90 tracking-wide text-white font-bold py-2 px-4 rounded shadow-1 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-blue-500 flex items-center justify-center gap-2 text-sm"
              >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span className="tracking-wider">Posting...</span>
                    </>
                  ) : (
                <span className="tracking-wider">Post</span>
                  )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PublicationForm;
