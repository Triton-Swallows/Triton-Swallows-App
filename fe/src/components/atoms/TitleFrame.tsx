import { RiVerifiedBadgeFill } from "react-icons/ri";

type Props = {
  title: string;
  date?: string;
  superivisor?: string;
  children?: React.ReactNode;
  badge?: boolean;
};

export const TitleFrame: React.FC<Props> = ({
  title,
  date,
  superivisor,
  children,
  badge,
}) => {
  return (
    <div className="text-[#FAF6F0] bg-[#2D8AB7] h-[48px] flex justify-between items-center">
      <div className="font-bold text-[20px] px-[8px]">{title}</div>
      <div className="flex-grow flex justify-end items-center">{children}</div>

      {(date || superivisor) && (
        <div className="flex-col self-start px-[8px] py-[5px] gap-[4px]">
          <div className="justify-self-end text-[12px]">{date}</div>
          <div className="justify-self-end gap-[6px] flex items-center text-[12px]">
            {badge ? (
              <RiVerifiedBadgeFill
                color="#FFB800"
                className="w-[20px] h-[20px]"
              />
            ) : (
              <></>
            )}
            {superivisor}
          </div>
        </div>
      )}
    </div>
  );
};
