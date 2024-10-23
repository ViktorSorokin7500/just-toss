import { getCartDetails } from "@/lib/get-cart-details";
import { Api } from "@/services/api-client";
import { create } from "zustand";

export type ICartItem = {
  id: number;
  quantity: number;

  name: string;
  imageUrl: string;
  price: number;
};

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: ICartItem[];

  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: any) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  loading: false,
  error: false,
  totalAmount: 0,
  items: [],

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.fetchCart();
      set(getCartDetails(data));
    } catch (error) {
      console.log("fetchCartItems =>", error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateItemQuantity: async () => {},

  addCartItem: async () => {},

  removeCartItem: async () => {},
}));
