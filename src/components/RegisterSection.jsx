import { useNavigate } from "react-router-dom";
import { register } from "../assets";
import { styles } from "../styles";
import { slideIn } from "../utils/motion";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";

const RegisterSection = () => {
  const navigate = useNavigate();
  return (
    <div className={`  h-[450px] w-full flex bg-[#F2F2F2] mb-5`}>
      <motion.div
        variants={slideIn("left", "spring", 0.5, 0.75)}
        className="w-[35%] h-full"
      >
        <img src={register} alt="register Teacher" className="object-cover" />
      </motion.div>
      <motion.div
        variants={slideIn("right", "spring", 0.5, 0.75)}
        className="w-[60%] h-full flex-col flex items-center justify-center"
      >
        <p className={`${styles.sectionHeadText} h-[15%] w-[90%] `}>
          JOIN DMC FOR 2023
        </p>
        <p className="h-[30%] w-[90%] text-justify">
          It's time to start your fall journey at DMC College. We have many
          courses to choose from, in a variety of flexible formats to meet your
          busy schedule. Many classes will fill up quickly so join DMC today!
        </p>
        <div className="w-[90%] flex h-[30%] items-center justify-between">
          <button
            className="border-2 hover:bg-red-900 p-2 rounded-md hover:text-white"
            onClick={() => navigate("/admission")}
          >
            Register for Graduate program
          </button>
          <button
            className="border-2 hover:bg-red-900 p-2 rounded-md hover:text-white"
            onClick={() => navigate("/admission")}
          >
            Register for Under Graduate program
          </button>
        </div>
      </motion.div>
    </div>
  );
};
export default SectionWrapper(RegisterSection, "");
