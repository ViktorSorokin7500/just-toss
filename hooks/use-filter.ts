import qs from "qs";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilter extends PriceProps {
  sortBy?: string;
  terpenes?: string[];
  effects?: string[];
  types?: string[];
}

export const useFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilter,
    string
  >;

  const [sortBy, setSortBy] = React.useState<string | undefined>(
    searchParams.get("sortBy") || undefined
  );
  const [selectedFilters, setSelectedFilters] = React.useState({
    terpenes: searchParams.get("terpenes")?.split(",") || ([] as string[]),
    effects: searchParams.get("effects")?.split(",") || ([] as string[]),
    types: searchParams.get("types")?.split(",") || ([] as string[]),
  });

  const [prices, setPrices] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  React.useEffect(() => {
    const filters = {
      ...prices,
      sortBy,
      types: selectedFilters.types,
      effects: selectedFilters.effects,
      terpenes: selectedFilters.terpenes,
    };

    const query = qs.stringify(filters, { arrayFormat: "comma" });

    router.push(`?${query}`, { scroll: false });
  }, [prices, sortBy, selectedFilters, router]);

  const updateSelectedFilters = (
    filterName: keyof typeof selectedFilters,
    selectedValues: string[]
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterName]: selectedValues,
    }));
  };

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({ ...prev, [name]: value }));
  };

  return {
    sortBy,
    setSortBy,
    selectedFilters,
    updateSelectedFilters,
    prices,
    updatePrice,
  };
};
