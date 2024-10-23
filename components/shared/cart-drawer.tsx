import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  const totalAmount = 110;

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-gray-200">
        <SheetHeader>
          <SheetTitle>
            Cart include <span className="font-bold">3 items</span>
          </SheetTitle>
        </SheetHeader>

        <div className="-mx-6 mt-5 overflow-auto flex-1">
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              name="MK Ultra"
              price={8.3}
              imageUrl="https://images.leafly.com/flower-images/MK-ULTRA-082.jpg"
              quantity={2}
              details="Indica"
            />
          </div>
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex text-lg text-neutral-500">Total</span>
              <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-2 mx-2" />
              <span className="font-bold text-lg">${totalAmount}</span>
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
