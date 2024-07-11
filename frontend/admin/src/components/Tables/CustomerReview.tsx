import { NavLink, useNavigate } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { currUser } from "../../pages/store";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { MdDelete } from "react-icons/md";

interface ReviewData {
  title: string;
  designation: string;
  reviewTitle: string;
  content: string;
  name: string;
  date: string;
  img: string;
  id: string;
}

const CoustomerReview = () => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const navigate = useNavigate();
  const [dataDeleted, setDataDeleted] = useState(false);
  const currentUser = useRecoilValue(currUser);

  useEffect(() => {
    const gotReviews: ReviewData[] = [];
    const fetchDocuments = async () => {
      const querySnapshot = await getDocs(collection(db, "reviews"));

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const date = data.date;
        let dateObject = "";

        if (date instanceof Timestamp) {
          dateObject = date.toDate().toString().slice(0, 21);
          console.log("Date:", dateObject);
        } else {
          console.error("Invalid or missing date field:", date);
        }

        const r: ReviewData = {
          title: doc?.data()?.title,
          date: dateObject,
          img: doc?.data()?.img,
          id: doc?.id,
          designation: doc?.data()?.designation,
          reviewTitle: doc?.data()?.reviewTitle,
          content: doc?.data()?.content,
          name: doc?.data()?.name,
        };
        gotReviews.push(r);
      });
      setReviews(gotReviews);
    };

    fetchDocuments();
  }, []);

  const handleClick = async (id: string) => {
    const reviewRef = doc(db, "reviews", id);

    await deleteDoc(reviewRef);
    console.log("Deleted successfully");
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== id)
    );
    setDataDeleted(true);
    setTimeout(() => {
      setDataDeleted(false);
    }, 3000);

    const historyRef = collection(db, "history");
    await addDoc(historyRef, {
      title: "Review deleted",
      role: currentUser?.role,
      date: serverTimestamp(),
      item: "Review",
      user: currentUser?.name,
    });
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Customer Reviews" />

      <div className="flex justify-end py-2 ">
        <button className="bg-gray-300 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ">
          <NavLink to="/forms/reviews-form"> Add New Review</NavLink>
        </button>
      </div>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {dataDeleted && (
            <div className="w-full mx-auto h-[60px] opacity-70 bg-red-400 text-white  mb-2 flex items-center justify-center rounded-lg">
              Data Deleted Successfully !!
            </div>
          )}
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Title
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Date & Time
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Update
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {reviews?.map((review: ReviewData, key: number) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {review?.title}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{review?.date}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <button
                      onClick={() =>
                        navigate("/forms/reviews-form", {
                          state: { review: review },
                        })
                      }
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex justify-center items-center space-x-3.5">
                      <MdDelete
                        className="text-2xl text-red-400 cursor-pointer"
                        onClick={() => handleClick(review?.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CoustomerReview;
