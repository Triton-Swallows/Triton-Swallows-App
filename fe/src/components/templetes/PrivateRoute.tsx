import { Navigate } from "react-router-dom";
import { AuthContextConsumer } from "@/contexts/AuthContexts";

type Props = {
  children: React.ReactNode;
};

export const PrivateRoute: React.FC<Props> = ({
  children,
}): React.ReactNode => {
  const { loginUser, loading } = AuthContextConsumer();

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (!loginUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};
