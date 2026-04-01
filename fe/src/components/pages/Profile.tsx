import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { HeaderNav } from "../molecules/HeaderNav";
import apiClient from "@/config/apiClient";
import { AuthContextConsumer } from "@/contexts/AuthContexts";
import defalutlProfileIcon from "../../assets/UserIcon.png";
import { Button } from "../ui/button";
import { EditProfileDialog } from "../organisms/dialogs/EditProfileDialog";

type User = {
  ud: string;
  user_name: string;
  email: string;
  icon_url: string;
  count: number; //累計投稿数
  total_like_count: number; //累計いいね
  total_point: number; //累計ポイント数
};

type ApiResponse<T> = {
  data: T;
};

export const Profile = () => {
  const { loginUser, loading, logout } = AuthContextConsumer();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    if (!loginUser) return;
    try {
      // ログイン中の自分の情報（User）を取得
      const response = await apiClient.get<ApiResponse<User>>("/users/me");
      const userData = response.data.data;
      setUser(userData);
    } catch (error) {
      console.error("ユーザー情報の取得に失敗しました。", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [loginUser]);

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("ログアウトに失敗しました。", error);
    }
  };

  return (
    <HeaderLayout>
      <HeaderNav path={"/"} label="トップページ" title="プロフィール" />
      {/* プロフィール画像 */}
      <div>
        <label>プロフィール画像</label>
        <img
          src={user?.icon_url || defalutlProfileIcon}
          alt="プロフィールアイコン"
          className="w-[120px] h-[120px] rounded-full"
        />
      </div>
      {/* ユーザー情報 */}
      <div className="flex gap-[10px]">
        <label>アカウント名:</label>
        <p>{user?.user_name}</p>
      </div>
      <div className="flex gap-[10px]">
        <label>メールアドレス:</label>
        <p>{user?.email}</p>
      </div>
      <div className="flex gap-[10px]">
        <label>口コミ投稿数:</label>
        <p>{user?.count}</p>
      </div>
      <div className="flex gap-[10px]">
        <label>累計いいね数:</label>
        <p>{user?.total_like_count}</p>
      </div>
      <div className="flex gap-[10px]">
        <label>累計ポイント数:</label>
        <p>{user?.total_point}</p>
      </div>
      <div className="flex gap-[10px]">
        <label>消費ポイント:</label>
        <p>TBD</p>
      </div>
      <div className="flex gap-[10px]">
        <label>残高:</label>
        <p>TBD</p>
      </div>

      <Button
        type="button"
        className="bg-[#00588C] text-[#FAF6F0] text-[14px] py-[8px] px-[16px]"
        disabled={!loginUser || loading}
        onClick={handleLogout}
      >
        ログアウト
      </Button>

      <EditProfileDialog user={user} onUpdate={fetchProfile} />
    </HeaderLayout>
  );
};
