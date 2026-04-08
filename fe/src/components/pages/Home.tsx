import { Link } from "react-router-dom";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { Button } from "../ui/button";
import topPageImage from "../../assets/TopPageImage.jpg";

export const Home = () => {
  return (
    <HeaderLayout transparent>
      <div className="relative h-[89dvh] bg-[#FAFAFA] overflow-visible">
        <div className="absolute left-0 -top-16 z-0 w-full h-[77dvh] overflow-hidden">
          <img
            src={topPageImage}
            alt="Top page background"
            className="absolute inset-0 z-0 w-full h-full object-cover [mask-image:linear-gradient(to_bottom,#000_0%,#000_99%,transparent_100%)]"
          />
          <div className="absolute left-0 right-0 inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent via-transparent via-65% to-[#FAFAFA]" />
        </div>

        <div className="absolute inset-x-0 bottom-[4dvh] z-20">
          <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 px-4">
            <div className="w-full flex flex-col gap-3 sm:gap-4">
              <p className="text-center text-[#002B45] text-2xl font-bold leading-8">
                旅行の準備を簡単に
              </p>
              <p className="text-center text-[#002B45] text-[16px]">
                必要な持ち物と手続きをまとめてチェック
              </p>
            </div>
            <Link to="/country-list" className="w-full max-w-[256px]">
              <Button className="w-full h-[7dvh] px-4 py-2 bg-[#00588C] rounded-lg shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] justify-center items-center text-[#FAF6F0] text-[32px] font-bold">
                旅行の準備する
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </HeaderLayout>
  );
};
