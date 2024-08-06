import { useState } from "react";

// eslint-disable-next-line react/prop-types
export const QrComponent = ({ qrCodeImage }) => {
  const [showReceiptSection, setShowReceiptSection] = useState(false);

  const handleNextClick = () => {
    setShowReceiptSection(true);
  };

  const handleReceiptUpload = (event) => {
    // Handle receipt upload logic here
    console.log("Receipt uploaded:", event.target.files[0]);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-gray-100 rounded-lg shadow-md relative z-10">
      {showReceiptSection ? (
        <div>
          <h2 className="text-center text-lg font-bold mb-4">
            Upload Receipt of Payment
          </h2>
          <p className="text-center text-gray-600 mb-4">
            Please upload a screenshot or photo of your payment receipt.
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleReceiptUpload}
            className="w-full py-2 px-4 bg-white rounded-lg border border-gray-300"
          />
          <button
            className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700 mt-4"
            onClick={() => console.log("Submit receipt button clicked!")}
          >
            Submit Receipt
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-center text-lg font-bold mb-4">
            Scan to Continue
          </h2>
          <div className="flex justify-center items-center my-12">
            <img src={qrCodeImage} alt="QR Code" className="w-48 h-48" />
          </div>
          <p className="text-center text-gray-600 mb-4">
            Scan the QR code to proceed to the next step.
          </p>
          <button
            className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700"
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
