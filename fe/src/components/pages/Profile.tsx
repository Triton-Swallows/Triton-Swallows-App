import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { HeaderNav } from "../molecules/HeaderNav";
import { AuthContextConsumer } from "@/contexts/AuthContexts";
import defalutlProfileIcon from "../../assets/UserIcon.png";
import { Button } from "../ui/button";
import { EditProfileDialog } from "../organisms/dialogs/EditProfileDialog";
import {
  RiHeartFill,
  RiMessage2Line,
  RiStarSmileLine,
  RiGiftLine,
} from "react-icons/ri";

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
      <div className="mx-auto flex w-full max-w-[320px] flex-col items-center px-3 pb-10 pt-4 text-[#002B45]">
        <div className="flex flex-col items-center gap-3 text-center">
          <div>
            <img
              src={userInfo?.icon_url || defalutlProfileIcon}
              alt="プロフィールアイコン"
              className="h-40 w-40 rounded-full object-cover"
            />
          </div>
          <div className="mt-1 text-base font-medium leading-5">
            <p>{userInfo?.user_name}</p>
          </div>
          <div className="text-base font-normal leading-6">
            <p>{userInfo?.email}</p>
          </div>
          <div className="mt-1 flex justify-center">
            <EditProfileDialog user={userInfo} onUpdate={refreshUserInfo} />
          </div>
        </div>

        <div className="mt-7 flex w-full py-1 items-stretch overflow-hidden rounded-[5px] bg-[#EAFBFA] shadow-[0px_1px_2px_rgba(0,0,0,0.18)] text-center">
          <div className="flex flex-1 flex-col items-center justify-between px-2 py-2">
            <RiHeartFill className="text-[30px] text-[#c6422f] mb-2 " />
            <label className="text-xs font-medium leading-4">いいね数</label>
            <p className="text-[16px] font-medium leading-6">
              {userInfo?.total_like_count}
            </p>
          </div>
          <div className="my-auto h-[72px] w-px bg-[#00588C]" />
          <div className="flex flex-1 flex-col items-center justify-between px-2 py-2">
            <RiMessage2Line className="text-[30px] text-[#2da7b2] mb-2 " />
            <label className="text-xs font-medium leading-4">口コミ数</label>
            <p className="text-[16px] font-medium leading-6">
              {userInfo?.review_count}
            </p>
          </div>
          <div className="my-auto h-[72px] w-px bg-[#00588C]" />
          <div className="flex flex-1 flex-col items-center justify-between px-2 py-2">
            <RiStarSmileLine className="text-[30px] text-[#f0b400] mb-2 " />
            <label className="text-xs font-medium leading-4">
              累計ポイント
            </label>
            <p className="text-[16px] font-medium leading-6">
              {userInfo?.total_point} pt
            </p>
          </div>
        </div>

        <p className="mt-3 w-full text-left text-[14px] font-medium leading-8 tracking-[-0.01em]">
          Triton ポイント
        </p>
        <div className="mt-1 w-full rounded-[5px] bg-[#EAFBFA] px-2 py-1">
          <div className="mt-4 flex w-full items-end justify-between border-b border-[#737373] pb-1 text-[14px] font-medium leading-5">
            <label>残高</label>
            <p>{userInfo?.my_point}pt</p>
          </div>
          <div className="mt-2 flex w-full items-end justify-between pb-1 text-[14px] font-medium leading-5">
            <label>累計</label>
            <p>{userInfo?.total_point}pt</p>
          </div>
          <div className="mt-2 mb-2 flex w-full items-end justify-between border-b border-[#737373] pb-1 text-[14px] font-medium leading-5">
            <label>消費</label>
            <p className="text-[#e58a67]">-{userInfo?.consume_point}pt</p>
          </div>

          <p className="text-center text-[12px] font-medium leading-5">
            Amazonギフト券に交換できます！
          </p>
          <Link
            to="https://docs.google.com/forms/d/e/1FAIpQLSd5tk2-KA1i5D4tYjSJJHyfcKO-lqfUy5-zysPJypNXgktEQw/viewform"
            target="_blank"
            className="mt-1 block"
          >
            <Button
              type="button"
              className="w-full px-5 py-5 rounded-lg bg-[#00588C] text-[14px] text-[#FAFAFA] hover:bg-[#004b77]"
              disabled={!loginUser || loading}
            >
              <RiGiftLine className="text-[20px]" />
              Amazonギフト券に交換する
            </Button>
          </Link>
        </div>

        <Button
          type="button"
          className="mt-3 h-10 rounded-lg bg-[#00588C] px-4 text-[16px] text-[#FAF6F0] hover:bg-[#004b77]"
          disabled={!loginUser || loading}
          onClick={handleLogout}
        >
          ログアウト
        </Button>
      </div>
    </HeaderLayout>
  );
};
