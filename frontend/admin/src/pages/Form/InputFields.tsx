import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";

const InputFieldList = ({
  noOfInputs,
  setNoOfInputs,
  handleValueChange,
  inputFields,
  setInputFields,
  title,
}: {
  noOfInputs: number;
  setNoOfInputs: any;
  handleValueChange: any;
  inputFields: string[];
  setInputFields: any;
  title: string;
}) => {
  return (
    <>
      {Array.from({ length: noOfInputs }, (_, index) => (
        <div
          className="input-container flex items-center justify-around py-3"
          key={index}
        >
          <input
            type="text"
            placeholder={`${title} ${index + 1}`}
            value={inputFields[index] || ""}
            onChange={(e) => handleValueChange(index, e)}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />

          <button
            className="delete-btn pl-2"
            onClick={() => {
              setNoOfInputs((prevVal: number) => Math.max(prevVal - 1, 1));
              setInputFields((prevFields: any[]) => {
                const updatedFields = [...prevFields];
                updatedFields.splice(index, 1);
                return updatedFields;
              });
            }}
          >
            <IoIosRemoveCircle />
          </button>
          <button
            onClick={() => {
              setNoOfInputs((prevVal: number) => prevVal + 1);
              setInputFields([...inputFields, ""]);
            }}
            className=" bg-transparent  text-blue-700 font-semibold hover:text-white py-2 px-1   "
          >
            <IoIosAddCircle />
          </button>
        </div>
      ))}
    </>
  );
};

export default InputFieldList;

interface InputField {
  title: string;
  description: string;
}

interface IteraneryFieldListProps {
  noOfInputs: number;
  setNoOfInputs: (value: React.SetStateAction<number>) => void;
  handleValueChange: (
    index: number,
    field: "title" | "description",
    value: string
  ) => void;
  inputFields: InputField[];
  setInputFields: (fields: React.SetStateAction<InputField[]>) => void;
  title: string;
}

const IteraneryFieldList: React.FC<IteraneryFieldListProps> = ({
  noOfInputs,
  setNoOfInputs,
  handleValueChange,
  inputFields,
  setInputFields,
  title,
}) => {
  return (
    <>
      {Array.from({ length: noOfInputs }, (_, index) => (
        <div
          className="input-container flex  items-center justify-around py-3"
          key={index}
        >
          <div className="flex flex-col justify-around w-[90%] items-center ">
            <input
              type="text"
              placeholder={`${title} ${index + 1}`}
              value={inputFields[index]?.title || ""}
              onChange={(e) =>
                handleValueChange(index, "title", e.target.value)
              }
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <textarea
              rows={5}
              value={inputFields[index]?.description || ""}
              placeholder={`What to be done on the day ${index + 1}`}
              onChange={(e) =>
                handleValueChange(index, "description", e.target.value)
              }
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <button
            className="delete-btn pl-2"
            onClick={() => {
              setNoOfInputs((prevVal: number) => Math.max(prevVal - 1, 1));
              setInputFields((prevFields) => {
                const updatedFields = [...prevFields];
                updatedFields.splice(index, 1);
                return updatedFields;
              });
            }}
          >
            <IoIosRemoveCircle />
          </button>
          <button
            onClick={() => {
              setNoOfInputs((prevVal: number) => prevVal + 1);
              setInputFields([...inputFields, { title: "", description: "" }]);
            }}
            className="bg-transparent text-blue-700 font-semibold hover:text-white py-2 px-1"
          >
            <IoIosAddCircle />
          </button>
        </div>
      ))}
    </>
  );
};

export { IteraneryFieldList };
