import { HeaderLayout } from "../templetes/HeaderLayout";
import { TitleFrame } from "../atoms/TitleFrame";
import { SummaryFrameDetail } from "../atoms/SummaryFrameDetail";
import { HeaderNav } from "../molecules/HeaderNav";
import { ContactRequestButton } from "@/components/organisms/dialogs/ContactRequestButton";

export const PassportPage = () => {
  return (
    <HeaderLayout>
      <HeaderNav
        path={"/usa/packing-list"}
        label="持ち物/口コミ"
        title="アメリカ（米国）"
      />
      <section>
        <TitleFrame title="パスポートとは:" date="" superivisor="" />
        <SummaryFrameDetail
          contents="こちら現在、情報を集めております。 🎁今ならポイント10倍キャンペーン中🎁  先着採用順のため、早めの投稿をお願いいたします！"
          notes=""
        />
      </section>
      <ContactRequestButton buttonLabel="情報の追加を依頼する" bonusRate={10} />
    </HeaderLayout>
  );
};
