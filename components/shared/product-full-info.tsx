"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { ProductProps } from "./modal/show-modal-product";
import { Title } from "./title";
import { EffectsList } from "./effects-list";
import { Button } from "../ui";
import { useCartStore } from "@/store/cart";

interface Props {
  className?: string;
  product: ProductProps["product"];
  onSubmit: () => void;
}

export const ProductFullInfo: React.FC<Props> = ({
  className,
  product,
  onSubmit: _onSubmit,
}) => {
  const addCartItem = useCartStore((state) => state.addCartItem);
  const onSubmit = () => {
    addCartItem({
      productId: product.id,
    });
    _onSubmit();
  };

  return (
    <div
      className={cn(className, "flex justify-center items-center pr-16 gap-4")}
    >
      <div className="flex flex-col justify-center items-center gap-8 bg-gray-50 h-full px-16">
        <div className="flex justify-center p-6 bg-green-50 rounded-full size-[320px]">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="rounded-full shadow-lg"
          />
        </div>
        <Button onClick={onSubmit}>Add to cart</Button>
      </div>
      <div className="flex-1 flex flex-col gap-2 text-white text-shadow">
        <Title text={product.name} size="lg" className="font-extrabold" />
        <span className="text-[14px]">{product.description}</span>
        <div className="flex flex-wrap gap-1 justify-between">
          <span>
            <b>THC level:</b> {product.thcLevel}%
          </span>
          <span>
            <b>Terpene:</b> {product.terpene.name}
          </span>
          <span>
            <b>Type:</b> {product.type.name}
          </span>
          <span>
            <b>Price:</b> ${product.price.toFixed(2)}
          </span>
        </div>
        <EffectsList effects={product.effects} />
      </div>
    </div>
  );
};
