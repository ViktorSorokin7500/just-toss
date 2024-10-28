"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { CartItemProps } from "../cart-item-details/cart-item-details.types";
import * as CartItemDetails from "../cart-item-details";
import { X } from "lucide-react";

interface Props extends CartItemProps {
  onClickCountUpdate?: (type: "plus" | "minus") => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  className,
  name,
  price,
  imageUrl,
  quantity,
  details,
  onClickCountUpdate,
  onClickRemove,
  disabled,
}) => {
  return (
    <div
      className={cn(className, "flex items-center justify-between", {
        "grayscale pointer-events-none": disabled,
      })}
    >
      <div className="flex items-center gap-5 flex-1">
        <CartItemDetails.Image src={imageUrl} />
        <CartItemDetails.Info name={name} details={details} />
      </div>

      <CartItemDetails.Price value={price} />

      <div className="flex items-center gap-5 ml-20">
        <CartItemDetails.CountButton
          onClick={onClickCountUpdate}
          value={quantity}
          size="lg"
        />
        <button onClick={onClickRemove} type="button">
          <X
            className="text-gray-400 cursor-pointer hover:text-gray-600"
            size={20}
          />
        </button>
      </div>
    </div>
  );
};
