import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { AuthContextConsumer } from "@/contexts/AuthContexts";

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
            <button
              className={`flex items-center text-[#AF301F] ${loginUser ? "cursor-pointer" : "cursor-not-allowed"}`}
              onClick={() => onToggleLike(summary_id, liked_by_me)}
              disabled={!loginUser}
            >
              {liked_by_me ? <RiHeartFill /> : <RiHeartLine />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
