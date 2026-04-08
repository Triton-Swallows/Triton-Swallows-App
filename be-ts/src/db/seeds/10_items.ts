import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("items").del();
  await knex("items").insert([
    {
      check_list_id: 1,
      item: "着替え",
    },
    {
      check_list_id: 1,
      item: "下着",
    },
    {
      check_list_id: 1,
      item: "上着",
    },
    {
      check_list_id: 1,
      item: "帽子・サングラス・日焼け止め",
    },
    {
      check_list_id: 1,
      item: "【夏】虫よけスプレー",
    },
    {
      check_list_id: 1,
      item: "【夏】水着・ビーチサンダル",
    },
    {
      check_list_id: 1,
      item: "カーディガン/ストール",
    },
    {
      check_list_id: 1,
      item: "セキュリティポーチ",
    },
    {
      check_list_id: 1,
      item: "スマホ",
    },
    {
      check_list_id: 1,
      item: "充電器",
    },
    {
      check_list_id: 2,
      item: "着替え（汚れてもいい服）",
    },
    {
      check_list_id: 2,
      item: "下着・靴下（多め）",
    },
    {
      check_list_id: 2,
      item: "防寒着（フリース・ダウン）",
    },
    {
      check_list_id: 2,
      item: "レインウェア",
    },
    {
      check_list_id: 2,
      item: "帽子・手袋",
    },
    {
      check_list_id: 2,
      item: "【夏】虫よけスプレー・ムヒ",
    },
    {
      check_list_id: 2,
      item: "【夏】サンダル",
    },
    {
      check_list_id: 2,
      item: "ヘッドライト・懐中電灯",
    },
    {
      check_list_id: 2,
      item: "スマホ（防水対策）",
    },
    {
      check_list_id: 2,
      item: "モバイルバッテリー",
    },

    {
      check_list_id: 3,
      item: "着替え（旅行日数分）",
    },
    {
      check_list_id: 3,
      item: "下着・靴下",
    },
    {
      check_list_id: 3,
      item: "上着（季節に応じて）",
    },
    {
      check_list_id: 3,
      item: "帽子・サングラス・日焼け止め",
    },
    {
      check_list_id: 3,
      item: "セキュリティポーチ",
    },
    {
      check_list_id: 3,
      item: "パスポート",
    },
    {
      check_list_id: 3,
      item: "財布・クレジットカード",
    },
    {
      check_list_id: 3,
      item: "スマートフォン",
    },
    {
      check_list_id: 3,
      item: "充電器・変換プラグ",
    },
    {
      check_list_id: 3,
      item: "常備薬・マスク",
    },
  ]);
}
