import { RiHeartFill, RiHeartLine } from "react-icons/ri";

type Props = {
  review_id: number;
  review: string;
  count: number;
  created_at: string;
  liked_by_me: boolean;
  onToggleLike: (review_id: number, liked_by_me: boolean) => void;
};

export const ReviewSummaryCard: React.FC<Props> = ({
  review_id,
  review,
  count,
  created_at,
  liked_by_me,
  onToggleLike,
}) => {
  return (
    <>
      <div key={review_id} className="flex items-center justify-between border">
        <p>{review}</p>
        <div className="flex items-center gap-6">
          <button
            className="flex items-center cursor-pointer"
            onClick={() => onToggleLike(review_id, liked_by_me)}
          >
            {liked_by_me ? <RiHeartFill /> : <RiHeartLine />}
            <span>{count}</span>
          </button>
          <time>{created_at}</time>
        </div>
      </div>
    </>
  );
};
