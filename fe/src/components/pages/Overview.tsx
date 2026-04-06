import { HeaderLayout } from "../templetes/HeaderLayout";
import { TitleFrame } from "../atoms/TitleFrame";
import { Link } from "react-router-dom";
import USHeaderImage from "../../assets/US_Header_pic.jpg";
import { NavTab } from "../atoms/NavTba";

const packingItemImageModules = import.meta.glob(
  "../../assets/packingList/usa/*.png",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

const packingItemImages = Object.fromEntries(
  Object.entries(packingItemImageModules).map(([path, url]) => {
    const fileName = path.split("/").pop() ?? "";
    const baseName = fileName.replace(/\.[^.]+$/, "");

    return [baseName, url];
  }),
);

type PackingItem = {
  name: string;
  img_name: string; // assetsに配置する背景画像の名前
  path: string;
};

export const OVerview = () => {
  const itemList: PackingItem[] = [
    {
      name: "ESTA",
      img_name: "EstaImage",

      path: "/usa/packing-list/esta",
    },
    {
      name: "パスポート",
      img_name: "PassportImage",
      path: "/usa/packing-list/passport",
    },
    {
      name: "航空券",
      img_name: "AirTicketImage",
      path: "/usa/packing-list/ticket",
    },
    {
      name: "税関申告書",
      img_name: "TaxImage",
      path: "/usa/packing-list/tax",
    },
  ];

  const itemsWithImage = itemList.map((item) => ({
    ...item,
    imageUrl: packingItemImages[item.img_name] ?? "",
  }));

  return (
    <HeaderLayout
      path={"/country-list"}
      title="アメリカ"
      showBackButton
      backgroundImage={USHeaderImage}
    >
      <div className="flex flex-col items-center justify-center pt-[10px]">
        {/* タブの表示部分 */}
        <div className="flex bg-[#A8C9DE] h-[56px] gap-[16px] rounded-xl items-center justify-center px-[10px]">
          <NavTab to="/usa/packing-list" label="概要" isActive={true} />
          <NavTab to="/usa/reviews" label="口コミ" isActive={false} />
        </div>
        <div>
          <div className="px-2 py-1 left-0 top-0 inline-flex flex-col justify-start items-start overflow-hidden">
            <div className="justify-center text-[#002B45] text-[16px] leading-6">
              日本国籍の方が、観光または商用目的でアメリカへ渡航する場合、ビザ免除プログラム（WWP）に基づき、以下の条件を満たすことで最大90日間の無査証（ビザなし）滞在が可能です。
            </div>
          </div>
          <TitleFrame
            title="必要書類"
            date="更新日時　2026/3/24"
            superivisor="トリトン確認済"
          />
          <div className="grid grid-cols-2 gap-4 px-4 pb-6 pt-[10px]">
            {itemsWithImage.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="relative flex min-h-[240px] overflow-hidden rounded-3xl bg-[#A8C9DE]"
                style={{
                  backgroundImage: item.imageUrl
                    ? `url(${item.imageUrl})`
                    : undefined,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#002b45cc] via-[#002b4522] to-transparent" />
                {item.name !== "ESTA" ? (
                  <>
                    <div className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 justify-center px-3">
                      <p className="w-full min-w-[180px] rounded bg-[#FFB800] py-1 text-center text-[24px] font-bold text-[#00588C]">
                        情報を提供する
                      </p>
                    </div>
                    <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center px-3">
                      <p className="min-w-[132px] rounded bg-[#004269] px-5 py-2 text-center text-[20px] font-bold leading-none text-white">
                        {item.name}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center px-3">
                    <p className="min-w-[120px] rounded bg-[#004269] px-5 py-2 text-center text-[20px] font-bold leading-none text-white">
                      {item.name}
                    </p>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </HeaderLayout>
  );
};
