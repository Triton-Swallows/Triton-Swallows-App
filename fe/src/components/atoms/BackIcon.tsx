import { useLocation, useNavigate } from "react-router-dom";
import { RiArrowLeftWideLine } from "react-icons/ri";

type Props = {
  path?: string;
};

export const BackIcon: React.FC<Props> = ({ path }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (path) {
      navigate(path);
      return;
    }

    if (location.key === "default") {
      navigate("/");
      return;
    }

    // history.stateでブラウザ履歴の残数を確認
    // navigate(-1)する前に、戻り先がアプリ内かチェック
    const historyState = window.history.state;
    const idx = historyState?.idx ?? 0;

    if (idx > 0) {
      // idxが0より大きければアプリ内に戻れる履歴がある
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-start w-[103px] h-[56px] px-[3px] py-[10px] justify-start rounded-r"
    >
      <RiArrowLeftWideLine className="text-4xl relative right-[10px]" />
    </button>
  );
};
