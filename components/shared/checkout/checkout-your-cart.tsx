import React from "react";
import { WhiteBlock } from "../white-block";
import { CheckoutItem } from "./checkout-item";
import { useCart } from "@/hooks/use-cart";
import { CheckoutItemSkeleton } from "./checkout-item-skeleton";

interface Props {
  className?: string;
}

export const CheckoutYourCart: React.FC<Props> = () => {
  const { items, updateItemQuantity, removeCartItem, loading } = useCart();

  const onClickCountUpdate = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <WhiteBlock title="1. Your cart">
      {loading ? (
        <div className="py-1 flex flex-col gap-5">
          <CheckoutItemSkeleton />
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {items.map((item) => {
            const datailsInfo = `Type: ${item.type.toLowerCase()}, Thc: ${
              item.thc
            }%, Terpene: ${item.terpene}`;
            return (
              <CheckoutItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
                quantity={item.quantity}
                details={datailsInfo}
                disabled={item.disabled}
                onClickCountUpdate={(type) =>
                  onClickCountUpdate(item.id, item.quantity, type)
                }
                onClickRemove={() => removeCartItem(item.id)}
              />
            );
          })}
        </div>
      )}
    </WhiteBlock>
  );
};
