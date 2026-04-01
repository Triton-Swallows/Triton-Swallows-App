import { HeaderLayout } from "../templetes/HeaderLayout";
import { TitleFrame } from "../atoms/TitleFrame";
import { SummaryFrameDetail } from "../atoms/SummaryFrameDetail";
import { HeaderNav } from "../molecules/HeaderNav";

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
    </HeaderLayout>
  );
};
