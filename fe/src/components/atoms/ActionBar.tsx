type Action = {
  label: string;
  onClick?: () => void;
};

type Props = {
  actions?: Action[];
};

export const ActionBar: React.FC<Props> = ({ actions }) => {
  return (
    <div className="text-[#F1F5F9] bg-[#2BA89D] h-[48px] w-full flex justify-between items-center">
      {actions && actions.length > 0 ? (
        actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className="text-[14px] font-medium px-[8px]"
          >
            {action.label}
          </button>
        ))
      ) : (
        <div />
      )}
    </div>
  );
};
