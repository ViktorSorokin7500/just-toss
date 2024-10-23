import { Cart, CartItem, Product, Terpene, Type } from "@prisma/client";

export type CartItemDTO = CartItem & {
  product: Product;
  terpene: Terpene;
  type: Type;
};
export interface CartDTO extends Cart {
  items: CartItemDTO[];
}
