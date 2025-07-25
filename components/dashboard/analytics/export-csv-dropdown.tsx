import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {ChevronDown, Download} from "lucide-react";
import {timeRanges} from "./analytics-data";

export const ExportDropdown = ({
  onExport,
}: {
  onExport: (timeRangeLabel: string) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex py-5 items-center gap-2 h-10 px-4 text-sm font-medium text-white bg-neutral-50/50 dark:bg-neutral-950/50 border border-neutral-300 dark:border-neutral-800 rounded-md hover:bg-zinc-600 transition-colors">
          <Download size={16} />
          Export CSV
          <ChevronDown
            size={16}
            className="ml-1 transition-transform duration-200"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {timeRanges.map((range) => (
          <DropdownMenuItem
            key={range.label}
            onClick={() => onExport(range.label)}
            className="cursor-pointer"
          >
            Export Last {range.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
