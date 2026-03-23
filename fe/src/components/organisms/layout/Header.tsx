import { Link } from "react-router-dom";
import { RiHome3Line, RiUser3Line } from "react-icons/ri";
import { AuthContextConsumer } from "@/contexts/AuthContexts";

export const Header = () => {
  const { loginUser } = AuthContextConsumer();

  return (
    <>
      <header className="bg-blue-500 text-white py-4 shadow-lg">
        <div className="flex justify-between items-center px-6">
          <Link to="/" className="text-xl font-bold hover:text-blue-100">
            <RiHome3Line />
          </Link>

          {loginUser ? (
            <RiUser3Line />
          ) : (
            <Link to="/login">
              <RiUser3Line />
            </Link>
          )}
        </div>
      </header>
    </>
  );
};
