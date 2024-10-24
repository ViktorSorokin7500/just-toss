import { Cart, CartItem } from "@prisma/client";

export type CartItemDTO = CartItem & {
  product: {
    name: string;
    id: number;
    price: number;
    imageUrl: string;
    description: string;
    thcLevel: string;
    terpene: {
      name: string;
    };
    type: {
      name: string;
    };
  };
};
export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

export interface CreateCartItemValues {
  productId: number;
  quantity: number;
}
