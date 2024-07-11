import { useLocation, useNavigate } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { MdDelete } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { currUser } from "../../pages/store";

interface ImageData {
  img: string;
  id: string;
  category: string;
}

const Images = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const navigate = useNavigate();
  const [dataDeleted, setDataDeleted] = useState(false);
  const currentUser = useRecoilValue(currUser);
  const location = useLocation();
  const category = location?.state?.category;

  useEffect(() => {
    let gotImages: ImageData[] = [];
    const fetchDocuments = async () => {
      const querySnapshot = await getDocs(collection(db, "gallery"));

      querySnapshot.forEach((doc) => {
        const f: ImageData = {
          img: doc?.data()?.img,
          id: doc?.id,
          category: doc?.data()?.category,
        };
        gotImages.push(f);
      });
      gotImages = gotImages.filter(
        (i) =>
          i?.category?.toLowerCase().trim() === category?.toLowerCase().trim()
      );
      setImages(gotImages);
    };

    fetchDocuments();
  }, []);

  const handleClick = async (id: string) => {
    const glimpsesRef = doc(db, "gallery", id);

    await deleteDoc(glimpsesRef);
    console.log("Deleted successfully");
    setImages((prevImages) => prevImages.filter((img) => img.id !== id));
    setDataDeleted(true);
    setTimeout(() => {
      setDataDeleted(false);
    }, 3000);
    const historyRef = collection(db, "history");
    await addDoc(historyRef, {
      title: "Gallery image deleted",
      role: currentUser?.role,
      date: serverTimestamp(),
      item: "Image",
      user: currentUser?.name,
    });
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Images" />

      <div className="flex justify-end py-2 ">
        <button className="bg-gray-300 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ">
          <div
            onClick={() =>
              navigate("/forms/image-form", { state: { category: category } })
            }
          >
            Add New Image
          </div>
        </button>
      </div>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {dataDeleted && (
            <div className="w-full mx-auto h-[60px] opacity-70 bg-red-400 text-white  mb-2 flex items-center justify-center rounded-lg">
              Data Deleted Successfully !!
            </div>
          )}
          <div className="w-full flex justify-between  gap-4 flex-wrap h-auto">
            {images?.map((image, id) => {
              return (
                <div key={id} className="w-[80%] relative sm:w-[30%] h-[300px]">
                  <img
                    src={image?.img}
                    alt="image"
                    className="w-full h-full object-cover"
                  />
                  <MdDelete
                    className="text-2xl absolute z-10 top-4 right-4 text-red-400 cursor-pointer"
                    onClick={() => handleClick(image?.id)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Images;
