import { Navigate } from "react-router-dom";
import { AuthContextConsumer } from "@/contexts/AuthContexts";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  children: React.ReactNode;
};

export const PrivateRoute: React.FC<Props> = ({
  children,
}): React.ReactNode => {
  const { loginUser, loading } = AuthContextConsumer();

  if (loading) {
    return (
      <div className="flex py-10 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!loginUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};
