import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currUser } from "../../pages/store";
import { def } from "../../assets";

const DropdownUser = () => {
  const currentUser = useRecoilValue(currUser);

  

  return (
    <div className="relative">
      <Link className="flex items-center gap-4" to="#">
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {currentUser?.name}
          </span>
          <span className="block text-xs">{currentUser?.role}</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <img
            src={`data:image/jpeg;base64,${currentUser?.pimg}` || def}
            className="rounded-full h-[100%] w-[100%]"
            alt="User"
          />
        </span>
      </Link>
    </div>
  );
};

export default DropdownUser;
