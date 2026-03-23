import { Link } from "react-router-dom";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { Button } from "../ui/button";

export const Home = () => {
  return (
    <HeaderLayout>
      {/* <div className="flex justify-center items-center text-[10rem] bg-red-500"> */}
      <Link to="/country-list">
        <Button className="bg-gray-200"> 旅行を準備する </Button>
      </Link>
      {/* </div> */}
    </HeaderLayout>
  );
};
