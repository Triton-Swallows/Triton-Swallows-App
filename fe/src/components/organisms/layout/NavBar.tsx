import { Link } from "react-router-dom";
import { RiHome3Line, RiUser3Line } from "react-icons/ri";
import { AuthContextConsumer } from "@/contexts/AuthContexts";
import userIcon from "../../../assets/UserIcon.png";

export const NavBar = () => {
  const { loginUser, userInfo } = AuthContextConsumer();

  return (
    <>
      <header className="bg-[#00588C] text-white py-4 shadow-lg h-[96px] sticky top-0 z-20">
        <div className="flex justify-between items-center px-6">
          <Link to="/" className="text-xl font-bold hover:text-blue-100">
            <RiHome3Line className="w-[56px] h-[50px]" />
          </Link>

          {loginUser ? (
            // <RiUser3Line className="w-[56px] h-[56px]" />
            <Link to="/profile">
              <img
                src={userInfo?.icon_url || userIcon}
                alt="User Icon"
                className="w-[56px] h-[56px] rounded-full"
              />
            </Link>
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
