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
    <div className="bg-[#A8C9DE] my-[16px] p-[4px] rounded">
      <div className="grid grid-cols-3 items-center px-[4px]">
        <div className="flex items-center py-1">
          <img
            src={profileIconSrc}
            className="h-10 rounded-full border border-[#FAFAFA] mr-1"
            onError={(e) => {
              e.currentTarget.src = defaultProfileIcon;
            }}
          />
          <p>{displayUserName}</p>
        </div>
        <div className="text-center">
          <time className="relative top-[4px] text-[10px]">{yyyymmdd}</time>
        </div>
        <div className="flex justify-end gap-2">
          <span>{like_count}</span>
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
              className="flex items-center cursor-pointer"
              onClick={handleToggleLike}
            >
              {liked_by_me ? <RiHeartFill color="red" /> : <RiHeartLine />}
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white py-[20px] px-[8px] rounded-sm">
        <p>{review}</p>
      </div>
    </div>
  );
};
