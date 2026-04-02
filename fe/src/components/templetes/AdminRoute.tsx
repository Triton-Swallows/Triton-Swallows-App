import { Navigate } from "react-router-dom";
import { AuthContextConsumer } from "@/contexts/AuthContexts";

type Props = {
  children: React.ReactNode;
};

export const AdminRoute: React.FC<Props> = ({ children }): React.ReactNode => {
  const { loginUser, userInfo, loading } = AuthContextConsumer();

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (!loginUser || !userInfo?.is_admin) {
    return <Navigate to="/" replace />;
  }

  return children;
};
