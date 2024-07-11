import { logo } from "../../assets";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";

const Hero = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Home Page" />

      <div className="rounded-sm flex flex-col justify-center h-[480px] items-center gap-6 border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <img
          className="w-[50%] h-[50%] object-contain animate-pulse"
          alt="logo"
          src={logo}
        />
        <p className="text-[45px] dark:text-white text-center opacity-40">
          Welcome to Deukhuri Multiple <br/>Campus Console
        </p>
      </div>
    </DefaultLayout>
  );
};
export default Hero;
