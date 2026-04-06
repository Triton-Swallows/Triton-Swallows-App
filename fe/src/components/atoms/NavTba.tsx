import { Link } from "react-router-dom";

type NavTabProps = {
  to: string;
  label: string;
  isActive?: boolean;
};

export const NavTab = ({ to, label, isActive }: NavTabProps) => {
  return (
    <Link
      to={to}
      className={`flex items-center justify-center text-[16px] font-bold rounded-xl px-[20px] h-[45px]
     ${isActive ? "bg-[#F1F5F9] text-[#002B45]" : "text-[#002B45]"}`}
    >
      {label}
    </Link>
  );
};
