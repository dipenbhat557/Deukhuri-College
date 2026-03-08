import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { base64ToFile } from "../store";

const NoticeForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const notice = location?.state?.notice;
  const [formData, setFormData] = useState({
    id: notice?.id || 0,
    title: notice?.title || "",
    header: notice?.header || false,
  });

  const [img, setImg] = useState<File | null>(null);
  const [dataSaved, setDataSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingImageLoaded, setExistingImageLoaded] = useState(false);
  const [existingImagePreviewUrl, setExistingImagePreviewUrl] = useState<string | null>(null);
  const [existingImageLoading, setExistingImageLoading] = useState(false);
  const [newImagePreviewUrl, setNewImagePreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (notice?.img) {
      const fileName = "example.jpg";
      const mimeType = "image/jpeg";
      const file = base64ToFile(notice.img, fileName, mimeType);
      setImg(file);
      setNewImagePreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(file);
      });
      setExistingImageLoaded(true);
      setExistingImagePreviewUrl(null);
      return;
    }
    if (notice?.id) {
      setExistingImageLoading(true);
      setExistingImageLoaded(false);
      axios
        .get(
          `${import.meta.env.VITE_APP_API_ROOT}/api/notice/${notice.id}/img`,
          { responseType: "arraybuffer" }
        )
        .then((response) => {
          if (response.data && (response.data as ArrayBuffer).byteLength > 0) {
            const blob = new Blob([response.data], { type: "image/jpeg" });
            const url = URL.createObjectURL(blob);
            setExistingImagePreviewUrl(url);
            setExistingImageLoaded(true);
          } else {
            setExistingImageLoaded(false);
            setExistingImagePreviewUrl(null);
          }
        })
        .catch(() => {
          setExistingImageLoaded(false);
          setExistingImagePreviewUrl(null);
        })
        .finally(() => setExistingImageLoading(false));
      return () => {};
    }
    setExistingImageLoaded(false);
    setExistingImagePreviewUrl(null);
    setExistingImageLoading(false);
  }, [notice?.id, notice?.img]);

  useEffect(() => {
    return () => {
      if (existingImagePreviewUrl) URL.revokeObjectURL(existingImagePreviewUrl);
    };
  }, [existingImagePreviewUrl]);

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append(
      "notice",
      JSON.stringify({ title: formData?.title, header: formData?.header })
    );
    if (img) {
      formDataToSend.append("file", img);
    }

    console.log(formDataToSend);

    setIsSubmitting(true);
    try {
      if (notice?.id) {
        await axios.put(
          `${import.meta.env.VITE_APP_API_ROOT}/api/notice/${notice?.id}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_APP_API_ROOT}/api/notice`,
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
        header: false,
      });
      setImg(null);
      setDataSaved(true);
      setTimeout(() => setDataSaved(false), 3000);
      navigate("/notices");
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsSubmitting(false);
    }

    window.scrollTo(0, 0);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (existingImagePreviewUrl) {
        URL.revokeObjectURL(existingImagePreviewUrl);
        setExistingImagePreviewUrl(null);
      }
      if (newImagePreviewUrl) URL.revokeObjectURL(newImagePreviewUrl);
      setNewImagePreviewUrl(URL.createObjectURL(file));
      setImg(file);
      setExistingImageLoaded(false);
    }
  };

  useEffect(() => {
    return () => {
      if (newImagePreviewUrl) URL.revokeObjectURL(newImagePreviewUrl);
    };
  }, [newImagePreviewUrl]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Notices" />
      <div className="flex justify-end py-2">
        <button className="bg-gray-300 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          <NavLink to="/notices">Go to Notices</NavLink>
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
                  Is Header Notice?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="header"
                      value="true"
                      checked={formData.header === true}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          header: true,
                        }))
                      }
                      className="form-radio"
                    />
                    <span className="ml-2 text-black dark:text-white">
                      True
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="header"
                      value="false"
                      checked={formData.header === false}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          header: false,
                        }))
                      }
                      className="form-radio"
                    />
                    <span className="ml-2 text-black dark:text-white">
                      False
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Attach Image
                </label>
                {(existingImagePreviewUrl || img) && (
                  <>
                    <div className="mt-2 mb-2 p-3 rounded-lg border border-stroke bg-meta-2 dark:bg-boxdark dark:border-strokedark">
                      {existingImageLoaded && (existingImagePreviewUrl || img) ? (
                        <p className="text-sm text-black dark:text-white">
                          Current image (from server). <span className="font-medium text-bodydark dark:text-bodydark">Uploading a new one replaces the old one.</span>
                        </p>
                      ) : img ? (
                        <p className="text-sm text-bodydark dark:text-bodydark">
                          New image selected: <span className="font-semibold text-black dark:text-white">{img.name}</span>
                        </p>
                      ) : null}
                    </div>
                    <div className="mt-2">
                      <img
                        src={existingImagePreviewUrl || newImagePreviewUrl || ""}
                        alt={existingImageLoaded && existingImagePreviewUrl ? "Current notice image" : "Selected image"}
                        className="max-w-full h-auto max-h-48 object-contain rounded border border-stroke"
                      />
                    </div>
                  </>
                )}
                <input
                  onChange={handleFileChange}
                  type="file"
                  accept="image/*"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white mt-2"
                />
                {notice?.id && !img && !existingImagePreviewUrl && existingImageLoading && (
                  <p className="text-xs text-bodydark dark:text-bodydark mt-1">
                    Loading current image…
                  </p>
                )}
                {notice?.id && !img && !existingImagePreviewUrl && !existingImageLoading && (
                  <p className="text-xs text-bodydark dark:text-bodydark mt-1">
                    No image for this notice.
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
                onClick={() => navigate("/notices")}
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

export default NoticeForm;
