"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Dialog } from "@/components/ui";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { ProductFullInfo } from "../product-full-info";

export type ProductProps = {
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    thcLevel: string;
    description: string;
    type: {
      id: number;
      name: string;
    };
    terpene: {
      id: number;
      name: string;
    };
    effects: Array<{
      id: number;
      productId: number;
      effectId: number;
      value: number;
      effect: {
        id: number;
        name: string;
      };
    }>;
  };
};

interface Props {
  className?: string;
  product: ProductProps["product"];
}

export const ShowModalProduct: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();
  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogTitle>{product.name}</DialogTitle>
      <DialogContent
        className={cn(
          className,
          "p-0 max-w-[1060px] min-h-[500px] bg-white overflow-hidden"
        )}
      >
        <ProductFullInfo product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
