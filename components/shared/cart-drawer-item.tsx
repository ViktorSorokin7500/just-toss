"use client";
import React from "react";
import { cn } from "@/lib/utils";

import * as CartItem from "./cart-item-details";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { CountButton } from "./count-button";
import { Trash2Icon } from "lucide-react";

interface Props extends CartItemProps {
  className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
  className,
  id,
  name,
  price,
  imageUrl,
  quantity,
  details,
}) => {
  return (
    <div className={cn(className, "flex bg-white p-5 gap-6")}>
      <CartItem.Image src={imageUrl} />

      <div className="flex-1">
        <CartItem.Info name={name} details={details} />

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CountButton value={quantity} onClick={() => {}} size="sm" />

          <div className="flex items-center gap-3">
            <CartItem.Price value={Number(price.toFixed(2))} />
            <Trash2Icon
              size={16}
              className="text-red-400 cursor-pointer hover:text-red-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
