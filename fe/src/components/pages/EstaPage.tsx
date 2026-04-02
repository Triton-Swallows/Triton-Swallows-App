import { useEffect, useState } from "react";
import { HeaderLayout } from "../templetes/HeaderLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TitleFrame } from "../atoms/TitleFrame";
import { SummaryFrameDetail } from "../atoms/SummaryFrameDetail";
import apiClient from "@/config/apiClient";
import { HeaderNav } from "../molecules/HeaderNav";
import { ContactRequestButton } from "@/components/organisms/dialogs/ContactRequestButton";
import { GeminiChatLauncher } from "../organisms/layout/GeminiChatLauncher";

export const EstaPage = () => {
  const urlList = [
    {
      title: "ESTA公式サイト（在日米国大使館）",
      url: "https://jp.usembassy.gov/ja/visas-ja/esta-information-ja/",
    },
    {
      title: "アメリカ合衆国連邦政府(Wikipedia)",
      url: "https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%A1%E3%83%AA%E3%82%AB%E5%90%88%E8%A1%86%E5%9B%BD%E9%80%A3%E9%82%A6%E6%94%BF%E5%BA%9C",
    },
    {
      title: "ivisa",
      url: "https://www.ivisa.com/ja/united-states/ppc-lp/us-esta?cb=true&utm_source=google&utm_medium=cpc&utm_campaign=22518283851&utm_term=%E5%90%88%E8%A1%86%E5%9B%BD%20esta%20%E7%94%B3%E8%AB%8B&utm_content=181874013729&ivclid=Cj0KCQjwj47OBhCmARIsAF5wUEGvlO_sMG8ziSelffz6jPmt8QcQ7bpl-u8gxOHQapzr6K0go105470aArsoEALw_wcB&gad_source=1&gad_campaignid=22518283851&gbraid=0AAAAA9l3HaaWDGYqkAWKxaPRfIZn-COXb&gclid=Cj0KCQjwj47OBhCmARIsAF5wUEGvlO_sMG8ziSelffz6jPmt8QcQ7bpl-u8gxOHQapzr6K0go105470aArsoEALw_wcB",
    },
    {
      title: "JAL ABC ESTA（エスタ）電子渡航認証システムとは何ですか？",
      url: "https://www.jalabc.com/faq/esta_service/faq_detail01.html",
    },
  ];

  const [thumbnails, setThumbnails] = useState<
    { image: string | null; domain: string }[]
  >([]);

  useEffect(() => {
    const fetchThumbnails = async () => {
      const results = await Promise.all(
        urlList.map(({ url }) =>
          apiClient
            .post("/thumbnail", { url })
            .then((res) => ({
              image: res.data.ogImage?.[0]?.url ?? null,
              domain: new URL(url).hostname,
            }))
            .catch(() => ({
              image: null,
              domain: new URL(url).hostname,
            })),
        ),
      );
      setThumbnails(results);
    };
    fetchThumbnails();
  }, []);

  return (
    <HeaderLayout>
      <HeaderNav
        path={"/usa/packing-list"}
        label="持ち物/口コミ"
        title="アメリカ（米国）"
      />
      <section>
        <TitleFrame
          title="ESTAとは:"
          date="2026年3月24日"
          superivisor="監修：Robert&Enrique"
        />
        <SummaryFrameDetail
          contents="ESTA（エスタ）は、アメリカへ短期旅行するための電子渡航認証システムです

対象：ビザ免除プログラム対象国の旅行者
有効期間：2年間
滞在期間：90日以内
"
          notes="※ESTAが却下された場合、ビザ申請が必要になります。"
        />
      </section>
      <section>
        <TitleFrame title="申請方法:" date="" superivisor="" />
        <Accordion
          type="multiple"
          className="rounded-2xl has-[[data-state=open]]:rounded-b-none overflow-hidden my-3 mx-3 space-y-0.5"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="rounded-none bg-[#A8C9DE] data-[state=open]:bg-[#2D8AB7] text-[14px] leading-[22px] px-4 py-4 hover:no-underline">
              1. 公式サイトにアクセス
            </AccordionTrigger>
            <AccordionContent className="bg-[#FAF6F0] text-[14px] leading-[22px] px-4 py-4">
              ESTAの申請は 公式サイトからのみ 行えます。
              <br />
              模倣サイトに注意してください。 <br />
              <br />
              公式サイト
              <br />
              https://esta.cbp.dhs.gov/
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="rounded-none bg-[#A8C9DE] data-[state=open]:bg-[#2D8AB7] text-[14px] leading-[22px] px-4 py-4 hover:no-underline">
              2. 新しい申請を開始
            </AccordionTrigger>
            <AccordionContent className="bg-[#FAF6F0] text-[14px] leading-[22px] px-4 py-4">
              トップページで
              <br />
              「New Application」を選択します。
              <br />
              <br />
              そのあと次のどちらかを選びます： <br />
              Individual Application（個人申請）
              <br /> Group Application（グループ申請）
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="rounded-none bg-[#A8C9DE] data-[state=open]:bg-[#2D8AB7] text-[14px] leading-[22px] px-4 py-4 hover:no-underline">
              3. パスポート情報を入力
            </AccordionTrigger>
            <AccordionContent className="bg-[#FAF6F0] text-[14px] leading-[22px] px-4 py-4">
              以下の情報を入力します：
              <br /> ・パスポート番号
              <br /> ・発行国 <br />
              ・有効期限
              <br />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="rounded-none bg-[#A8C9DE] data-[state=open]:bg-[#2D8AB7] text-[14px] leading-[22px] px-4 py-4 hover:no-underline">
              4. 個人情報を入力
            </AccordionTrigger>
            <AccordionContent className="bg-[#FAF6F0] text-[14px] leading-[22px] px-4 py-4">
              以下の情報を入力します：
              <br /> ・名前 <br />
              ・生年月日 <br />
              ・国籍 <br />
              ・住所
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="rounded-none bg-[#A8C9DE] data-[state=open]:bg-[#2D8AB7] text-[14px] leading-[22px] px-4 py-4 hover:no-underline">
              5. 旅行情報を入力
            </AccordionTrigger>
            <AccordionContent className="bg-[#FAF6F0] text-[14px] leading-[22px] px-4 py-4">
              以下の情報を入力します：
              <br /> ・アメリカでの滞在先
              <br /> ・アメリカでの連絡先
              <br />
              <br /> ※ 未定の場合でも申請できる場合があります。
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger className="rounded-none bg-[#A8C9DE] data-[state=open]:bg-[#2D8AB7] text-[14px] leading-[22px] px-4 py-4 hover:no-underline">
              6. 質問に回答
            </AccordionTrigger>
            <AccordionContent className="bg-[#FAF6F0] text-[14px] leading-[22px] px-4 py-4">
              以下のような質問に回答します：
              <br /> ・健康に関する質問 <br />
              ・犯罪歴
              <br /> ・過去の入国履歴
              <br />
              <br /> すべて 正確に回答 してください。
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger className="rounded-none bg-[#A8C9DE] data-[state=open]:bg-[#2D8AB7] text-[14px] leading-[22px] px-4 py-4 hover:no-underline">
              7. 申請料金を支払う
            </AccordionTrigger>
            <AccordionContent className="bg-[#FAF6F0] text-[14px] leading-[22px] px-4 py-4">
              申請料金：40ドル <br />
              <br />
              クレジットカードなどで支払いを行います。
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-8">
            <AccordionTrigger className="rounded-none bg-[#A8C9DE] data-[state=open]:bg-[#2D8AB7] text-[14px] leading-[22px] px-4 py-4 hover:no-underline">
              8. 申請を送信
            </AccordionTrigger>
            <AccordionContent className="bg-[#FAF6F0] text-[14px] leading-[22px] px-4 py-4">
              入力内容を確認し、
              <br /> 申請を送信します。 <br />
              <br />
              平均所要時間：約20分
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-9">
            <AccordionTrigger className="rounded-none bg-[#A8C9DE] data-[state=open]:bg-[#2D8AB7] text-[14px] leading-[22px] px-4 py-4 hover:no-underline">
              9. ステータスを確認
            </AccordionTrigger>
            <AccordionContent className="bg-[#FAF6F0] text-[14px] leading-[22px] px-4 py-4">
              申請後、結果は次の3つです： <br />
              <br />
              ・承認 (Approved)
              <br /> ・審査中 (Pending)
              <br /> ・却下 (Denied)
              <br />
              <br /> ESTAが却下された場合、
              <br />
              <br /> ビザ申請が必要になります。
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <ContactRequestButton buttonLabel="情報の追加を依頼する" />

      <section>
        <TitleFrame
          title="参考サイト"
          date="更新日時 2026/03/20"
          superivisor=""
        />
        <br />
        <div className="grid grid-cols-2 gap-10 mt-3 mb-3 mx-4">
          {urlList.map(({ title, url }, index) => (
            <a
              key={index}
              href={url}
              target="_blank"
              className="block rounded-lg shadow-md overflow-hidden hover:opacity-75"
            >
              {thumbnails[index]?.image ? (
                <img
                  src={thumbnails[index].image}
                  alt={title}
                  className="w-full aspect-video object-cover"
                />
              ) : (
                <div className="w-full aspect-video bg-gray-200" />
              )}
              <div className="p-2">
                <p className="text-sm font-semibold truncate">{title}</p>
                <p className="text-xs text-gray-500 truncate">
                  {thumbnails[index]?.domain ?? new URL(url).hostname}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>
      <GeminiChatLauncher />
    </HeaderLayout>
  );
};
