import React from "react";
import { WhiteBlock } from "../white-block";
import { CheckoutItemDetails } from "../checkout-item-details";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button } from "@/components/ui";
import { useCart } from "@/hooks/use-cart";

interface Props {
  className?: string;
}

export const CheckoutTotalAmount: React.FC<Props> = ({ className }) => {
  const { totalAmount } = useCart();
  const productPrice = totalAmount * 0.8;
  const tax = totalAmount * 0.2;
  const delivery = totalAmount > 20 ? 0 : 2;
  return (
    <div className="w-[450px]">
      <WhiteBlock className="p-6 top-4 sticky">
        <div className="flex flex-col gap-1">
          <span className="text-xl">Total:</span>
          <div className="flex flex-col">
            <span className="text-[34px] font-extrabold">
              ${(totalAmount + delivery).toFixed(2)}
            </span>
            {totalAmount < 20 && (
              <span className="text-sm text-gray-400">
                ${totalAmount.toFixed(2)} + ${delivery.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <CheckoutItemDetails
          title={
            <>
              <div className="flex items-center">
                <Package className="mr-2 text-gray-300" size={18} /> Product
                price
              </div>
            </>
          }
          value={productPrice.toFixed(2)}
        />
        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Percent className="mr-2 text-gray-300" size={18} /> Tax
            </div>
          }
          value={tax.toFixed(2)}
        />
        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Truck className="mr-2 text-gray-300" size={18} /> Delivery
            </div>
          }
          value={delivery.toFixed(2)}
        />

        <Button
          type="submit"
          className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
        >
          Pay <ArrowRight className="w-5 ml-2" />
        </Button>
      </WhiteBlock>
    </div>
  );
};
