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

  const timestamp = created_at;
  const date = new Date(timestamp);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const yyyymmdd = `${y}年${m}月${d}日`;

  return (
    <div className="flex items-center justify-between border bg-[#A8C9DE] my-1">
      <p>{summary}</p>
      <div className="flex items-center gap-6">
        <button
          className="flex items-center cursor-pointer"
          onClick={() => onToggleLike(summary_id, liked_by_me)}
          disabled={!loginUser}
        >
          {liked_by_me ? <RiHeartFill /> : <RiHeartLine />}
          <span>{like_count}</span>
        </button>
        <time>{yyyymmdd}</time>
      </div>
    </div>
  );
};
