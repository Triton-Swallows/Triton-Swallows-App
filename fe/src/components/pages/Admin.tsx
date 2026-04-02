import { useEffect, useState } from "react";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { TitleFrame } from "../atoms/TitleFrame";
import { SummaryFrameDetail } from "../atoms/SummaryFrameDetail";
import { HeaderNav } from "../molecules/HeaderNav";
import { AuthContextConsumer } from "@/contexts/AuthContexts";
import apiClient from "@/config/apiClient";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";

type Info = {
  uid: string;
  email: string;
  user_name: string;
  icon_url: string;
  bonus_point: number;
  consume_point: number;
  review_count: number;
  total_like_count: number;
  accepted_count: number;
  total_point: number;
  my_point: number;
};

type AdminResponse = {
  data: Info[];
};

type Contacts = {
  id: number;
  user_id: string;
  email: string;
  target: string;
  description: string;
  others: string;
  is_checked: boolean;
  bonus_rate: number;
  created_at: string;
  updated_at: string;
};

type AdminResponseContacts = {
  data: Contacts[];
};

export const Admin = () => {
  const { loginUser, loading } = AuthContextConsumer();
  const [users, setUsers] = useState<Info[]>([]);
  const [contacts, setContacts] = useState<Contacts[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchData = async () => {
    if (loading) return;
    setIsFetching(true);
    setFetchError(null);
    try {
      const [response, contacts] = await Promise.all([
        apiClient.get<AdminResponse>("/admin"),
        apiClient.get<AdminResponseContacts>("/admin/contacts"),
      ]);
      setUsers(response.data.data);
      setContacts(contacts.data.data);
    } catch {
      setFetchError("情報の取得に失敗しました");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [loading, loginUser]);

  // 数値入力時のハンドラー (accepted_count, bonus_point, consume_point を編集可能にする)
  const handleInputChange = (uid: string, key: keyof Info, value: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.uid === uid ? { ...user, [key]: Number(value) || 0 } : user,
      ),
    );
  };

  const onClickSave = async (user: Info): Promise<void> => {
    try {
      await apiClient.patch("/admin/points", {
        uid: user.uid,
        bonus_point: user.bonus_point,
        consume_point: user.consume_point,
      });
    } catch (error) {
      console.error("エラー", error);
    }
  };

  return (
    <HeaderLayout>
      <HeaderNav path={"/"} label="トップページ" title="管理者ページ" />
      <section>
        <TitleFrame title="ユーザー情報" date="" superivisor="" />
        <SummaryFrameDetail
          contents="こちら現在開発中になっております。しばらくお待ちください"
          notes=""
        />
        {isFetching ? (
          <p className="text-center py-10">読み込み中...</p>
        ) : fetchError ? (
          <p className="text-center py-10 text-red-500">{fetchError}</p>
        ) : (
          <div className="mt-6 overflow-x-auto border rounded-md shadow-sm bg-white">
            <Table className="border-collapse">
              <TableHeader>
                {/* メインヘッダー */}
                <TableRow className="bg-blue-200 h-14">
                  <TableHead className="border text-center font-bold w-[250px]">
                    ユーザーメール
                  </TableHead>
                  <TableHead className="border text-center font-bold">
                    口コミに対するいいね数
                  </TableHead>
                  <TableHead className="border text-center font-bold">
                    いいね換算 (2pt)
                  </TableHead>
                  <TableHead className="border text-center font-bold">
                    記事採用数
                  </TableHead>
                  <TableHead className="border text-center font-bold">
                    記事換算 (10pt)
                  </TableHead>
                  <TableHead className="border text-center font-bold">
                    換算算出
                  </TableHead>
                  <TableHead className="border text-center font-bold">
                    初回投稿
                  </TableHead>
                  <TableHead className="border text-center font-bold">
                    使用ポイント
                  </TableHead>
                  <TableHead className="border text-center font-bold">
                    残高合計
                  </TableHead>
                  <TableHead className="border text-center font-bold">
                    保存
                  </TableHead>
                </TableRow>
                {/* ステータスヘッダー */}
                <TableRow className="bg-slate-600 text-[10px] text-white h-8">
                  <TableCell className="border text-center">編集不可</TableCell>
                  <TableCell className="border text-center">集計</TableCell>
                  <TableCell className="border text-center">自動算出</TableCell>
                  <TableCell className="border text-center">集計</TableCell>
                  <TableCell className="border text-center">自動算出</TableCell>
                  <TableCell className="border text-center">自動算出</TableCell>
                  <TableCell className="border text-center bg-blue-500">
                    編集可 (0&lt;=*)
                  </TableCell>
                  <TableCell className="border text-center bg-blue-500">
                    編集可 (0&gt;=*)
                  </TableCell>
                  <TableCell className="border text-center">自動算出</TableCell>
                  <TableCell className="border text-center"></TableCell>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.map((user) => {
                  // 計算ロジック
                  const likePoints = user.total_like_count * 2;
                  const articlePoints = user.accepted_count * 10;
                  const total = likePoints + articlePoints;
                  const myPoint = total + user.bonus_point - user.consume_point;

                  return (
                    <TableRow key={user.uid} className="hover:bg-slate-50">
                      <TableCell className="border text-xs truncate max-w-[200px]">
                        {user.email}
                      </TableCell>
                      <TableCell className="border text-center">
                        {user.total_like_count}
                      </TableCell>
                      <TableCell className="border text-center bg-blue-100">
                        {likePoints}pt
                      </TableCell>

                      {/* 記事採用数 */}
                      <TableCell className="border text-center">
                        {user.accepted_count}
                      </TableCell>

                      <TableCell className="border text-center bg-blue-100">
                        {articlePoints}pt
                      </TableCell>
                      <TableCell className="border text-center ">
                        {total}pt
                      </TableCell>

                      {/* 初回投稿（編集可） */}
                      <TableCell className="border p-0 w-24">
                        <input
                          type="number"
                          className="border-none text-center h-12 rounded-none font-bold"
                          value={user.bonus_point}
                          onChange={(e) =>
                            handleInputChange(
                              user.uid,
                              "bonus_point",
                              e.target.value,
                            )
                          }
                        />
                      </TableCell>

                      {/* 使用ポイント（編集可） */}
                      <TableCell className="border p-0 w-24">
                        <input
                          type="number"
                          className="border-none text-center h-12 rounded-none font-bold"
                          value={user.consume_point}
                          onChange={(e) =>
                            handleInputChange(
                              user.uid,
                              "consume_point",
                              e.target.value,
                            )
                          }
                        />
                      </TableCell>

                      {/* 合計ポイント */}
                      <TableCell className="border text-center font-bold text-2xl">
                        {myPoint.toLocaleString()}
                        <span className="text-xs ml-0.5 font-normal">pt</span>
                      </TableCell>
                      <TableCell className="border text-center font-bold">
                        <Button
                          className="bg-[#00588C] text-[#FAF6F0]"
                          onClick={() => onClickSave(user)}
                        >
                          保存
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
        <div className="mt-4"></div>
        <TitleFrame title="情報変更・追加申請情報" date="" superivisor="" />
        {isFetching ? (
          <p className="text-center py-10">読み込み中...</p>
        ) : fetchError ? (
          <p className="text-center py-10 text-red-500">{fetchError}</p>
        ) : (
          <div className="mt-6 overflow-x-auto border rounded-md shadow-sm bg-white">
            <Table className="border-collapse">
              <TableHeader>
                {/* メインヘッダー */}
                <TableRow className="bg-blue-200 h-14">
                  <TableHead className="border text-center font-bold">
                    ユーザーID
                  </TableHead>
                  <TableHead className="border text-center font-bold">
                    E-Mail
                  </TableHead>
                  <TableHead className="border text-center font-bold">
                    ターゲットページ
                  </TableHead>
                  <TableHead className="border text-center font-bold">
                    申請本文
                  </TableHead>
                  <TableHead className="border text-center font-bold">
                    その他
                  </TableHead>
                  <TableHead className="border text-center font-bold">
                    ボーナスレート
                  </TableHead>
                  <TableHead className="border text-center font-bold">
                    申請日
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {contacts.map((contact) => {
                  const date = new Date(contact.created_at);
                  const y = date.getFullYear();
                  const m = String(date.getMonth() + 1).padStart(2, "0");
                  const d = String(date.getDate()).padStart(2, "0");
                  const yyyymmdd = `${y}年${m}月${d}日`;
                  return (
                    <TableRow key={contact.id} className="hover:bg-slate-50">
                      <TableCell className="border text-xs truncate max-w-[200px]">
                        {contact.user_id}
                      </TableCell>
                      <TableCell className="border text-center">
                        {contact.email}
                      </TableCell>
                      <TableCell className="border text-center">
                        {contact.target}
                      </TableCell>
                      <TableCell className="border text-center">
                        {contact.description}
                      </TableCell>
                      <TableCell className="border text-center">
                        {contact.others}
                      </TableCell>
                      <TableCell className="border text-center">
                        {contact.bonus_rate}
                      </TableCell>
                      <TableCell className="border text-center ">
                        {yyyymmdd}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </section>
    </HeaderLayout>
  );
};
