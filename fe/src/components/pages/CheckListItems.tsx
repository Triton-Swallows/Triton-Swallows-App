import { useParams } from "react-router-dom";

export const CheckListItems = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <div>このページはチェックリストです。</div>
      マイリスト：{id}
    </>
  );
};
