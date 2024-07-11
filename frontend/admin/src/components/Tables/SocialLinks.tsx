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
import { db } from "../../firebaseConfig";
import { useRecoilValue } from "recoil";
import { currUser } from "../../pages/store";

interface SocialLinkData {
  facebookLink: string;
  instaLink: string;
  whatsappLink: number;
}

const SocialLinks = () => {
  const [editable, setEditable] = useState(false);
  //  const currentUser = useRecoilValue(currUser);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<SocialLinkData>({
    facebookLink: "",
    instaLink: "",
    whatsappLink: 0,
  });
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const currentUser = useRecoilValue(currUser);

  useEffect(() => {
    const docRef = doc(db, "socialLinks", "cXM2ywx01R2BDRwHXFov");
    const fetcthing = async () => {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setFormData({
          facebookLink: docSnap.data().facebookLink,
          instaLink: docSnap.data().instaLink,
          whatsappLink: docSnap.data().whatsappLink,
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

  const handleSaveClick = () => {
    console.log("form data is ", formData);
    setEditable(false);
    setLoading(true);

    const saving = async () => {
      await setDoc(doc(db, "socialLinks", "cXM2ywx01R2BDRwHXFov"), {
        facebookLink: formData?.facebookLink,
        instaLink: formData?.instaLink,
        whatsappLink: formData?.whatsappLink,
      });
      setDataSubmitted(true);

      setTimeout(() => {
        setDataSubmitted(false);
      }, 3000);
      const historyRef = collection(db, "history");
      await addDoc(historyRef, {
        title: "Socail Links updated",
        role: currentUser?.role,
        date: serverTimestamp(),
        item: "Social Links",
        user: currentUser?.name,
      });
    };

    saving();
    setLoading(false);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Socail Links" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <div className="flex w-full h-[400px] flex-col justify-around ">
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
            <div className="w-[80%] h-[90%] sm:h-[75%] flex flex-col sm:flex-row justify-around gap-5">
              <div className="w-[90%] sm:w-[40%] h-[90%] sm:h-full justify-around flex flex-col gap-3">
                <p className="font-serif">Facebook Link </p>
                <input
                  type="text"
                  value={formData?.facebookLink}
                  className={` ${
                    !editable
                      ? "text-slate-500  focus:outline-none"
                      : "text-slate-800 focus:border-primary"
                  } w-full rounded-lg border-[1.5px]    border-stroke bg-transparent py-3 px-5 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter  dark:border-form-strokedark  dark:bg-form-input   dark:text-white`}
                  placeholder="Enter facebook link  "
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      facebookLink: e.target.value,
                    })
                  }
                  readOnly={!editable}
                />

                <p className="font-serif">Instagram Link</p>
                <input
                  type="text"
                  value={formData?.instaLink}
                  className={` ${
                    !editable
                      ? "text-slate-500  focus:outline-none"
                      : "text-slate-800 focus:border-primary"
                  } w-full rounded-lg border-[1.5px]    border-stroke bg-transparent py-3 px-5 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter  dark:border-form-strokedark  dark:bg-form-input   dark:text-white`}
                  placeholder="Enter instagram link"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      instaLink: e.target.value,
                    })
                  }
                  readOnly={!editable}
                />

                <p className="font-serif">Whatsapp Number</p>
                <input
                  type="number"
                  value={formData?.whatsappLink}
                  className={` ${
                    !editable
                      ? "text-slate-500   focus:border-red-400"
                      : "text-slate-800 focus:border-primary"
                  } w-full rounded-lg border-[1.5px]    border-stroke bg-transparent py-3 px-5 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter  dark:border-form-strokedark  dark:bg-form-input   dark:text-white`}
                  readOnly={!editable}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      whatsappLink: parseInt(e.target.value),
                    })
                  }
                  placeholder="Enter whatsapp no"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SocialLinks;
