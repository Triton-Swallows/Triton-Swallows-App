import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void; //値が変わったときの関数
  value: string; //現在選択されている値
  className?: string; //後でスタイル設定するためのもの
};

export const SelectField = ({
  options,
  placeholder,
  onChange,
  value,
  className,
}: Props) => {
  return (
    <NativeSelect
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    >
      {placeholder && (
        <NativeSelectOption value="">{placeholder}</NativeSelectOption>
      )}
      {options.map((opt) => (
        <NativeSelectOption key={opt.value} value={opt.value}>
          {opt.label}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  );
};
