import { RiSearchLine } from "react-icons/ri";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

type Props = {
  value?: string;
  onChage?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: () => void; //検索実行
  className?: string;
};

export const SearchBox = ({ value, onChage, onSearch, className }: Props) => {
  return (
    <InputGroup
      className={`max-w-xs flex flex-row-reverse items-center justify-between ${className}`}
    >
      <InputGroupInput
        placeholder="Search..."
        value={value}
        onChange={onChage}
      />
      <InputGroupAddon
        onClick={onSearch}
        className="flex items-center justify-center"
      >
        <RiSearchLine />
      </InputGroupAddon>
    </InputGroup>
  );
};
