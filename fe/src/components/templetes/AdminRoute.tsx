import { Navigate } from "react-router-dom";
import { AuthContextConsumer } from "@/contexts/AuthContexts";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  children: React.ReactNode;
};

export const AdminRoute: React.FC<Props> = ({ children }): React.ReactNode => {
  const { loginUser, userInfo, loading } = AuthContextConsumer();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!loginUser || !userInfo?.is_admin) {
    return <Navigate to="/" replace />;
  }

  return children;
};
