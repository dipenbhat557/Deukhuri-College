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
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currUser } from "../store";

interface UserData {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  img: File | null;
  id: string;
}
const UserForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location?.state?.user;
  const [dataSaved, setDataSaved] = useState(false);
  const currentUser = useRecoilValue(currUser);

  const [formData, setFormData] = useState<UserData>({
    name: user?.name || "",
    email: user?.email || "",
    password: user?.password || "",
    phone: user?.phone || "",
    role: user?.role || "",
    img: user?.img || (null as File | null),
    id: user?.id || "",
  });

  const [img, setImg] = useState(null as File | null);

  const handleSubmit = async () => {
    console.log("Submission started");
    if (img) {
      const storageRef = ref(storage, "some-child/" + img.name);
      try {
        await uploadBytes(storageRef, img);

        const downloadURL = await getDownloadURL(storageRef);

        if (user?.id) {
          const userRef = doc(db, "users", user?.id);
          await setDoc(userRef, {
            img: downloadURL,
            date: serverTimestamp(),
            name: formData?.name,
            email: formData?.email,
            password: formData?.password,
            phone: formData?.phone,
            role: formData?.role,
          });
          console.log("updated successfully");
          navigate("/users");
        } else {
          const userRef = collection(db, "users");

          const docRef = await addDoc(userRef, {
            img: downloadURL,
            date: serverTimestamp(),
            name: formData?.name,
            email: formData?.email,
            password: formData?.password,
            phone: formData?.phone,
            role: formData?.role,
          });
          console.log(docRef.id);
          setFormData({
            name: "",
            email: "",
            password: "",
            phone: "",
            role: "",
            img: null as File | null,
            id: "",
          });
        }
        setDataSaved(true);

        setTimeout(() => setDataSaved(false), 3000);
      } catch (error: any) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.error("No file selected");
    }
    const historyRef = collection(db, "history");
    await addDoc(historyRef, {
      title: "New user added",
      role: currentUser?.role,
      date: serverTimestamp(),
      item: "User",
      user: currentUser?.name,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImg(file);
    }
    console.log("file is selected");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="User Form " />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {dataSaved && (
            <div className="w-full h-[60px] bg-[#06905E]  mb-2 flex items-center justify-center rounded-lg">
              Data Uploaded Successfully !!
            </div>
          )}
          {/* <!-- Input Fields --> */}

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
                  value={formData?.name}
                  name="name"
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Email
                </label>
                <input
                  value={formData?.email}
                  name="email"
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Email"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>{" "}
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Password
                </label>
                <input
                  value={formData?.password}
                  name="password"
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Password"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>{" "}
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Phone
                </label>
                <input
                  value={formData?.phone}
                  name="phone"
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Phone"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>{" "}
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Role
                </label>
                <input
                  value={formData?.role}
                  name="role"
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Role"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Attach Image
                </label>

                <input
                  onChange={handleFileChange}
                  type="file"
                  className={` w-full rounded-lg border-[1.5px]    border-stroke bg-transparent py-3 px-5 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter  dark:border-form-strokedark  dark:bg-form-input   dark:text-white`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke fixed right-15 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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

export default UserForm;
