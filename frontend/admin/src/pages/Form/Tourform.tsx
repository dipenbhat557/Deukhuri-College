import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import InputFieldList, { IteraneryFieldList } from "./InputFields";
import { useLocation, useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { currUser } from "../store";

interface TourData {
  title: string;
  img: string[];
  id: string;
  tourTitle: string;
  location: string;
  overview: string;
  highlights: string[];
  inclusion: string[];
  exclusion: string[];
  itinerary: { title: string; description: string }[];
  price: number;
  type: string;
  trending: boolean;
  category: string[];
  duration: string;
  groupSize: string;
  ages: string;
  languages: string;
}

const TourForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tour: TourData = location?.state?.tour;

  const [img, setImg] = useState([] as File[]);
  const [dataSaved, setDataSaved] = useState(false);
  const currentUser = useRecoilValue(currUser);

  const [noOfHighlightInputs, setNoOfHighlightInputs] = useState<number>(
    tour?.highlights?.length || 1
  );
  const [noOfInclusionInputs, setNoOfInclusionInputs] = useState<number>(
    tour?.inclusion?.length || 1
  );
  const [noOfExclusionInputs, setNoOfExclusionInputs] = useState<number>(
    tour?.exclusion?.length || 1
  );
  const [noOfItineraryInputs, setNoOfItineraryInputs] = useState<number>(
    tour?.itinerary?.length || 1
  );

  const [highlightInputFields, setHighlightInputFields] = useState<string[]>(
    tour?.highlights || [""]
  );
  const [inclusionInputFields, setInclusionInputFields] = useState<string[]>(
    tour?.inclusion || [""]
  );
  const [exclusionInputFields, setExclusionInputFields] = useState<string[]>(
    tour?.exclusion || [""]
  );
  const [itineraryInputFields, setItineraryInputFields] = useState<
    { title: string; description: string }[]
  >(tour?.itinerary || [{ title: "", description: "" }]);

  const [formData, setFormData] = useState<TourData>({
    title: tour?.title || "",
    tourTitle: tour?.tourTitle || "",
    img: tour?.img || [""],
    location: tour?.location || "",
    overview: tour?.overview || "",
    highlights: tour?.highlights || [],
    inclusion: tour?.inclusion || [],
    exclusion: tour?.exclusion || [],
    itinerary: tour?.itinerary || [{ title: "", description: "" }],
    price: tour?.price || 0,
    type: tour?.type || "inbound",
    trending: tour?.trending || false,
    id: tour?.id || "",
    category: tour?.category || [""],
    duration: tour?.duration || "",
    groupSize: tour?.groupSize || "",
    ages: tour?.ages || "",
    languages: tour?.languages || "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setImg(fileArray);
    }
    console.log("files are selected");
  };

  const handleHighlightsValueChange = (index: any, event: any) => {
    const values = [...highlightInputFields];
    values[index] = event.target.value;
    setHighlightInputFields(values);

    // Update formData separately
    setFormData((prevFormData) => ({
      ...prevFormData,
      highlights: [
        ...prevFormData.highlights.slice(0, index),
        event.target.value,
        ...prevFormData.highlights.slice(index + 1),
      ],
    }));
  };

  const handleInclusionValueChange = (index: any, event: any) => {
    const values = [...inclusionInputFields];
    values[index] = event.target.value;
    setInclusionInputFields(values);

    // Update formData separately
    setFormData((prevFormData) => ({
      ...prevFormData,
      inclusion: [
        ...prevFormData.inclusion.slice(0, index),
        event.target.value,
        ...prevFormData.inclusion.slice(index + 1),
      ],
    }));
  };

  const handleExclusionValueChange = (index: any, event: any) => {
    const values = [...exclusionInputFields];
    values[index] = event.target.value;
    setExclusionInputFields(values);

    // Update formData separately
    setFormData((prevFormData) => ({
      ...prevFormData,
      exclusion: [
        ...prevFormData.exclusion.slice(0, index),
        event.target.value,
        ...prevFormData.exclusion.slice(index + 1),
      ],
    }));
  };

  const handleItineraryValueChange = (
    index: number,
    field: "title" | "description",
    value: string
  ) => {
    // Update itineraryInputFields
    const updatedFields = [...itineraryInputFields];
    updatedFields[index] = {
      ...updatedFields[index],
      [field]: value,
    };
    setItineraryInputFields(updatedFields);

    // Update formData separately
    setFormData((prevFormData) => ({
      ...prevFormData,
      itinerary: [
        ...prevFormData.itinerary.slice(0, index),
        updatedFields?.[index],
        ...prevFormData.itinerary.slice(index + 1),
      ],
    }));
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log("Submission started");
    if (img.length > 0) {
      try {
        const uploadTasks = img.map(async (file) => {
          const storageRef = ref(storage, "some-child/" + file.name);
          await uploadBytes(storageRef, file);
          return getDownloadURL(storageRef);
        });

        const downloadURLs = await Promise.all(uploadTasks);

        if (tour?.id) {
          const tourRef = doc(db, "tours", tour?.id);
          await setDoc(tourRef, {
            title: formData?.title,
            img: downloadURLs,
            date: serverTimestamp(),
            tourTitle: formData?.tourTitle,
            location: formData?.location,
            overview: formData?.overview,
            highlights: formData?.highlights,
            inclusion: formData?.inclusion,
            exclusion: formData?.exclusion,
            itinerary: formData?.itinerary,
            price: formData?.price,
            type: formData?.type,
            trending: formData?.trending,
            category: formData?.category,
            duration: formData?.duration,
            groupSize: formData?.groupSize,
            ages: formData?.ages,
            languages: formData?.languages,
          });
          console.log("updated successfully");
          navigate("/tour");
        } else {
          const tourRef = collection(db, "tours");

          const docRef = await addDoc(tourRef, {
            title: formData?.title,
            img: downloadURLs,
            date: serverTimestamp(),
            tourTitle: formData?.tourTitle,
            location: formData?.location,
            overview: formData?.overview,
            highlights: formData?.highlights,
            inclusion: formData?.inclusion,
            exclusion: formData?.exclusion,
            itinerary: formData?.itinerary,
            price: formData?.price,
            type: formData?.type,
            trending: formData?.trending,
            category: formData?.category,
            duration: formData?.duration,
            groupSize: formData?.groupSize,
            ages: formData?.ages,
            languages: formData?.languages,
          });
          console.log(docRef.id);
          setFormData({
            title: "",
            img: [""],
            tourTitle: "",
            location: "",
            overview: "",
            highlights: [""],
            inclusion: [""],
            exclusion: [""],
            itinerary: [{ title: "", description: "" }],
            price: 0,
            type: "",
            trending: false,
            id: "",
            category: [""],
            duration: "",
            groupSize: "",
            ages: "",
            languages: "",
          });
        }
        setDataSaved(true);

        setTimeout(() => setDataSaved(false), 3000);
        window.scrollTo(0, 0);
        navigate("/tour");
      } catch (error: any) {
        console.error("Error uploading file:", error);
      }
    } else {
      if (tour?.id) {
        const tourRef = doc(db, "tours", tour?.id);
        await setDoc(tourRef, {
          title: formData?.title,
          img: formData?.img,
          date: serverTimestamp(),
          tourTitle: formData?.tourTitle,
          location: formData?.location,
          overview: formData?.overview,
          highlights: formData?.highlights,
          inclusion: formData?.inclusion,
          exclusion: formData?.exclusion,
          itinerary: formData?.itinerary,
          price: formData?.price,
          type: formData?.type,
          trending: formData?.trending,
          category: formData?.category,
          duration: formData?.duration,
          groupSize: formData?.groupSize,
          ages: formData?.ages,
          languages: formData?.languages,
        });
        console.log("updated successfully");
        navigate("/tour");
      } else {
        console.error("No file selected");
      }
    }

    const historyRef = collection(db, "history");
    await addDoc(historyRef, {
      title: formData?.title,
      role: currentUser?.role,
      date: serverTimestamp(),
      item: "Tour",
      user: currentUser?.name,
    });
    window.scrollTo(0, 0);
  };

  const handleCategoryChange = (category: string) => {
    const isCategorySelected = formData.category.includes(category);
    if (isCategorySelected) {
      setFormData((prevState) => ({
        ...prevState,
        category: prevState.category.filter((c) => c !== category),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        category: [...prevState.category, category],
      }));
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tour Form" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div>
          {/* <!-- Input Fields --> */}

          <div className="rounded-sm flex flex-col gap-6 border border-stroke  bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Input Fields
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              {dataSaved && (
                <div className="w-full h-[60px] bg-[#06905E]  mb-2 flex items-center justify-center rounded-lg">
                  Data Uploaded Successfully !!
                </div>
              )}
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Title
                </label>
                <input
                  type="text"
                  value={formData?.title}
                  name="title"
                  onChange={(e) => handleChange(e)}
                  placeholder="Title Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Tour Title
                </label>
                <input
                  type="text"
                  value={formData?.tourTitle}
                  name="tourTitle"
                  onChange={(e) => handleChange(e)}
                  placeholder="Tour Title"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Tour Duration
                </label>
                <input
                  type="text"
                  value={formData?.duration}
                  name="duration"
                  onChange={(e) => handleChange(e)}
                  placeholder="Tour Duration"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Group Size
                </label>
                <input
                  type="text"
                  value={formData?.groupSize}
                  name="groupSize"
                  onChange={(e) => handleChange(e)}
                  placeholder="Group Size"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Age Group
                </label>
                <input
                  type="text"
                  value={formData?.ages}
                  name="ages"
                  onChange={(e) => handleChange(e)}
                  placeholder="Age Group"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Languages
                </label>
                <input
                  type="text"
                  value={formData?.languages}
                  name="languages"
                  onChange={(e) => handleChange(e)}
                  placeholder="Languages"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Attach Image
                </label>

                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(e)}
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Location
                </label>
                <input
                  type="text"
                  value={formData?.location}
                  name="location"
                  onChange={(e) => handleChange(e)}
                  placeholder="Location"
                  className="w-full rounded-lg border-[1.5px]    border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary disabled:cursor-default disabled:bg-whiter  dark:border-form-strokedark  dark:bg-form-input  dark:focus:border-primary dark:text-white"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Tour Overview
                </label>
                <textarea
                  rows={6}
                  value={formData?.overview}
                  name="overview"
                  onChange={(e) => handleChange(e)}
                  placeholder="Give a brief introduction to the tour"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="">
                <label className="mb-3 block text-black dark:text-white">
                  Tour Highlights
                </label>
                <InputFieldList
                  noOfInputs={noOfHighlightInputs}
                  setNoOfInputs={setNoOfHighlightInputs}
                  handleValueChange={handleHighlightsValueChange}
                  inputFields={highlightInputFields}
                  setInputFields={setHighlightInputFields}
                  title="Tour Highlights "
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Whats Included
                </label>
                <InputFieldList
                  noOfInputs={noOfInclusionInputs}
                  setNoOfInputs={setNoOfInclusionInputs}
                  handleValueChange={handleInclusionValueChange}
                  inputFields={inclusionInputFields}
                  setInputFields={setInclusionInputFields}
                  title="Whats Included "
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Whats Not Included
                </label>
                <InputFieldList
                  noOfInputs={noOfExclusionInputs}
                  setNoOfInputs={setNoOfExclusionInputs}
                  handleValueChange={handleExclusionValueChange}
                  inputFields={exclusionInputFields}
                  setInputFields={setExclusionInputFields}
                  title="Whats Not Included "
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Itinerary
                </label>

                <IteraneryFieldList
                  noOfInputs={noOfItineraryInputs}
                  setNoOfInputs={setNoOfItineraryInputs}
                  handleValueChange={handleItineraryValueChange}
                  inputFields={itineraryInputFields}
                  setInputFields={setItineraryInputFields}
                  title="Itinerary"
                />
              </div>
            </div>
            <div className="px-5 mb-3">
              <label className="mb-3 block text-black dark:text-white">
                Price
              </label>
              <input
                type="number"
                value={formData?.price}
                name="price"
                onChange={(e) => handleChange(e)}
                placeholder="Enter price in NPR"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-5">
              <p className="mb-3 px-5 block text-black dark:text-white">
                Type of Tour
              </p>
              <div className="px-5 mb-3 flex  justify-start">
                <div className="flex items-center mr-4 px-5 border border-gray-200 rounded dark:border-gray-700">
                  <input
                    id="inbound-radio"
                    type="radio"
                    value="inbound"
                    checked={formData?.type === "inbound"}
                    onChange={() =>
                      setFormData((prevState) => ({
                        ...prevState,
                        type: "inbound",
                      }))
                    }
                    className=" cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="bordered-radio-1"
                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    In Bound
                  </label>
                </div>

                <div className="flex items-center px-5 border border-gray-200 rounded dark:border-gray-700">
                  <input
                    id="inbound-radio"
                    type="radio"
                    value="outbound"
                    checked={formData?.type === "outbound"}
                    onChange={() =>
                      setFormData((prevState) => ({
                        ...prevState,
                        type: "outbound",
                      }))
                    }
                    className="w-4 cursor-pointer h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="bordered-radio-2"
                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Out Bound
                  </label>
                </div>
              </div>
            </div>
            <div className="px-3">
              <div className="flex items-center mb-4 ">
                <label
                  htmlFor="default-checkbox"
                  className="ms-2 font-bold text-gray-900 pr-5 dark:text-gray-300 text-xl"
                >
                  Trending
                </label>
                <input
                  id="default-checkbox"
                  type="checkbox"
                  checked={formData?.trending}
                  onChange={() =>
                    setFormData((prevState) => ({
                      ...prevState,
                      trending: !formData?.trending,
                    }))
                  }
                  className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>

            <div className="flex flex-col gap-5 ">
              <p className="mb-3 px-5 block text-black dark:text-white">
                Category of Tour
              </p>
              <div className="px-5 mb-3 flex flex-wrap gap-4 justify-start">
                <div className="flex items-center mr-4 px-5 border border-gray-200 rounded dark:border-gray-700">
                  <input
                    type="checkbox"
                    value="Nature"
                    checked={formData?.category?.includes("Nature")}
                    onChange={() => handleCategoryChange("Nature")}
                    className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="bordered-checkbox-1"
                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Nature
                  </label>
                </div>
                <div className="flex items-center mr-4 px-5 border border-gray-200 rounded dark:border-gray-700">
                  <input
                    type="checkbox"
                    value="Adventure"
                    checked={formData?.category?.includes("Adventure")}
                    onChange={() => handleCategoryChange("Adventure")}
                    className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="bordered-checkbox-1"
                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Adventure
                  </label>
                </div>
                <div className="flex items-center mr-4 px-5 border border-gray-200 rounded dark:border-gray-700">
                  <input
                    type="checkbox"
                    value="Culture"
                    checked={formData?.category?.includes("Culture")}
                    onChange={() => handleCategoryChange("Culture")}
                    className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="bordered-checkbox-1"
                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Culture
                  </label>
                </div>
                <div className="flex items-center mr-4 px-5 border border-gray-200 rounded dark:border-gray-700">
                  <input
                    type="checkbox"
                    value="Food"
                    checked={formData?.category?.includes("Food")}
                    onChange={() => handleCategoryChange("Food")}
                    className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="bordered-checkbox-1"
                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Food
                  </label>
                </div>
                <div className="flex items-center mr-4 px-5 border border-gray-200 rounded dark:border-gray-700">
                  <input
                    type="checkbox"
                    value="City"
                    checked={formData?.category?.includes("City")}
                    onChange={() => handleCategoryChange("City")}
                    className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="bordered-checkbox-1"
                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    City
                  </label>
                </div>
                <div className="flex items-center mr-4 px-5 border border-gray-200 rounded dark:border-gray-700">
                  <input
                    type="checkbox"
                    value="Cruise"
                    checked={formData?.category?.includes("Cruise")}
                    onChange={() => handleCategoryChange("Cruise")}
                    className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="bordered-checkbox-1"
                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Cruise
                  </label>
                </div>
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

export default TourForm;
