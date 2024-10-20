import React from "react";
import { cn } from "@/lib/utils";
import { FilterCheckbox, FilterCheckBoxProps } from "./filter-checkbox";
import { Input, Skeleton } from "../ui";

type Item = FilterCheckBoxProps;

interface Props {
  title: string;
  items: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onChange: (selectedValues: string[]) => void;
  defaultValues?: string[];
  loading: boolean;
  className?: string;
}

export const CheckboxFilterGroup: React.FC<Props> = ({
  title,
  items,
  limit = 5,
  searchInputPlaceholder = "Search...",
  onChange,
  defaultValues,
  loading,
  className,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const defaultItems = items.slice(0, limit);

  const [checkedValues, setCheckedValues] = React.useState<string[]>(
    defaultValues || []
  );

  const toggleCheckbox = (value: string) => {
    const newCheckedValues = checkedValues.includes(value)
      ? checkedValues.filter((v) => v !== value)
      : [...checkedValues, value];

    setCheckedValues(newCheckedValues);
    onChange(newCheckedValues);
  };

  if (loading) {
    return (
      <div className={cn(className)}>
        <p className="font-bold mb-3">{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="mb-3 h-6 rounded-[8px]" />
          ))}
      </div>
    );
  }

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : defaultItems;

  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={cn(className)}>
      <p className="font-bold mb-3">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input
            placeholder={searchInputPlaceholder}
            onChange={onChangeSearchValue}
            className="bg-gray-50 border-none"
          />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item, i) => (
          <FilterCheckbox
            key={i}
            text={item.text}
            value={item.value}
            checked={checkedValues.includes(item.value)}
            onCheckedChange={() => toggleCheckbox(item.value)}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
          <button
            className="text-primary mt-3"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};
