import React from "react";
import { cn } from "@/lib/utils";
import { SortPopup } from "./sort-popup";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFilterGroup } from "./checkbox-filter-group";
import { effectTypes } from "../../lib/data_details";

interface Props {
  className?: string;
}

const items = effectTypes.map((effect, i) => ({
  text: effect,
  value: (i + 1).toString(),
}));

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(className)}>
      <SortPopup />

      <div className="mt-5 border-y border-y-neutral-100 py-6">
        <p>Price: </p>
        <div className="flex gap-3 mb-5">
          <Input type="number" placeholder="0" min={0} max={10} />
          <Input type="number" placeholder="10" min={1} max={10} />
        </div>

        <RangeSlider min={0} max={10} step={0.1} value={[0, 10]} />
      </div>

      <div className="mt-5">
        <CheckboxFilterGroup title="Effects" items={items} />
      </div>

      {/* Type */}
      {/* Terpene */}
      {/* Effects */}
    </div>
  );
};
