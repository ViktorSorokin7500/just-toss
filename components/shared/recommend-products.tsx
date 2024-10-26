"use client";
import React from "react";
import { ProductProps } from "./modal/show-modal-product";
import { Title } from "./title";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { Autoplay } from "swiper/modules";
import { Button } from "../ui";
import Link from "next/link";

interface Props {
  recommendProducts: Array<ProductProps["product"]>;
}

export const RecommendProducts: React.FC<Props> = ({ recommendProducts }) => {
  return (
    <div className="flex flex-col gap-3">
      <Title text="Also you may like" size="lg" className="text-center" />
      <div className="flex gap-3 px-4 h-[350px]">
        <Swiper
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          loop={true}
          slidesPerView={3}
          spaceBetween={30}
          className="mySwiper"
        >
          {recommendProducts.map((product) => (
            <SwiperSlide key={product.id} className="rounded-lg shadow-lg">
              <div className="py-4 bg-green-50">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-48 mx-auto rounded-full shadow-lg"
                />
              </div>
              <div className="py-2">
                <span className="text-lg font-semibold flex justify-center">
                  {product.name}
                </span>
                <div className="grid grid-cols-2 px-4 text-sm">
                  <span>THC: {product.thcLevel}%</span>
                  <span>Terpene: {product.terpene.name}</span>
                  <span>Type: {product.type.name}</span>
                  <span>Price: ${product.price.toFixed(2)}</span>
                </div>
              </div>
              <div className="grid">
                <Button asChild>
                  <Link href={`/product/${product.id}`}>Go to product</Link>
                </Button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
