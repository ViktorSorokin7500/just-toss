import { Api } from "@/services/api-client";
import { Effect, Terpene, Type } from "@prisma/client";
import React from "react";

export const useFilterData = () => {
  const [effects, setEffects] = React.useState<Effect[]>([]);
  const [terpenes, setTerpenes] = React.useState<Terpene[]>([]);
  const [types, setTypes] = React.useState<Type[]>([]);

  const [loading, setLoading] = React.useState({
    effects: true,
    terpenes: true,
    types: true,
  });

  React.useEffect(() => {
    async function fetchData() {
      try {
        setLoading({
          effects: true,
          terpenes: true,
          types: true,
        });

        const [effects, terpenes, types] = await Promise.all([
          Api.effects.getAll(),
          Api.terpenes.getAll(),
          Api.types.getAll(),
        ]);

        setEffects(effects);
        setTerpenes(terpenes);
        setTypes(types);
      } catch (error) {
        console.log("use-filter-data =>", error);
      } finally {
        setLoading({
          effects: false,
          terpenes: false,
          types: false,
        });
      }
    }

    fetchData();
  }, []);

  return {
    effects,
    terpenes,
    types,
    loading,
  };
};
