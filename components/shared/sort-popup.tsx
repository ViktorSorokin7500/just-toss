import React from "react";
import { cn } from "@/lib/utils";
import { Popover } from "../ui";
import { ArrowUpDown } from "lucide-react";

interface SortOption {
  label: string;
  value: string;
}

const sortOptions: SortOption[] = [
  { label: "Name A-Z", value: "name_asc" },
  {
    label: "Name Z-A",
    value: "name_desc",
  },
  { label: "Price Low-High", value: "price_asc" },
  { label: "Price High-Low", value: "price_desc" },
];

interface Props {
  className?: string;
  sortBy: string | undefined;
  setSortBy: (value: string) => void;
}

export const SortPopup: React.FC<Props> = ({
  className,
  sortBy,
  setSortBy,
}) => {
  return (
    <Popover.Root>
      <Popover.Trigger
        className={cn(
          className,
          "flex items-center gap-1 bg-gray-50 border border-primary px-5 h-[52px] rounded-2xl cursor-pointer"
        )}
      >
        <ArrowUpDown size={16} />
        <b>Sort by:</b>
        <b className="text-primary">
          {sortOptions.find((option) => option.value === sortBy)?.label ||
            "Select"}
        </b>
      </Popover.Trigger>
      <Popover.Content className="z-50 w-48 rounded-md border bg-white p-4 shadow-md">
        <div className="flex flex-col">
          {sortOptions.map((option) => (
            <Popover.Close key={option.value} asChild>
              <button
                className={cn(
                  "text-left p-2 rounded hover:bg-green-50",
                  sortBy === option.value && "bg-green-200"
                )}
                onClick={() => setSortBy(option.value)}
              >
                {option.label}
              </button>
            </Popover.Close>
          ))}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
};
