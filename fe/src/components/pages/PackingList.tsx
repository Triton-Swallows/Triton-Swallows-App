import { HeaderLayout } from "../templetes/HeaderLayout";
import { TitleFrame } from "../atoms/TitleFrame";
import { Link } from "react-router-dom";
import { ContactRequestButton } from "@/components/organisms/dialogs/ContactRequestButton";
import USHeaderImage from "../../assets/US_Header_pic.jpg";

type PackingItem = {
  name: string;
  content: string;
  path: string;
};

export const PackingList = () => {
  const itemList: PackingItem[] = [
    {
      name: "ESTA(エスタ)",
      content:
        "オンラインで申請。40ドル。渡航前(推奨72時間前)までに申請・承認が必要。",
      path: "/usa/packing-list/esta",
    },
    {
      name: "パスポート",
      content: "残存期間は帰国日まで有効なもの。IC旅券(e-passport)であること。",
      path: "/usa/packing-list/passport",
    },
    {
      name: "往復または次の目的地への航空券",
      content: "滞在終了時にアメリカを出国する航空券。",
      path: "/usa/packing-list/ticket",
    },
    {
      name: "税関申告書",
      content: "機内で配られる。またはデジタル(MCPアプリ等)で申請。",
      path: "/usa/packing-list/tax",
    },
  ];

  return (
    <HeaderLayout
      path={"/country-list"}
      title="アメリカ（米国）"
      showBackButton
      backgroundImage={USHeaderImage}
    >
      <div className="flex flex-col items-center justify-center pt-[10px]">
        <div className="h-auto p-0 bg-transparent flex gap-[16px]">
          <Link
            to="/usa/packing-list"
            className="
            /* 基本レイアウト */
            flex w-[176px] h-[54px] min-h-[36px] items-center justify-center 
            px-[16px] py-[8px] gap-[8px] 
            rounded-l-xl rounded-r-none text-[14px] font-medium
            
            /* デフォルト（未選択）状態 */
            bg-[#00588C] text-white border border-[#002B45]
            "
          >
            持ち物
          </Link>
          <Link
            to="/usa/reviews"
            className="
            /* 1.基本レイアウト */
            flex w-[176px] h-[54px] min-h-[36px] items-center justify-center 
            px-[16px] py-[8px] gap-[8px] 
            rounded-r-xl rounded-l-none text-[14px] font-medium
            
            /* デフォルト（未選択）状態 */
            bg-[#FAF6F0] text-[#002B45] border border-[#002B45]
            "
          >
            口コミ
          </Link>
        </div>
        <div>
          <div className="text-[#002B45] text-[16px] bg-[#A8C9DE] my-[10px] ">
            日本国籍の方が、観光または商用目的でアメリカへ渡航する場合、ビザ免除プログラム（WWP）に基づき、以下の条件を満たすことで最大90日間の無査証（ビザなし）滞在が可能です。
          </div>
          <TitleFrame
            title="必要書類"
            date="更新日時　2026/3/24"
            superivisor=""
          />
          {itemList.map((item) => (
            <div
              key={item.name}
              className="bg-[#A8C9DE] mx-[8px] my-[16px] rounded-sm"
            >
              {item.path ? (
                <Link to={item.path}>
                  <div className="text-[#002B45] text-[14px] py-[16px] pr-[12px] pl-[5px]">
                    <span className="font-bold">・{item.name}： </span>
                    <span>{item.content}</span>
                  </div>
                </Link>
              ) : (
                <div className="text-[#002B45] text-[14px] py-[16px] pr-[12px] pl-[5px]">
                  <span className="font-bold">・{item.name}： </span>
                  <span>{item.content}</span>
                </div>
              )}
            </div>
          ))}
          <ContactRequestButton />
        </div>
      </div>
    </HeaderLayout>
  );
};
