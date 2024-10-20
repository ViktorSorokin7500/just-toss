"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { SortPopup } from "./sort-popup";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFilterGroup } from "./checkbox-filter-group";
import { useFilterData } from "@/hooks/use-filter-data";
import { mapItems } from "@/lib/formulas";
import { useFilter } from "@/hooks/use-filter";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { effects, terpenes, types, loading } = useFilterData();

  const effectItems = mapItems(effects);
  const terpeneItems = mapItems(terpenes);
  const typeItems = mapItems(types);

  const {
    sortBy,
    setSortBy,
    selectedFilters,
    updateSelectedFilters,
    prices,
    updatePrice,
  } = useFilter();

  return (
    <div className={cn(className)}>
      <SortPopup sortBy={sortBy} setSortBy={setSortBy} className="w-full" />

      <div className="mt-5 border-t border-t-neutral-100 py-6">
        <p>Price: </p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={9.5}
            value={String(prices.priceFrom)}
            onChange={(e) => updatePrice("priceFrom", Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="10"
            min={1}
            max={10}
            value={String(prices.priceTo)}
            onChange={(e) => updatePrice("priceTo", Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={10}
          step={0.1}
          value={[prices.priceFrom || 0, prices.priceTo || 10]}
          onValueChange={([priceFrom, priceTo]) => {
            updatePrice("priceFrom", priceFrom);
            updatePrice("priceTo", priceTo);
          }}
        />
      </div>

      <div className="mt-3 border-t border-t-neutral-100 py-3">
        <CheckboxFilterGroup
          title="Terpenes"
          items={terpeneItems}
          loading={loading.terpenes}
          defaultValues={selectedFilters.terpenes}
          onChange={(selectedValues) =>
            updateSelectedFilters("terpenes", selectedValues)
          }
        />
      </div>
      <div className="mt-3 border-t border-t-neutral-100 py-3">
        <CheckboxFilterGroup
          title="Types"
          items={typeItems}
          loading={loading.types}
          limit={3}
          defaultValues={selectedFilters.types}
          onChange={(selectedValues) =>
            updateSelectedFilters("types", selectedValues)
          }
        />
      </div>
      <div className="mt-3 border-t border-t-neutral-100 py-3">
        <CheckboxFilterGroup
          title="Effects"
          items={effectItems}
          loading={loading.effects}
          defaultValues={selectedFilters.effects}
          onChange={(selectedValues) =>
            updateSelectedFilters("effects", selectedValues)
          }
        />
      </div>
    </div>
  );
};
