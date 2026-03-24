import { Link } from "react-router-dom";

type Props = {
  path: string;
  children: React.ReactNode;
};

export const PrimaryLink: React.FC<Props> = ({ path, children }) => {
  return (
    <Link to={path} className="text-blue-500 hover:text-blue-800 underline">
      {children}
    </Link>
  );
};
