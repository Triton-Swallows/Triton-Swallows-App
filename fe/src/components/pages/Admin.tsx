import { HeaderLayout } from "../templetes/HeaderLayout";
import { TitleFrame } from "../atoms/TitleFrame";
import { SummaryFrameDetail } from "../atoms/SummaryFrameDetail";
import { HeaderNav } from "../molecules/HeaderNav";

export const Admin = () => {
  return (
    <HeaderLayout>
      <HeaderNav path={"/"} label="トップページ" title="管理者ページ" />
      <section>
        <TitleFrame title="ユーザー情報" date="" superivisor="" />
        <SummaryFrameDetail
          contents="こちら現在開発中になっております。しばらくお待ちください"
          notes=""
        />
      </section>
    </HeaderLayout>
  );
};
