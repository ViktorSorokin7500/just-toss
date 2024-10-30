import React from "react";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";

interface Props {
  title: React.ReactNode;
  value: string;
  className?: string;
}

export const CheckoutItemDetails: React.FC<Props> = ({
  title,
  value,
  className,
}) => {
  const { loading } = useCart();
  return (
    <div className={cn(className, "flex my-4")}>
      <span className="flex flex-1 text-lg text-neutral-500">
        {title}:
        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
      </span>
      {loading ? (
        <div className="h-[28px] w-12 bg-gray-200 rounded" />
      ) : (
        <span className="font-bold text-lg">${value}</span>
      )}
    </div>
  );
};
