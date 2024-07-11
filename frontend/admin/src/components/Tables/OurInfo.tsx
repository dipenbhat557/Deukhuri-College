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

interface InfoData {
  noOfDestinations: number;
  noOfTours: number;
  noOfCustomers: number;
}

const OurInfo = () => {
  const [editable, setEditable] = useState(false);
  //  const currentUser = useRecoilValue(currUser);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<InfoData>({
    noOfDestinations: 0,
    noOfTours: 0,
    noOfCustomers: 0,
  });
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const currentUser = useRecoilValue(currUser);

  useEffect(() => {
    const docRef = doc(db, "ourInfo", "6ehvkjpjNJpYqIwTvuVd");
    const fetcthing = async () => {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setFormData({
          noOfDestinations: docSnap.data().noOfDestinations,
          noOfTours: docSnap.data().noOfTours,
          noOfCustomers: docSnap.data().noOfCustomers,
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
      await setDoc(doc(db, "ourInfo", "6ehvkjpjNJpYqIwTvuVd"), {
        noOfDestinations: formData?.noOfDestinations,
        noOfCustomers: formData?.noOfCustomers,
        noOfTours: formData?.noOfTours,
      });
      setDataSubmitted(true);

      setTimeout(() => {
        setDataSubmitted(false);
      }, 3000);
      const historyRef = collection(db, "history");
      await addDoc(historyRef, {
        title: "Our Info updated",
        role: currentUser?.role,
        date: serverTimestamp(),
        item: "Our Info",
        user: currentUser?.name,
      });
    };

    saving();
    setLoading(false);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Our Info" />

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
                <p className="font-serif">No of Destinations </p>
                <input
                  type="number"
                  value={formData?.noOfDestinations}
                  className={` ${
                    !editable
                      ? "text-slate-500  focus:outline-none"
                      : "text-slate-800 focus:border-primary"
                  } w-full rounded-lg border-[1.5px]    border-stroke bg-transparent py-3 px-5 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter  dark:border-form-strokedark  dark:bg-form-input   dark:text-white`}
                  placeholder="Enter no of Destinations : "
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      noOfDestinations: parseInt(e.target.value),
                    })
                  }
                  readOnly={!editable}
                />

                <p className="font-serif">No of Happy Customers</p>
                <input
                  type="number"
                  value={formData?.noOfCustomers}
                  className={` ${
                    !editable
                      ? "text-slate-500  focus:outline-none"
                      : "text-slate-800 focus:border-primary"
                  } w-full rounded-lg border-[1.5px]    border-stroke bg-transparent py-3 px-5 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter  dark:border-form-strokedark  dark:bg-form-input   dark:text-white`}
                  placeholder="Enter no of customers"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      noOfCustomers: parseInt(e.target.value),
                    })
                  }
                  readOnly={!editable}
                />

                <p className="font-serif">No of Tours</p>
                <input
                  type="number"
                  value={formData?.noOfTours}
                  className={` ${
                    !editable
                      ? "text-slate-500   focus:border-red-400"
                      : "text-slate-800 focus:border-primary"
                  } w-full rounded-lg border-[1.5px]    border-stroke bg-transparent py-3 px-5 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter  dark:border-form-strokedark  dark:bg-form-input   dark:text-white`}
                  readOnly={!editable}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      noOfTours: parseInt(e.target.value),
                    })
                  }
                  placeholder="Enter no of tours"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default OurInfo;
