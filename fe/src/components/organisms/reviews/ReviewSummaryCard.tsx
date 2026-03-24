import { RiHeartFill } from "react-icons/ri";

type Props = {
  review_id: number;
  review: string;
  like: number;
  created_at: string;
};

export const ReviewSummaryCard: React.FC<Props> = ({
  review_id,
  review,
  like,
  created_at,
}) => {
  return (
    <div
      key={review_id}
      className="flex items-center justify-between border bg-[#A8C9DE] my-1"
    >
      <p>{review}</p>
      <div className="flex items-center gap-6">
        <div className="flex items-center">
          <RiHeartFill />
          <span>{like}</span>
        </div>
        <time>{created_at}</time>
      </div>
    </div>
  );
};
