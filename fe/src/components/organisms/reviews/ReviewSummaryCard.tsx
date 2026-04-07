import { useState } from "react";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { AuthContextConsumer } from "@/contexts/AuthContexts";
import { Player } from "@lottiefiles/react-lottie-player";
import likeAnimation from "../../../assets/animation/Love Animation with Particle.json";

type Props = {
  summary_id: number;
  summary: string;
  like_count: number;
  created_at: string;
  liked_by_me: boolean;
  onToggleLike: (summary_id: number, liked_by_me: boolean) => void;
};

export const ReviewSummaryCard: React.FC<Props> = ({
  summary_id,
  summary,
  like_count,
  created_at,
  liked_by_me,
  onToggleLike,
}) => {
  const { loginUser } = AuthContextConsumer();

  // 日付処理
  const timestamp = created_at;
  const date = new Date(timestamp);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const yyyymmdd = `${y}年${m}月${d}日`;

  const [showAnimation, setShowAnimation] = useState(false);

  const handleToggleLike = () => {
    if (!liked_by_me) {
      setShowAnimation(true);
    }
    onToggleLike(summary_id, liked_by_me);
  };

  return (
    <div className="flex flex-col justify-between border-b border-[#002B45]/10 last:border-b-0 my-1 mx-[5px]">
      <div className="my-[5px] mx-[10px]">
        <div>
          <p className="text-[#002B45] text-[14px]">{summary}</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <time className="text-[#002B45] text-[12px]">{yyyymmdd}</time>
          <div className="flex justify-end gap-[10px]">
            <span className="text-[#002B45] text-[16px] font-bold">
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
                className={`flex items-center text-[#AF301F] ${loginUser ? "cursor-pointer" : "cursor-not-allowed"}`}
                onClick={handleToggleLike}
                disabled={!loginUser}
              >
                {liked_by_me ? <RiHeartFill /> : <RiHeartLine />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
