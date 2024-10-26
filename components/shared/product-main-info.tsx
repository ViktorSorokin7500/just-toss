"use client";
import React from "react";
import { ProductProps } from "./modal/show-modal-product";
import { Title } from "./title";
import { EffectsList } from "./effects-list";
import { Button } from "../ui";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import toast from "react-hot-toast";

interface Props {
  product: ProductProps["product"];
}

export const ProductMainInfo: React.FC<Props> = ({ product }) => {
  const addCartItem = useCartStore((state) => state.addCartItem);
  const onSubmit = () => {
    try {
      addCartItem({
        productId: product.id,
      });
      toast.success("Product added to cart");
    } catch (error) {
      toast.error("Failed to add product to cart");
      console.log("product-full-info =>", error);
    }
  };
  return (
    <div className="flex px-2 gap-8 my-4">
      <div className="w-[480px] flex flex-col gap-8 justify-center items-center">
        <div className="flex justify-center p-6 rounded-full border border-primary size-[420px] shadow-lg">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="rounded-full"
          />
        </div>
        <div className="h-20 w-12 flex flex-row justify-center items-center gap-1">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="border border-primary py-2 cursor-pointer"
          />
          <img
            src={product.imageUrl}
            alt={product.name}
            className="border py-2 border-dashed cursor-pointer hover:border-primary transition-all duration-300"
          />
          <img
            src={product.imageUrl}
            alt={product.name}
            className="border py-2 border-dashed cursor-pointer hover:border-primary transition-all duration-300"
          />
        </div>
      </div>
      <div className="flex-1 bg-gradient-to-r from-lime-50 to-green-50 py-8 px-16 shadow-lg space-y-4">
        <p className="bg-green-900 text-green-50 w-fit px-2 py-1 rounded-full text-sm">
          {product.type.name}
        </p>

        <Title text={product.name} size="2xl" className="text-shadow" />

        <span className="text-green-900 text-4xl font-bold">
          {product.price.toFixed(2)}
        </span>

        <p className="text-green-900 text-justify">{product.description}</p>

        <div className="flex flex-col">
          <p>
            <b>Terpene: </b>
            <span className="text-green-900 font-semibold text-lg">
              {product.terpene.name}
            </span>
          </p>
          <p>
            <b>THC: </b>
            <span className="text-green-900 font-semibold text-lg">
              {product.thcLevel}%
            </span>
          </p>
        </div>

        <EffectsList effects={product.effects} />

        <div className="flex justify-between items-center">
          <p className="text-lg">Weight: 1g</p>
          <Button
            className="flex items-center gap-2 text-lg"
            onClick={onSubmit}
          >
            <ShoppingBag size={20} /> Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};
