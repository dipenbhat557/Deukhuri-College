import { register } from "../assets";
import { styles } from "../styles";

const RegisterSection = () => {
  return (
    <div className={` ${styles.padding} h-[500px] w-full flex `}>
      <div className="w-[40%] h-full">
        <img src={register} alt="register Teacher" className="object-cover" />
      </div>
      <div className="w-[60%] h-full flex-col flex items-center justify-center">
        <p className={`${styles.sectionHeadText} h-[15%] w-[90%] `}>
          JOIN DMC FOR 2023
        </p>
        <p className="h-[30%] w-[90%] ">
          It's time to start your fall journey at DMC College. We have many
          courses to choose from, in a variety of flexible formats to meet your
          busy schedule. Many classes will fill up quickly so join DMC today!
        </p>
        <div className="w-[90%] flex h-[30%] items-center justify-between">
          <button className="border-2 hover:bg-red-900 p-2 rounded-md hover:text-white">
            Register for Graduate program
          </button>
          <button className="border-2 hover:bg-red-900 p-2 rounded-md hover:text-white">
            Register for Under Graduate program
          </button>
        </div>
      </div>
    </div>
  );
};
export default RegisterSection;
