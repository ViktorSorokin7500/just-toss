"use client";
import React from "react";
import {
  CheckoutDeliveryDetails,
  CheckoutTotalAmount,
  CheckoutYourCart,
  WhiteBlock,
} from "@/components/shared";
import { Input } from "@/components/ui";

interface Props {
  className?: string;
}

export const CheckoutInfo: React.FC<Props> = () => {
  return (
    <div className="flex gap-10">
      <div className="flex flex-col gap-10 flex-1 mb-20">
        <CheckoutYourCart />

        <WhiteBlock title="2. Personal details">
          <div className="grid grid-cols-2 gap-5">
            <Input name="name" placeholder="Name" className="text-base" />
            <Input
              name="lastname"
              placeholder="Lastname"
              className="text-base"
            />
            <Input name="email" placeholder="Email" className="text-base" />
            <Input name="phone" placeholder="Phone" className="text-base" />
          </div>
        </WhiteBlock>

        <CheckoutDeliveryDetails />
      </div>

      <CheckoutTotalAmount />
    </div>
  );
};
