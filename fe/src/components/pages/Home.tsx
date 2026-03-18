import { RiHome3Line } from "react-icons/ri";
import { HeaderLayout } from "../templetes/HeaderLayout";

export const Home = () => {
  return (
    <HeaderLayout>
      <div className="flex justify-center items-center h-screen text-[10rem]">
        <RiHome3Line />
      </div>
    </HeaderLayout>
  );
};
