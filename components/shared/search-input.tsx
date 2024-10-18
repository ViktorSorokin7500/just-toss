"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useClickAway, useDebounce } from "react-use";
import Link from "next/link";
import { Api } from "@/services/api-client";
import { search } from "@/services/products";
import { Product } from "@prisma/client";

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>([]);

  const ref = React.useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    () => {
      Api.products.search(searchQuery).then((items) => {
        setProducts(items);
      });
    },
    250,
    [searchQuery]
  );

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery("");
    setProducts([]);
  };

  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-30 bg-black/50" />
      )}
      <div
        ref={ref}
        className={cn(
          className,
          "flex rounded-2xl flex-1 justify-between relative h-11 z-30"
        )}
      >
        <Search className="absolute left-3 top-1/2 translate-y-[-50%] h-5 text-gray-400" />
        <input
          className="rounded-2xl outline-none w-full bg-gray-50 pl-11"
          type="text"
          placeholder="Search..."
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {products.length > 0 && (
          <div
            className={cn(
              "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible",
              focused && "visible opacity-100 top-12"
            )}
          >
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="flex items-center gap-3 px-3 py-2 hover:bg-primary/10"
                onClick={onClickItem}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  width={32}
                  height={32}
                  className="rounded-sm"
                />
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
