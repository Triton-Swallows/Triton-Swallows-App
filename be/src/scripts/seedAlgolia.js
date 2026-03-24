/**
 * Algolia index 初期データ投入スクリプト
 * 実行: node src/scripts/seedAlgolia.js
 *
 * .env に以下を設定してください:
 *   ALGOLIA_APP_ID=<your_app_id>
 *   ALGOLIA_ADMIN_API_KEY=<your_admin_api_key>
 */

require("dotenv").config();
const { algoliasearch } = require("algoliasearch");

const appId = process.env.ALGOLIA_APP_ID;
const adminApiKey = process.env.ALGOLIA_ADMIN_API_KEY;

if (!appId || !adminApiKey) {
  console.error(
    "ALGOLIA_APP_ID と ALGOLIA_ADMIN_API_KEY を .env に設定してください",
  );
  process.exit(1);
}

const client = algoliasearch(appId, adminApiKey);

const destinations = [
  {
    objectID: "usa",
    name: "アメリカ",
    nameEn: "United States",
    region: "北アメリカ",
    tags: ["英語圏", "ビザ免除(ESTA)"],
    packingListPath: "/usa/packing-list",
    description: "ESTA取得が必要なアメリカへの旅行準備",
  },
  {
    objectID: "uk",
    name: "イギリス",
    nameEn: "United Kingdom",
    region: "ヨーロッパ",
    tags: ["英語圏", "ETA"],
    packingListPath: null,
    description: "ロンドンを中心に文化・歴史が楽しめる旅行先",
  },
  {
    objectID: "france",
    name: "フランス",
    nameEn: "France",
    region: "ヨーロッパ",
    tags: ["シェンゲン協定"],
    packingListPath: null,
    description: "パリをはじめとするファッションと美食の国",
  },
  {
    objectID: "australia",
    name: "オーストラリア",
    nameEn: "Australia",
    region: "オセアニア",
    tags: ["英語圏", "ETA"],
    packingListPath: null,
    description: "自然とアウトドアアクティビティが豊富な旅行先",
  },
  {
    objectID: "thailand",
    name: "タイ",
    nameEn: "Thailand",
    region: "東南アジア",
    tags: ["ビザ不要(30日)", "リゾート"],
    packingListPath: null,
    description: "バンコクやパタヤなど多様な観光スポットがある旅行先",
  },
  {
    objectID: "italy",
    name: "イタリア",
    nameEn: "Italy",
    region: "ヨーロッパ",
    tags: ["シェンゲン協定"],
    packingListPath: null,
    description: "世界遺産が多く、食文化も豊かなヨーロッパの旅行先",
  },
  {
    objectID: "canada",
    name: "カナダ",
    nameEn: "Canada",
    region: "北アメリカ",
    tags: ["英語圏", "eTA"],
    packingListPath: null,
    description: "雄大な自然とアウトドアが楽しめる旅行先",
  },
  {
    objectID: "hawaii",
    name: "ハワイ",
    nameEn: "Hawaii",
    region: "北アメリカ",
    tags: ["英語圏", "ビザ免除(ESTA)", "リゾート"],
    packingListPath: null,
    description: "人気No.1リゾート地。ESTA取得でアメリカ本土と同様に入国可能",
  },
];

async function seedIndex() {
  const indexName = "destinations";

  console.log(`Algolia index "${indexName}" にデータを投入中...`);

  try {
    await client.saveObjects({
      indexName,
      objects: destinations,
      waitForTasks: true,
    });

    console.log(`✅ ${destinations.length} 件のデータを投入しました`);

    // 検索用の設定（searchableAttributes / アトリビュートの設定）
    await client.setSettings({
      indexName,
      indexSettings: {
        searchableAttributes: [
          "name",
          "nameEn",
          "region",
          "tags",
          "description",
        ],
        attributesForFaceting: ["region", "tags"],
      },
    });

    console.log("✅ インデックス設定を更新しました");
  } catch (err) {
    console.error("エラーが発生しました:", err.message);
    process.exit(1);
  }
}

seedIndex();
