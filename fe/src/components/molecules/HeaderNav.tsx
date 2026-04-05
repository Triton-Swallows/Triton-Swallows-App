import { BackIcon } from "../atoms/BackIcon";

type Props = {
  path: string;
  label: string;
  title: string;
};

export const HeaderNav: React.FC<Props> = ({ path, title }) => {
  return (
    <div className="flex mb-[16px] sticky top-[96px] z-10">
      <BackIcon path={path} />
      <div className="bg-[#F1F5F9] w-full flex items-center justify-center">
        <span className="justify-center font-bold text-[#002B45] text-[24px] p-[8px]">
          {title}
        </span>
      </div>
    </div>
  );
};
