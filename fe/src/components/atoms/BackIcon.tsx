import { Link } from "react-router-dom";
import { RiArrowLeftWideLine } from "react-icons/ri";

type Props = {
  path: string;
  label: string;
};

export const BackIcon: React.FC<Props> = ({ path, label }) => {
  return (
    <Link
      to={path}
      className="flex items-center bg-[#FFD6B3] w-[103px] h-[56px] px-[3px] py-[10px] justify-center rounded-r"
    >
      <RiArrowLeftWideLine className="text-4xl relative right-[5px]" />
      <span className="flex items-center w-[102px] h-[24px] text-[12px] relative right-[13px] font-medium whitespace-nowrap">
        {label}
      </span>
    </Link>
  );
};
