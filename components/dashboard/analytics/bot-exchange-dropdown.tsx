import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export const BotExchangeDropdown = ({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: {value: string; label: string}[];
  placeholder: string;
}) => {
  return (
    <Select
      value={value}
      onValueChange={(val) => {
        const syntheticEvent = {
          target: {value: val},
        } as React.ChangeEvent<HTMLSelectElement>;
        onChange(syntheticEvent);
      }}
    >
      <SelectTrigger className="w-auto py-5 text-sm bg-neutral-50/50 dark:bg-neutral-950/50 border border-neutral-300 dark:border-neutral-800 text-zinc-800 dark:text-white">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
