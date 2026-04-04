import { useNavigate } from "react-router-dom";
import { RiArrowLeftWideLine } from "react-icons/ri";

type Props = {
  path?: string;
};

export const BackIcon: React.FC<Props> = ({ path }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => (path ? navigate(path) : navigate(-1))}
      className="flex items-start w-[103px] h-[56px] px-[3px] py-[10px] justify-start rounded-r"
    >
      <RiArrowLeftWideLine className="text-4xl relative right-[10px]" />
    </button>
  );
};
