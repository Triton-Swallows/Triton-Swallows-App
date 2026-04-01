import { RiGraduationCapLine } from "react-icons/ri";

type FloatingScrollTopButtonProps = {
  onClick: () => void;
};

export const FloatingScrollTopButton = ({
  onClick,
}: FloatingScrollTopButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed right-3 bottom-3 z-[9999] flex items-center gap-1 rounded-full border border-white/50 bg-[#00588C] px-4 py-3 text-sm font-bold text-white"
    >
      <span className="flex h-8 w-8 items-center justify-center">
        <RiGraduationCapLine className="h-5 w-5" />
      </span>
      <span className="pr-1 tracking-[0.02em]">専門家に聞く</span>
    </button>
  );
};
