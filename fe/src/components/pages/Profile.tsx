import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { HeaderNav } from "../molecules/HeaderNav";
import { AuthContextConsumer } from "@/contexts/AuthContexts";
import defalutlProfileIcon from "../../assets/UserIcon.png";
import { Button } from "../ui/button";
import { EditProfileDialog } from "../organisms/dialogs/EditProfileDialog";

export const Profile = () => {
  const { loginUser, loading, userInfo, logout, refreshUserInfo } =
    AuthContextConsumer();
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("ログアウトに失敗しました。", error);
    }
  };

  useEffect(() => {
    refreshUserInfo();
  }, []);

  return (
    <HeaderLayout>
      <HeaderNav path={"/"} label="トップページ" title="プロフィール" />
      {/* プロフィール画像 */}
      <div>
        <label>プロフィール画像</label>
        <img
          src={userInfo?.icon_url || defalutlProfileIcon}
          alt="プロフィールアイコン"
          className="w-[120px] h-[120px] rounded-full"
        />
      </div>
      {/* ユーザー情報 */}
      <div className="flex gap-[10px]">
        <label>アカウント名:</label>
        <p>{userInfo?.user_name}</p>
      </div>
      <div className="flex gap-[10px]">
        <label>メールアドレス:</label>
        <p>{userInfo?.email}</p>
      </div>
      <div className="flex gap-[10px]">
        <label>口コミ投稿数:</label>
        <p>{userInfo?.review_count}</p>
      </div>
      <div className="flex gap-[10px]">
        <label>累計いいね数:</label>
        <p>{userInfo?.total_like_count}</p>
      </div>
      <div className="flex gap-[10px]">
        <label>累計ポイント数:</label>
        <p>{userInfo?.total_point} pt</p>
      </div>
      <div className="flex gap-[10px]">
        <label>消費ポイント:</label>
        <p>{userInfo?.consume_point} pt</p>
      </div>
      <div className="flex gap-[10px]">
        <label>残高:</label>
        <p>{userInfo?.my_point} pt</p>
      </div>

      <Button
        type="button"
        className="bg-[#00588C] text-[#FAF6F0] text-[14px] py-[8px] px-[16px]"
        disabled={!loginUser || loading}
        onClick={handleLogout}
      >
        ログアウト
      </Button>

      <Link
        to="https://docs.google.com/forms/d/e/1FAIpQLSd5tk2-KA1i5D4tYjSJJHyfcKO-lqfUy5-zysPJypNXgktEQw/viewform"
        target="_blank"
      >
        <Button
          type="button"
          className="bg-[#00588C] text-[#FAF6F0] text-[14px] py-[8px] px-[16px]"
          disabled={!loginUser || loading}
        >
          ポイントをAmazonギフト券に交換
        </Button>
      </Link>

      <EditProfileDialog user={userInfo} onUpdate={refreshUserInfo} />
    </HeaderLayout>
  );
};
