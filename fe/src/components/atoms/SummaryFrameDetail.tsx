type Props = {
  contents: string;
  notes: string;
};

export const SummaryFrameDetail: React.FC<Props> = ({ contents, notes }) => {
  return (
    <div className="flex flex-col gap-[10px] p-[10px] bg-[#FAF6F0] text-[16px] leading-[26px] whitespace-pre-wrap opacity-100 my-4">
      {contents}
      <span className="font-medium text-[14px] leading-[20px]">{notes}</span>
    </div>
  );
};
