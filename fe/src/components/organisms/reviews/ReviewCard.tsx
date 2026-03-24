import { RiHeartFill, RiUser3Line } from "react-icons/ri";

type Props = {
  user_name: string;
  user_icon: string;
  review_id: number;
  review: string;
  like: number;
  created_at: string;
};

export const ReviewCard: React.FC<Props> = ({
  user_name,
  user_icon,
  review_id,
  review,
  like,
  created_at,
}) => {
  return (
    <div key={review_id} className="border bg-[#A8C9DE] my-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center py-1">
          {user_icon !== "" ? <img src={user_icon} /> : <RiUser3Line />}
          <p>{user_name}</p>
        </div>
        <div className="flex items-center">
          <RiHeartFill />
          <span>{like}</span>
        </div>
      </div>
      <p>{review}</p>
      <time>{created_at}</time>
    </div>
  );
};
