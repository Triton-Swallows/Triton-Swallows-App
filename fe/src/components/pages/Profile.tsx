import { useState, useEffect } from "react";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { HeaderNav } from "../molecules/HeaderNav";
import apiClient from "@/config/apiClient";
import { AuthContextConsumer } from "@/contexts/AuthContexts";
import topPageImage from "../../assets/TopPageImage.jpg";

type User = {
  user_id: string;
  user_name: string;
  email: string;
  icon_url: string;
  review_count: number; //累計投稿数
  like_count: number; //累計いいね
  approved_count: number; //累計google forms採用数
  point: number; //累計ポイント数
};

// TODO: ログイン状態でないとこのページは表示できません

export const Profile = () => {
  const authContext = AuthContextConsumer();
  const [user, setUser] = useState<User | null>(null);

  const loginUser = authContext.loginUser;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!loginUser) return;
      try {
        // ログイン中の自分の情報（User）を取得
        const response = await apiClient.get<User>("/users/me");
        setUser(response.data);
      } catch (error) {
        console.error("ユーザー情報の取得に失敗しました。", error);
      }
    };
    fetchProfile();
  }, [loginUser]);

  // アカウント名（UUID）の8文字省略処理
  const displayId = user?.user_name || loginUser.uid;
  const shortName =
    displayId.length > 8 ? `${displayId.substring(0, 8)}...` : displayId;

  return (
    <HeaderLayout>
      <HeaderNav path={"/"} label="トップページ" title="プロフィール" />
      {/* プロフィール画像 */}
      <div>
        <label>プロフィール画像</label>
        <img
          src={user?.icon_url || topPageImage}
          alt="プロフィールアイコン"
          className="w-[120px] h-[120px] rounded-full"
        />
      </div>
      {/* ユーザー情報 */}
      <div className="flex gap-[10px]">
        <label>アカウント名:</label>
        <p>{user?.user_name || shortName || "名称未定"}</p>
      </div>
      <div className="flex gap-[10px]">
        <label>メールアドレス:</label>
        <p>{user?.email || "TBD"}</p>
      </div>
      <div className="flex gap-[10px]">
        <label>口コミ投稿数:</label>
        <p>{user?.review_count || "TBD"}</p>
      </div>
      <div className="flex gap-[10px]">
        <label>累計いいね数:</label>
        <p>{user?.like_count || "TBD"}</p>
      </div>
    </HeaderLayout>
  );
};
