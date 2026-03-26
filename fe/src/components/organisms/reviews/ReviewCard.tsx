import { RiHeartFill, RiHeartLine, RiUser3Line } from "react-icons/ri";
import { AuthContextConsumer } from "@/contexts/AuthContexts";

type Props = {
  user_name: string;
  user_icon: string;
  review_id: number;
  review: string;
  like_count: number;
  created_at: string;
  liked_by_me: boolean;
  onToggleLike: (review_id: number, liked_by_me: boolean) => void;
};

export const ReviewCard: React.FC<Props> = ({
  user_name,
  user_icon,
  review_id,
  review,
  like_count,
  created_at,
  liked_by_me,
  onToggleLike,
}) => {
  const { loginUser } = AuthContextConsumer();

  const date = new Date(created_at);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const yyyymmdd = `${y}年${m}月${d}日`;

  return (
    <div className="bg-[#A8C9DE] my-[16px] p-[4px] rounded">
      <div className="grid grid-cols-3 items-center px-[4px]">
        <div className="flex items-center py-1">
          {/* TODO: 本来以下は {user_icon !== "" ? <img src={user_icon} /> : <RiUser3Line />}*/}
          {user_icon !== "" ? (
            <RiUser3Line className="text-xl" />
          ) : (
            <RiUser3Line className="text-xl" />
          )}
          {/* TODO: 本来以下は <p>{user_name}</p> */}
          <p>{user_name !== "" ? "user_name_here" : "user_name_here"}</p>
        </div>
        <div className="text-center">
          <time className="relative top-[4px] text-[10px]">{yyyymmdd}</time>
        </div>
        <div className="flex justify-end gap-2">
          <span>{like_count}</span>
          <button
            className={`flex items-center ${!!loginUser ? "cursor-pointer" : "cursor-not-allowed"}`}
            onClick={() => onToggleLike(review_id, liked_by_me)}
            disabled={!loginUser}
          >
            {liked_by_me ? <RiHeartFill /> : <RiHeartLine />}
          </button>
        </div>
      </div>
      <div className="bg-white py-[20px] px-[8px] rounded-sm">
        <p>{review}</p>
      </div>
    </div>
  );
};
