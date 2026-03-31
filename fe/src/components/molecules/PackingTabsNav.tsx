import { Link, useLocation, useParams } from "react-router-dom";

const tabBaseClassName =
  "flex h-[54px] min-h-[36px] w-[176px] items-center justify-center gap-[8px] border border-[#002B45] px-[16px] py-[8px] text-[14px] font-medium text-[#002B45]";

export const PackingTabsNav = () => {
  const { country } = useParams<{ country: string }>();
  const { pathname } = useLocation();

  const packingListPath = `/${country}/packing-list`;
  const reviewsPath = `/${country}/reviews`;
  const packingListClassName =
    pathname === packingListPath
      ? `${tabBaseClassName} rounded-l-xl rounded-r-none bg-[#00588C] text-white`
      : `${tabBaseClassName} rounded-l-xl rounded-r-none`;
  const reviewsClassName =
    pathname === reviewsPath
      ? `${tabBaseClassName} rounded-r-xl rounded-l-none bg-[#00588C] text-white`
      : `${tabBaseClassName} rounded-r-xl rounded-l-none`;

  return (
    <div className="flex gap-[16px] bg-transparent p-0">
      <Link to={packingListPath} className={packingListClassName}>
        持ち物
      </Link>
      <Link to={reviewsPath} className={reviewsClassName}>
        口コミ
      </Link>
    </div>
  );
};
