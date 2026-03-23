import { Link } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";

type Props = {
  path: string;
};

export const BackIcon: React.FC<Props> = ({ path }) => {
  return (
    <Link to={path}>
      <IoChevronBackOutline />
    </Link>
  );
};
