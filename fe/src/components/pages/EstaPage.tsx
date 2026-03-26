import { useState, useEffect } from "react";
import { HeaderLayout } from "../templetes/HeaderLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TitleFrame } from "../atoms/TitleFrame";
import apiClient from "@/config/apiClient";
import { HeaderNav } from "../molecules/HeaderNav";

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
        <p>
          ESTA（エスタ）は、アメリカへ短期旅行するための電子渡航認証システムです。
          <br />
          <br />
          対象：ビザ免除プログラム対象国の旅行者
          <br />
          有効期間：2年間
          <br />
          滞在期間：90日以内
        </p>
      </section>
      <section>
        <TitleFrame title="申請方法:" date="" superivisor="" />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>1. 公式サイトにアクセス</AccordionTrigger>
            <AccordionContent>TBD</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>2. 新しい申請を開始</AccordionTrigger>
            <AccordionContent>TBD</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>3. パスポート情報を入力</AccordionTrigger>
            <AccordionContent>TBD</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>4. 個人情報を入力</AccordionTrigger>
            <AccordionContent>TBD</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>5. 旅行情報を入力</AccordionTrigger>
            <AccordionContent>TBD</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>6. 質問に回答</AccordionTrigger>
            <AccordionContent>TBD</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger>7. 申請料金を支払う</AccordionTrigger>
            <AccordionContent>TBD</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-8">
            <AccordionTrigger>8. 申請を送信</AccordionTrigger>
            <AccordionContent>TBD</AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      <section>
        <TitleFrame title="参考サイト" date="" superivisor="" />
        <br />
        更新日時 2026/03/20
        <div className="grid grid-cols-2 gap-3 mt-3">
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
    </HeaderLayout>
  );
};
