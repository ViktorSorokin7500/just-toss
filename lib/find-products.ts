import { prisma } from "@/prisma/prisma-client";
import { Prisma } from "@prisma/client";

export interface GetSearchParams {
  priceFrom?: string;
  priceTo?: string;
  sortBy?: string;
  terpenes?: string;
  effects?: string;
  types?: string;
  page?: string;
  limit?: string;
}

const sortOptions: Record<string, { [key: string]: Prisma.SortOrder }> = {
  name_asc: { name: "asc" },
  name_desc: { name: "desc" },
  price_asc: { price: "asc" },
  price_desc: { price: "desc" },
};

export default async function findProducts(searchParams: GetSearchParams) {
  const page = parseInt(searchParams.page || "1", 10);
  const limit = parseInt(searchParams.limit || "6", 10);
  const offset = (page - 1) * limit;

  const types = searchParams.types?.split(",").map(Number) || [];
  const terpenes = searchParams.terpenes?.split(",").map(Number) || [];
  const effects = searchParams.effects?.split(",").map(Number) || [];

  const priceFrom = parseFloat(searchParams.priceFrom ?? "") || 0;
  const priceTo = parseFloat(searchParams.priceTo ?? "") || Number.MAX_VALUE;

  const sortBy =
    sortOptions[searchParams.sortBy as keyof typeof sortOptions] || {};

  const products = await prisma.product.findMany({
    skip: offset,
    take: limit,
    where: {
      price: {
        gte: priceFrom,
        lte: priceTo,
      },
      ...(types.length && { typeId: { in: types } }),
      ...(terpenes.length && { terpeneId: { in: terpenes } }),
      ...(effects.length && {
        effects: { some: { effectId: { in: effects } } },
      }),
    },
    orderBy: sortBy,
    include: {
      type: true,
      terpene: true,
      effects: {
        include: {
          effect: true,
        },
      },
    },
  });

  const totalProducts = await prisma.product.count({
    where: {
      price: {
        gte: priceFrom,
        lte: priceTo,
      },
      ...(types.length && { typeId: { in: types } }),
      ...(terpenes.length && { terpeneId: { in: terpenes } }),
      ...(effects.length && {
        effects: { some: { effectId: { in: effects } } },
      }),
    },
  });

  const totalPages = Math.ceil(totalProducts / limit);

  return { products, totalPages };
}
