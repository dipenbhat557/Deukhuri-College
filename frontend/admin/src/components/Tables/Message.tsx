import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRecoilValue } from "recoil";
import { currUser } from "../../pages/store";

const Message = () => {
  const [editable, setEditable] = useState(false);
  //  const currentUser = useRecoilValue(currUser);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null as File | null);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    img: "",
  });
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const currentUser = useRecoilValue(currUser);

  useEffect(() => {
    const docRef = doc(db, "messages", "QrQ6SBmLF4SCtlmI5dnB");
    const fetcthing = async () => {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setFormData({
          name: docSnap?.data()?.name,
          message: docSnap?.data()?.message,
          facebook: docSnap?.data()?.facebook,
          instagram: docSnap?.data()?.instagram,
          linkedin: docSnap?.data()?.linkedin,
          img: docSnap?.data()?.img,
        });
      } else {
        console.log("No such document!");
      }
    };
    fetcthing();
  }, [editable]);

  const handleEditClick = () => {
    setEditable(true);
  };

  const handleSaveClick = async () => {
    console.log("form data is ", formData);
    setEditable(false);
    setLoading(true);

    if (image) {
      const storageRef = ref(storage, "some-child/" + image.name);
      try {
        await uploadBytes(storageRef, image);

        const downloadURL = await getDownloadURL(storageRef);

        console.log("Download URL:", downloadURL);

        const messageRef = doc(db, "messages", "QrQ6SBmLF4SCtlmI5dnB");
        await setDoc(messageRef, {
          name: formData?.name,
          message: formData?.message,
          facebook: formData?.facebook,
          instagram: formData?.instagram,
          linkedin: formData?.linkedin,
          img: downloadURL,
        });
        setDataSubmitted(true);

        setTimeout(() => {
          setDataSubmitted(false);
        }, 3000);
        setLoading(false);
      } catch (error: any) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.error("No file selected");
    }
    const historyRef = collection(db, "history");
    await addDoc(historyRef, {
      title: "Message updated",
      role: currentUser?.role,
      date: serverTimestamp(),
      item: "Message",
      user: currentUser?.name,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Message From MD" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <div className="flex w-full h-auto gap-4 flex-col justify-around ">
            {dataSubmitted && (
              <div className="w-full h-[60px] bg-[#06905E]  mb-2 flex items-center justify-center rounded-lg">
                Data Uploaded Successfully !!
              </div>
            )}

            <div className="w-full h-[10%] flex items-center justify-end">
              <button
                className="text-white bg-[#06905E] px-12 rounded-full py-1"
                onClick={editable ? handleSaveClick : handleEditClick}
                disabled={loading}
              >
                {editable ? (loading ? "Saving..." : "Save") : "Edit"}
              </button>
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Name
              </label>
              <input
                value={formData?.name}
                name="name"
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }))
                }
                type="text"
                placeholder="Name "
                readOnly={!editable}
                className={` ${
                  !editable
                    ? "text-slate-500  focus:outline-none"
                    : "text-slate-800 focus:border-primary"
                } w-full rounded-lg border-[1.5px]    border-stroke bg-transparent py-3 px-5 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter  dark:border-form-strokedark  dark:bg-form-input   dark:text-white`}
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Message
              </label>
              <textarea
                value={formData?.message}
                name="message"
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    message: e.target.value,
                  }))
                }
                rows={3}
                placeholder="Message content"
                readOnly={!editable}
                className={` ${
                  !editable
                    ? "text-slate-500  focus:outline-none"
                    : "text-slate-800 focus:border-primary"
                } w-full rounded-lg border-[1.5px]    border-stroke bg-transparent py-3 px-5 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter  dark:border-form-strokedark  dark:bg-form-input   dark:text-white`}
              ></textarea>
            </div>

            <div>
              <label className="mb-3 block text-black dark:text-white">
                Attach Image
              </label>

              <input
                onChange={handleFileChange}
                type="file"
                readOnly={!editable}
                className={` ${
                  !editable
                    ? "text-slate-500  focus:outline-none"
                    : "text-slate-800 focus:border-primary"
                } w-full rounded-lg border-[1.5px]    border-stroke bg-transparent py-3 px-5 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter  dark:border-form-strokedark  dark:bg-form-input   dark:text-white`}
              />
            </div>

            <div>
              <label className="mb-3 block text-black dark:text-white">
                Facebook Link
              </label>
              <input
                type="text"
                value={formData?.facebook}
                name="facebook"
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    facebook: e.target.value,
                  }))
                }
                placeholder="Facebook Link"
                readOnly={!editable}
                className={` ${
                  !editable
                    ? "text-slate-500  focus:outline-none"
                    : "text-slate-800 focus:border-primary"
                } w-full rounded-lg border-[1.5px]    border-stroke bg-transparent py-3 px-5 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter  dark:border-form-strokedark  dark:bg-form-input   dark:text-white`}
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Instagram Link
              </label>
              <input
                value={formData?.instagram}
                name="instagram"
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    instagram: e.target.value,
                  }))
                }
                type="text"
                placeholder="Instagram Link"
                readOnly={!editable}
                className={` ${
                  !editable
                    ? "text-slate-500  focus:outline-none"
                    : "text-slate-800 focus:border-primary"
                } w-full rounded-lg border-[1.5px]    border-stroke bg-transparent py-3 px-5 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter  dark:border-form-strokedark  dark:bg-form-input   dark:text-white`}
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Linkedin Link
              </label>
              <input
                type="text"
                value={formData?.linkedin}
                name="linkedin"
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    linkedin: e.target.value,
                  }))
                }
                placeholder="Linkedin Link"
                readOnly={!editable}
                className={` ${
                  !editable
                    ? "text-slate-500  focus:outline-none"
                    : "text-slate-800 focus:border-primary"
                } w-full rounded-lg border-[1.5px]    border-stroke bg-transparent py-3 px-5 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter  dark:border-form-strokedark  dark:bg-form-input   dark:text-white`}
              />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Message;
