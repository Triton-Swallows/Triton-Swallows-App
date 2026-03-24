import { Link } from "react-router-dom";
import { RiArrowLeftWideLine } from "react-icons/ri";

type Props = {
  path: string;
  label: string;
};

export const BackIcon: React.FC<Props> = ({ path, label }) => {
  return (
    <Link to={path} className="flex items-center bg-[#FFD6B3] w-[109px]">
      <RiArrowLeftWideLine />
      {label}
    </Link>
  );
};
