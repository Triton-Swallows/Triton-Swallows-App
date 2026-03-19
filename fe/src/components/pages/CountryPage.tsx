import { Link } from "react-router-dom";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { IoChevronBackOutline } from "react-icons/io5";

export const CountryPage = () => {
  return (
    <HeaderLayout>
      <Link to="/">
        <IoChevronBackOutline />
      </Link>
      <h1>国リスト</h1>
      <Link to="/usa/packing-list">
        <div>アメリカ</div>
      </Link>
    </HeaderLayout>
  );
};
