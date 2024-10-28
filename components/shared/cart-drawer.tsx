"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import React from "react";
import { Button } from "../ui";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Title } from "./title";
import EmptyBox from "/public/assets/images/empty-box.png";
import { useCart } from "@/hooks/use-cart";

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  const { items, updateItemQuantity, totalAmount, removeCartItem } = useCart();
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
      <SheetContent className="flex flex-col justify-between pb-0 bg-gray-100">
        <div
          className={cn(
            "flex flex-col h-full",
            !totalAmount && "justify-center"
          )}
        >
          {totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle>
                Cart include{" "}
                <span className="font-bold">
                  {items.length} {items.length > 1 ? "items" : "item"}
                </span>
              </SheetTitle>
            </SheetHeader>
          )}

          {!totalAmount && (
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image src={EmptyBox} alt="Empty cart" />
              <Title
                size="sm"
                text="Your cart is empty"
                className="text-center font-bold my-2"
              />
              <p className="text-center text-neutral-500 mb-5">
                Add some items to your cart
              </p>

              <SheetClose>
                <Button className="w-56 h-12 text-base" size="lg">
                  <ArrowLeft className="w-5 mr-2" /> Back to shop
                </Button>
              </SheetClose>
            </div>
          )}

          {totalAmount > 0 && (
            <>
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
                      disabled={item.disabled}
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

                  <Link href="/checkout">
                    <Button type="submit" className="w-full h-12 text-base">
                      Order
                      <ArrowRight className="w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
