import { Link } from "react-router-dom";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { BackIcon } from "../atoms/BackIcon";

export const CountryPage = () => {
  return (
    <HeaderLayout>
      <BackIcon path={"/"} />
      <h1>国リスト</h1>
      <Link to="/usa/packing-list">
        <div>アメリカ</div>
      </Link>
    </HeaderLayout>
  );
};
