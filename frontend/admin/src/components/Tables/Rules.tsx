import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { currUser } from "../../pages/store";
import axios from "axios";
import DefaultLayout from "../../layout/DefaultLayout"; // Ensure this path is correct
import Breadcrumb from "../Breadcrumbs/Breadcrumb"; // Ensure this path is correct

const Rules = () => {
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rules, setRules] = useState<string[]>([]);
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const currentUser = useRecoilValue(currUser);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_ROOT}/api/rule`);
        const rules = response?.data;
        setRules(rules?.[0]?.rules);
        console.log("rule are ",rules)
      } catch (error) {
        console.error('Error fetching rules:', error);
      }
    };
    fetchRules();
  }, [editable]);

  const handleEditClick = () => {
    setEditable(true);
  };

  const handleSaveClick = async () => {
    setEditable(false);
    setLoading(true);

    try {
      await axios.put(`${import.meta.env.VITE_APP_API_ROOT}/api/rule/1`, {rules:rules}, {
        headers: { 'Content-Type': 'application/json' }
      });
      setDataSubmitted(true);
      setTimeout(() => {
        setDataSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving rules:', error);
    }

    setLoading(false);
  };

  const handleAddRule = () => {
    setRules([...rules, ""]);
  };

  const handleRuleChange = (index: number, newRule: string) => {
    const updatedRules = rules.map((rule, i) => (i === index ? newRule : rule));
    setRules(updatedRules);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Rules" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <div className="flex w-full h-[400px] flex-col justify-around ">
            {dataSubmitted && (
              <div className="w-full h-[60px] bg-[#06905E] mb-2 flex items-center justify-center rounded-lg">
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
                <p className="font-serif">Rules</p>
                {rules?.map((rule, index) => (
                  <input
                    key={index}
                    type="text"
                    value={rule}
                    className={`${
                      !editable
                        ? "text-slate-500 focus:outline-none"
                        : "text-slate-800 focus:border-primary"
                    } w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white`}
                    placeholder="Enter rule"
                    onChange={(e) => handleRuleChange(index, e.target.value)}
                    readOnly={!editable}
                  />
                ))}
                {editable && (
                  <button
                    className="text-white bg-[#06905E] px-6 rounded-full py-1 mt-2"
                    onClick={handleAddRule}
                  >
                    Add Rule
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Rules;
