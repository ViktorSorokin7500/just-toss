import { CheckoutInfo, Title } from "@/components/shared";
import React from "react";

export default function Checkout() {
  return (
    <div className="mt-5">
      <Title text="Checkout" className="font-extrabold mb-8 text-[36px]" />

      <CheckoutInfo />
    </div>
  );
}
