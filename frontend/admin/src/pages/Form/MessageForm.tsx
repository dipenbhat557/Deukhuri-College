import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { base64ToFile } from "../store";

const MessageForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const message = location?.state?.message;
  const [formData, setFormData] = useState({
    id: message?.id || 0,
    name: message?.name || "",
    designation: message?.designation || "",
    message: message?.message || "",
  });

  const [img, setImg] = useState<File | null>(null);
  const [dataSaved, setDataSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingImageLoaded, setExistingImageLoaded] = useState(false);
  const [existingImagePreviewUrl, setExistingImagePreviewUrl] = useState<string | null>(null);
  const [existingImageLoading, setExistingImageLoading] = useState(false);
  const [newImagePreviewUrl, setNewImagePreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (message?.img) {
      const fileName = "example.jpg";
      const mimeType = "image/jpeg";
      const file = base64ToFile(message.img, fileName, mimeType);
      setImg(file);
      setNewImagePreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(file);
      });
      setExistingImageLoaded(true);
      setExistingImagePreviewUrl(null);
      return;
    }
    if (message?.id) {
      setExistingImageLoading(true);
      setExistingImageLoaded(false);
      axios
        .get(
          `${import.meta.env.VITE_APP_API_ROOT}/api/message/${message.id}/img`,
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
  }, [message?.id, message?.img]);

  useEffect(() => {
    return () => {
      if (existingImagePreviewUrl) URL.revokeObjectURL(existingImagePreviewUrl);
    };
  }, [existingImagePreviewUrl]);

  useEffect(() => {
    return () => {
      if (newImagePreviewUrl) URL.revokeObjectURL(newImagePreviewUrl);
    };
  }, [newImagePreviewUrl]);

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append(
      "message",
      JSON.stringify({
        name: formData?.name,
        designation: formData?.designation,
        message: formData?.message,
      })
    );
    if (img) {
      formDataToSend.append("file", img);
    }

    console.log(formDataToSend);

    setIsSubmitting(true);
    try {
      if (message?.id) {
        await axios.put(
          `${import.meta.env.VITE_APP_API_ROOT}/api/message/${message?.id}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_APP_API_ROOT}/api/message`,
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
        name: "",
        designation: "",
        message: "",
      });
      setImg(null);
      setDataSaved(true);
      setTimeout(() => setDataSaved(false), 3000);
      navigate("/messages");
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

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Messages" />
      <div className="flex justify-end py-2">
        <button className="bg-gray-300 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          <NavLink to="/messages">Go to Messages</NavLink>
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
                  Name
                </label>
                <input
                  value={formData.name}
                  name="name"
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      name: e.target.value,
                    }))
                  }
                  type="text"
                  placeholder="Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Designation
                </label>
                <input
                  value={formData.designation}
                  name="designation"
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      designation: e.target.value,
                    }))
                  }
                  type="text"
                  placeholder="Designation"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  name="message"
                  rows={10}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      message: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
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
                          Current image (from server). <span className="font-medium text-bodydark dark:text-bodydark">Adding new file replaces the old one.</span>
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
                        alt={existingImageLoaded && existingImagePreviewUrl ? "Current message image" : "Selected image"}
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
                {message?.id && !img && !existingImagePreviewUrl && existingImageLoading && (
                  <p className="text-xs text-bodydark dark:text-bodydark mt-1">
                    Loading current image…
                  </p>
                )}
                {message?.id && !img && !existingImagePreviewUrl && !existingImageLoading && (
                  <p className="text-xs text-bodydark dark:text-bodydark mt-1">
                    No image for this message.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-9 sm:fixed right-16">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-[160px]">
            <div className="flex flex-col gap-5.5 p-6 items-center">
              <button
                type="button"
                onClick={() => navigate("/messages")}
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

export default MessageForm;
