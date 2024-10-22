import { ShowModalProduct } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ModalProduct({
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
  return <ShowModalProduct product={product} />;
}
