import { Link } from "react-router-dom";
import { RiArrowLeftWideLine } from "react-icons/ri";

type Props = {
  path: string;
};

export const BackIcon: React.FC<Props> = ({ path }) => {
  return (
    <Link to={path}>
      <RiArrowLeftWideLine />
    </Link>
  );
};
