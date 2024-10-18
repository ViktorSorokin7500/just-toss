"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { SortPopup } from "./sort-popup";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFilterGroup } from "./checkbox-filter-group";
import { effectTypes } from "../../lib/data_details";
import { useFilterData } from "@/hooks/use-filter-data";
import { mapItems } from "@/lib/formulas";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { effects, terpenes, types, loading } = useFilterData();

  const effectItems = mapItems(effects);
  const terpeneItems = mapItems(terpenes);
  const typeItems = mapItems(types);

  return (
    <div className={cn(className)}>
      <SortPopup />

      <div className="mt-5 border-t border-t-neutral-100 py-6">
        <p>Price: </p>
        <div className="flex gap-3 mb-5">
          <Input type="number" placeholder="0" min={0} max={10} />
          <Input type="number" placeholder="10" min={1} max={10} />
        </div>

        <RangeSlider min={0} max={10} step={0.1} value={[0, 10]} />
      </div>

      <div className="mt-3 border-t border-t-neutral-100 py-3">
        <CheckboxFilterGroup
          title="Terpenes"
          items={terpeneItems}
          loading={loading.terpenes}
        />
      </div>
      <div className="mt-3 border-t border-t-neutral-100 py-3">
        <CheckboxFilterGroup
          title="Types"
          items={typeItems}
          loading={loading.types}
          limit={3}
        />
      </div>
      <div className="mt-3 border-t border-t-neutral-100 py-3">
        <CheckboxFilterGroup
          title="Effects"
          items={effectItems}
          loading={loading.effects}
        />
      </div>
    </div>
  );
};
