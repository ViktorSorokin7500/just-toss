import {
  Container,
  ProductMainInfo,
  RecommendProducts,
} from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
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

  if (!product) {
    return notFound();
  }

  const recommendProducts = await prisma.product.findMany({
    where: {
      typeId: product.typeId,
      id: {
        not: product.id,
      },
    },
    include: {
      type: true,
      terpene: true,
      effects: {
        include: {
          effect: true,
        },
      },
    },
    take: 6,
  });

  return (
    <Container className="my-10">
      <ProductMainInfo product={product} />
      <RecommendProducts recommendProducts={recommendProducts} />
    </Container>
  );
}
