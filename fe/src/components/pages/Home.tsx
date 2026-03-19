import { Link } from "react-router-dom";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { Button } from "../ui/button";

export const Home = () => {
  return (
    <HeaderLayout>
      <div className="flex justify-center items-center h-screen text-[10rem]">
        <Link to="/country-list">
          <Button> 旅行を準備する </Button>
        </Link>
      </div>
    </HeaderLayout>
  );
};
