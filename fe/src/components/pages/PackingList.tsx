import { Link } from "react-router-dom";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { TitleFrame } from "../atoms/TitleFrame";
import { AuthContextConsumer } from "@/contexts/AuthContexts";
import { HeaderNav } from "../molecules/HeaderNav";
import { PackingTabsNav } from "../molecules/PackingTabsNav";
import { Button } from "../ui/button";

type PackingItem = {
  name: string;
  content: string;
  path: string;
};

export const PackingList = () => {
  const { loginUser, loading } = AuthContextConsumer();

  const itemList: PackingItem[] = [
    {
      name: "パスポート",
      content: "残存期間は帰国日まで有効なもの。IC旅券(e-passport)であること。",
      path: "",
    },
    {
      name: "ESTA(エスタ)",
      content:
        "オンラインで申請。40ドル。渡航前(推奨72時間前)までに申請・承認が必要。",
      path: "/usa/packing-list/esta",
    },
    {
      name: "往復または次の目的地への航空券",
      content: "滞在終了時にアメリカを出国する航空券。",
      path: "",
    },
    {
      name: "税関申告書",
      content: "機内で配られる。またはデジタル(MCPアプリ等)で申請。",
      path: "",
    },
  ];

  return (
    <HeaderLayout>
      <HeaderNav
        path={"/country-list"}
        label="国リスト"
        title="アメリカ（米国）"
      />

      <div className="flex flex-col items-center justify-center gap-2">
        <PackingTabsNav />
        <div className="w-full text-sm outline-none">
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
          <div className="flex justify-center">
            <a
              href={
                !loginUser || loading
                  ? undefined
                  : "https://forms.gle/MvXjx6ckqDqsyGPT9"
              }
              target="_blank"
              className="flex justify-center w-[185px] h-[36px] mb-3"
            >
              <Button
                className="bg-[#00588C] rounded-xl text-[#FAF6F0] text-[14px] py-[8px] px-[16px] "
                disabled={!loginUser || loading}
              >
                情報変更を依頼する
              </Button>
            </a>
          </div>
        </div>
      </div>
    </HeaderLayout>
  );
};
