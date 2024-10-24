"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import React from "react";
import { Button } from "../ui";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { useCartStore } from "@/store/cart";

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  const cartState = useCartStore((state) => state);

  const { items, updateItemQuantity, totalAmount, removeCartItem } = cartState;

  React.useEffect(() => {
    cartState.fetchCartItems();
  }, []);

  const onClickCountUpdate = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-gray-200">
        <SheetHeader>
          <SheetTitle>
            Cart include{" "}
            <span className="font-bold">
              {items.length} {items.length > 1 ? "items" : "item"}
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="-mx-6 mt-5 overflow-auto flex-1">
          {items.map((item) => {
            const datailsInfo = `Type: ${item.type.toLowerCase()}, Thc: ${
              item.thc
            }%, Terpene: ${item.terpene}`;
            return (
              <CartDrawerItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
                quantity={item.quantity}
                details={datailsInfo}
                onClickCountUpdate={(type) =>
                  onClickCountUpdate(item.id, item.quantity, type)
                }
                className="mb-2"
                onClickRemove={() => removeCartItem(item.id)}
              />
            );
          })}
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex text-lg text-neutral-500">Total</span>
              <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-2 mx-2" />
              <span className="font-bold text-lg">
                ${totalAmount.toFixed(2)}
              </span>
            </div>

            <Link href="/cart">
              <Button type="submit" className="w-full h-12 text-base">
                Order
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
