import { HeaderLayout } from "../templetes/HeaderLayout";
import { TitleFrame } from "../atoms/TitleFrame";
import { SummaryFrameDetail } from "../atoms/SummaryFrameDetail";
import { ContactRequestButton } from "@/components/organisms/dialogs/ContactRequestButton";
import USHeaderImage from "../../assets/US_Header_pic.jpg";

export const TicketPage = () => {
  return (
    <HeaderLayout
      path={"/usa/packing-list"}
      title="アメリカ（米国）"
      showBackButton
      backgroundImage={USHeaderImage}
    >
      <section className="pt-[10px]">
        <TitleFrame title="航空券とは:" date="" superivisor="" />
        <SummaryFrameDetail
          contents="こちら現在、情報を集めております。 🎁今ならポイント10倍キャンペーン中🎁  先着採用順のため、早めの投稿をお願いいたします！"
          notes=""
        />
      </section>
      <ContactRequestButton buttonLabel="情報の追加を依頼する" bonusRate={10} />
    </HeaderLayout>
  );
};
