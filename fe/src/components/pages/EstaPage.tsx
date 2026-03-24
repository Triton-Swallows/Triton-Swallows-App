import { HeaderLayout } from "../templetes/HeaderLayout";
import { BackIcon } from "../atoms/BackIcon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const EstaPage = () => {
  return (
    <HeaderLayout>
      <BackIcon path={"/usa/packing-list"} label="TBD" />
      <h2>アメリカ（米国）：ESTA（エスタ）</h2>
      <div>概要</div>
      <section>
        ESTAとは：
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
        申請方法：
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
        参考サイト:
        <p>
          <a
            href="https://jp.usembassy.gov/ja/visas-ja/esta-information-ja/"
            target="_blank"
          >
            ESTA Official
            https://jp.usembassy.gov/ja/visas-ja/esta-information-ja/
          </a>
        </p>
      </section>
    </HeaderLayout>
  );
};
