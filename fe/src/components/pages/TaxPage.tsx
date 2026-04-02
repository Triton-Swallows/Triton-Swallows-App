import { HeaderLayout } from "../templetes/HeaderLayout";
import { TitleFrame } from "../atoms/TitleFrame";
import { SummaryFrameDetail } from "../atoms/SummaryFrameDetail";
import { HeaderNav } from "../molecules/HeaderNav";
import { ContactRequestButton } from "@/components/organisms/dialogs/ContactRequestButton";
import { GeminiChatLauncher } from "../organisms/layout/GeminiChatLauncher";

export const TaxPage = () => {
  return (
    <HeaderLayout>
      <HeaderNav
        path={"/usa/packing-list"}
        label="持ち物/口コミ"
        title="アメリカ（米国）"
      />
      <section>
        <TitleFrame title="税関申告書とは:" date="" superivisor="" />
        <SummaryFrameDetail
          contents="こちら現在開発中になっております。しばらくお待ちください"
          notes=""
        />
      </section>
      <ContactRequestButton buttonLabel="情報の追加を依頼する" bonusRate={10} />
      <GeminiChatLauncher />
    </HeaderLayout>
  );
};
