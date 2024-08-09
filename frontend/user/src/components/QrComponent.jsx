import { useState } from "react";
import { Qr } from "../assets";
import axios from "axios";
import { useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const QrComponent = () => {
  const id = useParams();

  const [showReceiptSection, setShowReceiptSection] = useState(false);

  const [img, setImg] = useState(null);
  const handleNextClick = () => {
    setShowReceiptSection(true);
  };

  const handleReceiptUpload = (e) => {
    const file = e.target.files?.[0];
    console.log("selectef file is ", file);
    if (file) {
      setImg(file);
    }
  };

  const handleSubmit = async () => {
    if (!img) {
      alert("Please upload a receipt before submitting.");
      return;
    }
    const formDataToSend = new FormData();

    if (img) {
      formDataToSend.append("file", img);
    }

    console.log(formDataToSend);

    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_ROOT}/api/payment/${id?.id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setImg(null);
      // setDataSaved(true);
      // setTimeout(() => setDataSaved(false), 3000);
      // navigate("/advertisements");
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    window.scrollTo(0, 0);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-gray-100 rounded-lg shadow-md relative z-10">
      {showReceiptSection ? (
        <form>
          <div>
            <h2 className="text-center text-lg font-bold mb-4">
              Upload Receipt of Payment
            </h2>
            <p className="text-center text-gray-600 mb-4">
              Please upload a screenshot or photo of your payment receipt.
            </p>
            <input
              type="file"
              onChange={handleReceiptUpload}
              className="w-full py-2 px-4 bg-white rounded-lg border border-gray-300"
            />
            <button
              className="w-full py-2 px-4 bg-red-800 text-white rounded-lg hover:bg-red-500 mt-4"
              onClick={handleSubmit}
            >
              Submit Receipt
            </button>
          </div>
        </form>
      ) : (
        <div>
          <h2 className="text-center text-lg font-bold mb-4">
            Scan to Continue
          </h2>
          <div className="flex justify-center items-center my-12">
            <img src={Qr} alt="QR Code" className="w-48 h-48" />
          </div>
          <p className="text-center text-gray-600 mb-4">
            Scan the QR code to proceed to the next step. To Upload the payment
            receipt
          </p>
          <button
            className="w-full py-2 px-4 bg-red-800 text-white rounded-lg hover:bg-red-500"
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
