import { RiHeartFill, RiHeartLine } from "react-icons/ri";

type Props = {
  review_id: number;
  review: string;
  like: number;
  created_at: string;
  isLiked: boolean;
  isLoggedIn: boolean;
  onToggleLike: (review_id: number) => void;
};

export const ReviewSummaryCard: React.FC<Props> = ({
  review_id,
  review,
  like,
  created_at,
  isLiked,
  isLoggedIn,
  onToggleLike,
}) => {
  return (
    <div
      key={review_id}
      className="flex items-center justify-between border bg-[#A8C9DE] my-1"
    >
      <p>{review}</p>
      <div className="flex items-center gap-6">
        <button
          className={`flex items-center gap-1 ${
            isLoggedIn ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          onClick={() => isLoggedIn && onToggleLike(review_id)}
          disabled={!isLoggedIn}
        >
          {isLiked ? <RiHeartFill /> : <RiHeartLine />}
          <span>{like}</span>
        </button>
        <time>{created_at}</time>
      </div>
    </div>
  );
};
