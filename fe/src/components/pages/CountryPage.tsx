import { Link } from "react-router-dom";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { HeaderNav } from "../molecules/HeaderNav";

export const CountryPage = () => {
  return (
    <HeaderLayout>
      <HeaderNav path={"/"} label="トップページ" title="国リスト" />
      <Link to="/usa/packing-list">
        <div>アメリカ</div>
      </Link>
    </HeaderLayout>
  );
};
