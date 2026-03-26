type Props = {
  title: string;
  date: string | undefined;
  superivisor: string | undefined;
};

export const TitleFrame: React.FC<Props> = ({ title, date, superivisor }) => {
  return (
    <div className="text-[#FAF6F0] bg-[#2D8AB7] w-[393px] h-[48px] flex justify-between items-center">
      <div className="font-bold text-[20px] px-[8px]">{title}</div>
      <div className="flex-col self-start text-[10px] px-[8px]">
        <div className="justify-self-end">{date}</div>
        <div className="justify-self-end">{superivisor}</div>
      </div>
    </div>
  );
};
