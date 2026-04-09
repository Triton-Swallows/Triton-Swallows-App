import { BackIcon } from "@/components/atoms/BackIcon";
import { AuthContextConsumer } from "@/contexts/AuthContexts";
import { Link } from "react-router-dom";
import userIcon from "../../../assets/UserIcon.png";
import { RiUser3Line } from "react-icons/ri";

type Props = {
  path?: string;
  title?: string;
  showBackButton?: boolean; // 戻るボタンを表示するかどうか
  transparent?: boolean; //背景透過用
  backgroundImage?: string; //背景画像URL用
};

export const Header: React.FC<Props> = ({
  path,
  title,
  showBackButton,
  transparent,
  backgroundImage,
}) => {
  const { loginUser, userInfo } = AuthContextConsumer();

  const headerStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0)), url(${backgroundImage})`,
        backgroundSize: "cover", //画像の縦横比を保ったまま表示エリアを隙間なく埋める
        backgroundPosition: "center", // 画像の中心をセンターに
      }
    : {};

  return (
    <header
      style={headerStyle}
      className={`fixed top-0 left-0 w-full h-[56px] flex items-center justify-between px-[15px] z-20
        ${transparent ? "bg-transparent text-white" : "bg-[#A8C9DE] text-white"}`}
    >
      {/* 左側の戻るボタン */}
      <div className="w-[10px]">
        {showBackButton ? <BackIcon path={path} /> : <div></div>}
      </div>
      {/*中央のタイトル */}
      <h1 className="text-[24px] font-bold p-[8px] text-white">{title}</h1>

      {/* 右側のユーザーアイコン */}
      <Link to={loginUser ? "/profile" : "/login"} className="flex justify-end">
        {!loginUser ? (
          <RiUser3Line className="w-[50px] h-[50px] rounded-full border-2" />
        ) : (
          <img
            src={userInfo?.icon_url || userIcon}
            alt="User Icon"
            className="w-[50px] h-[50px] rounded-full border-2"
          />
        )}
      </Link>
    </header>
  );
};
