import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  type: string;
  terpene: string;
  thc: string;
  className?: string;
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  type,
  terpene,
  thc,
  className,
}) => {
  return (
    <div
      className={cn(
        className,
        "shadow-lg hover:shadow rounded bg-gray-50 transition-all duration-300 hover:scale-105"
      )}
    >
      <Link href={`/products/${id}`}>
        <div className="flex justify-center p-6 bg-green-50 rounded-lg h-[260px]">
          <img
            src={imageUrl}
            alt={name}
            className="size-[215px] rounded-full blur-[8px] grayscale opacity-25"
          />
        </div>

        <div className="p-2">
          <Title
            text={name}
            size="sm"
            className="mb-1 mt-3 font-bold text-center"
          />

          <div className="flex justify-between">
            <p>
              <b>Type:</b> {type}
            </p>
            <p>
              <b>THC:</b> {thc}%
            </p>
          </div>
          <p>
            <b>Terpene:</b> {terpene}
          </p>

          <div className="flex justify-between items-center mt-4">
            <span className="text-[20px]">
              from <b>${price.toFixed(2)}</b>
            </span>

            <Button className="text-base font-bold">
              <Plus size={20} />
              Add
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};
