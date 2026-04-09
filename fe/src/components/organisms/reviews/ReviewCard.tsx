import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import likeAnimation from "../../../assets/animation/Love Animation with Particle.json";
import defaultProfileIcon from "@/assets/UserIcon.png";

type Props = {
  user_name: string;
  icon_url: string;
  review_id: number;
  review: string;
  like_count: number;
  created_at: string;
  liked_by_me: boolean;
  onToggleLike: (review_id: number, liked_by_me: boolean) => void;
};

export const ReviewCard: React.FC<Props> = ({
  user_name,
  icon_url,
  review_id,
  review,
  like_count,
  created_at,
  liked_by_me,
  onToggleLike,
}) => {
  const date = new Date(created_at);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const yyyymmdd = `${y}年${m}月${d}日`;
  const profileIconSrc = icon_url?.trim() ? icon_url : defaultProfileIcon;
  const displayUserName =
    Array.from(user_name).length > 8
      ? `${Array.from(user_name).slice(0, 8).join("")}...`
      : user_name;

  const [showAnimation, setShowAnimation] = useState(false);

  const handleToggleLike = () => {
    if (!liked_by_me) {
      setShowAnimation(true);
    }
    onToggleLike(review_id, liked_by_me);
  };

  return (
    <div className="bg-[#A8C9DE] my-[16px] p-[4px] rounded-xl w-full min-w-[383px]">
      <div className="grid grid-cols-3 items-center px-[4px]">
        <div className="flex items-center py-1">
          <img
            src={profileIconSrc}
            className="h-10 w-10 rounded-full border border-[#FAFAFA] mr-1"
            onError={(e) => {
              e.currentTarget.src = defaultProfileIcon;
            }}
          />
          <p className="text-[#002B45] text-[12px] font-medium">
            {displayUserName}
          </p>
        </div>
        <div className="text-center">
          <time className="relative text-[14px] text-[#002B45] font-medium">
            {yyyymmdd}
          </time>
        </div>
        <div className="flex justify-end gap-2">
          <span className="text-[14px] text-[#002B45] font-bold pr-[4px]">
            {like_count}
          </span>
          <div className="relative flex items-center">
            {showAnimation && (
              <Player
                autoplay
                src={likeAnimation}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  height: "60px",
                  width: "60px",
                  zIndex: 1,
                  pointerEvents: "none",
                }}
                onEvent={(event) => {
                  if (event === "complete") {
                    setShowAnimation(false);
                  }
                }}
              />
            )}

            <button
              className="flex items-center cursor-pointer text-[#FF4055] "
              onClick={handleToggleLike}
            >
              {liked_by_me ? <RiHeartFill /> : <RiHeartLine />}
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#F1F5F9] py-[10px] px-[8px] rounded-4xl w-full">
        <p className="text-[#002B45] font-normal">{review}</p>
      </div>
    </div>
  );
};
