import { Link } from "react-router-dom";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { Button } from "../ui/button";

export const Home = () => {
  return (
    <HeaderLayout>
      {/* <div className="flex justify-center items-center text-[10rem] bg-red-500"> */}
      <div className="bg-[#F1F5F9] w-full flex items-center justify-center py-[16px]">
        <span className="justify-center font-bold text-[#002B45] text-[24px] p-[8px]">
          Top Page
        </span>
      </div>

      <Link
        to="/country-list"
        className="flex justify-center py-[8px] px-[16px]"
      >
        <Button className="bg-[#00588C] rounded-xl text-[#FAF6F0] text-[32px] w-[329px] h-[218px]">
          {" "}
          旅行を準備する{" "}
        </Button>
      </Link>
      {/* </div> */}
    </HeaderLayout>
  );
};
