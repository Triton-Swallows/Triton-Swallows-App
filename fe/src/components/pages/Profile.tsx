import { useNavigate } from "react-router-dom";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { HeaderNav } from "../molecules/HeaderNav";
import { AuthContextConsumer } from "@/contexts/AuthContexts";
import { UserProfileContextConsumer } from "@/contexts/UserProfileContext";
import defalutlProfileIcon from "../../assets/UserIcon.png";
import { Button } from "../ui/button";
import { EditProfileDialog } from "../organisms/dialogs/EditProfileDialog";

export const Profile = () => {
  const { loginUser, loading, logout } = AuthContextConsumer();
  const { userProfile, refreshProfile } = UserProfileContextConsumer();
  const navigate = useNavigate();

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
          src={userProfile?.icon_url || defalutlProfileIcon}
          alt="プロフィールアイコン"
          className="w-[120px] h-[120px] rounded-full"
        />
      </div>
      {/* ユーザー情報 */}
      <div className="flex gap-[10px]">
        <label>アカウント名:</label>
        <p>{userProfile?.user_name}</p>
      </div>
      <div className="flex gap-[10px]">
        <label>メールアドレス:</label>
        <p>{userProfile?.email}</p>
      </div>
      <div className="flex gap-[10px]">
        <label>口コミ投稿数:</label>
        <p>{userProfile?.count}</p>
      </div>
      <div className="flex gap-[10px]">
        <label>累計いいね数:</label>
        <p>{userProfile?.total_like_count}</p>
      </div>
      <div className="flex gap-[10px]">
        <label>累計ポイント数:</label>
        <p>{userProfile?.total_point}</p>
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

      <EditProfileDialog user={userProfile} onUpdate={refreshProfile} />
    </HeaderLayout>
  );
};
