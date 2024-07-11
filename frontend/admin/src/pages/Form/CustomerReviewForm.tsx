import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currUser } from "../store";
// interface FormData {
//   title: string;
//   name: string;
//   reviewTitle: string;
//   content: string;
//   designation: string;
//   img: File | null;
// }
const CustomerReviewForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const review = location?.state?.review;

  const [formData, setFormData] = useState({
    title: review?.title || "",
    name: review?.name || "",
    reviewTitle: review?.reviewTitle || "",
    content: review?.content || "",
    designation: review?.designation || "",
    img: review?.img || "",
  });
  const [img, setImg] = useState(null as File | null);
  const [dataSaved, setDataSaved] = useState(false);
  const currentUser = useRecoilValue(currUser);

  const handleSubmit = async () => {
    console.log("Submission started");
    if (img) {
      const storageRef = ref(storage, "some-child/" + img.name);
      try {
        await uploadBytes(storageRef, img);
        const downloadURL = await getDownloadURL(storageRef);

        console.log("Download URL:", downloadURL);

        if (review?.id) {
          const reviewRef = doc(db, "reviews", review?.id);
          await setDoc(reviewRef, {
            title: formData?.title,
            name: formData?.name,
            img: downloadURL,
            date: serverTimestamp(),
            reviewTitle: formData?.reviewTitle,
            content: formData?.content,
            designation: formData?.designation,
          });
          navigate("/reviews");
        } else {
          const reviewRef = collection(db, "reviews");
          await addDoc(reviewRef, {
            title: formData?.title,
            name: formData?.name,
            date: serverTimestamp(),
            reviewTitle: formData?.reviewTitle,
            content: formData?.content,
            designation: formData?.designation,
            img: downloadURL,
          });
          setFormData({
            title: "",
            name: "",
            reviewTitle: "",
            content: "",
            designation: "",
            img: "",
          });
        }
        setDataSaved(true);

        setTimeout(() => setDataSaved(false), 3000);

        const historyRef = collection(db, "history");
        await addDoc(historyRef, {
          title: formData?.title,
          role: currentUser?.role,
          date: serverTimestamp(),
          item: "Review",
          user: currentUser?.name,
        });
        window.scrollTo(0, 0);
      } catch (error: any) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.error("No file selected");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("came here");
    const file = e.target.files?.[0];
    if (file) {
      setImg(file);
    }
    console.log("file is selected");
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Customers Reviews " />
      <div className="flex justify-end py-2 ">
        <button className="bg-gray-300 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ">
          <NavLink to="/reviews"> Go to Reviews</NavLink>
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
                  Name of Reviewer
                </label>
                <input
                  type="text"
                  value={formData?.name}
                  name="name"
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Your name "
                  className="w-full rounded-lg border-[1.5px]    border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary disabled:cursor-default disabled:bg-whiter  dark:border-form-strokedark  dark:bg-form-input  dark:focus:border-primary dark:text-white"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Designation
                </label>
                <input
                  type="text"
                  value={formData?.designation}
                  name="designation"
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      designation: e.target.value,
                    }))
                  }
                  placeholder="Who you are "
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Choose your profile
                </label>

                <input
                  onChange={handleFileChange}
                  type="file"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Title for Review
                </label>
                <input
                  type="text"
                  value={formData?.reviewTitle}
                  name="reviewTitle"
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      reviewTitle: e.target.value,
                    }))
                  }
                  placeholder="Review Title"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Review Content
                </label>
                <textarea
                  value={formData?.content}
                  name="content"
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      content: e.target.value,
                    }))
                  }
                  rows={3}
                  placeholder="Review content"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9 sm:fixed right-15">
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

export default CustomerReviewForm;
