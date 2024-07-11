import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { NavLink, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currUser } from "../store";

const GalleryForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    id: "",
  });
  const [dataSaved, setDataSaved] = useState(false);
  const currentUser = useRecoilValue(currUser);

  const handleSubmit = async () => {
    const imageRef = collection(db, "imageFolders");

    const docRef = await addDoc(imageRef, {
      title: formData?.title,
      category: formData?.category,
      date: serverTimestamp(),
    });
    console.log(docRef.id);
    setFormData({
      title: "",
      category: "",
      date: "",
      id: "",
    });

    setDataSaved(true);

    setTimeout(() => setDataSaved(false), 3000);

    const historyRef = collection(db, "history");
    await addDoc(historyRef, {
      title: formData?.title,
      role: currentUser?.role,
      date: serverTimestamp(),
      item: "Image Folder",
      user: currentUser?.name,
    });
    navigate("/gallery");
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gallery Form" />
      <div className="flex justify-end py-2 ">
        <button className="bg-gray-300 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ">
          <NavLink to="/gallery"> Go to Gallery</NavLink>
        </button>
      </div>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {dataSaved && (
            <div className="w-full h-[60px] bg-[#06905E]  mb-2 flex items-center justify-center rounded-lg">
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
                  value={formData?.title}
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
                  Category
                </label>
                <input
                  value={formData?.category}
                  name="category"
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      category: e.target.value,
                    }))
                  }
                  type="text"
                  placeholder="Category "
                  className="w-full rounded-lg border-[1.5px]    border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary disabled:cursor-default disabled:bg-whiter  dark:border-form-strokedark  dark:bg-form-input  dark:focus:border-primary dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col gap-5.5 p-40  items-center justify-evenly">
              <div>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 tracking-wide text-white font-bold py-2 px-9 rounded opacity-80  shadow-1"
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

export default GalleryForm;
