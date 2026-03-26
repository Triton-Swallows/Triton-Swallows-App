import { Link } from "react-router-dom";
import { RiHome3Line, RiUser3Line } from "react-icons/ri";
import { AuthContextConsumer } from "@/contexts/AuthContexts";

export const NavBar = () => {
  const { loginUser } = AuthContextConsumer();

  return (
    <>
      <header className="bg-[#00588C] text-white py-4 shadow-lg h-[96px] sticky top-0 z-10">
        <div className="flex justify-between items-center px-6">
          <Link to="/" className="text-xl font-bold hover:text-blue-100">
            <RiHome3Line className="w-[56px] h-[50px]" />
          </Link>

          {loginUser ? (
            <RiUser3Line className="w-[56px] h-[56px]" />
          ) : (
            <Link to="/login">
              <RiUser3Line className="w-[56px] h-[56px]" />
            </Link>
          )}
        </div>
      </header>
    </>
  );
};
