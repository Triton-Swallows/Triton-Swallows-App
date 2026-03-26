import { Link } from "react-router-dom";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { HeaderNav } from "../molecules/HeaderNav";

export const CountryPage = () => {
  return (
    <HeaderLayout>
      <HeaderNav path={"/"} label="トップページ" title="国リスト" />
      <Link to="/usa/packing-list">
        <div className="bg-[#A8C9DE]  flex justify-center item-center h-[72px] py-[25px] px-[12px] rounded-xl mx-[16px]">
          <span className="text-[16px] font-midium text-[#002B45]">
            アメリカ（米国）
          </span>
        </div>
      </Link>
    </HeaderLayout>
  );
};
