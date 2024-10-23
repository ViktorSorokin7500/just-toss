import { CartDTO } from "@/services/dto/cart.dto";

export type ICartItem = {
  id: number;
  quantity: number;

  name: string;
  imageUrl: string;
  price: number;
  thc: string;

  terpene: string;
  type: string;
};

interface ReturnProps {
  items: ICartItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,

    name: item.product.name,
    imageUrl: item.product.imageUrl,
    thc: item.product.thcLevel,

    price: item.product.price,

    terpene: item.terpene.name,
    type: item.type.name,

    totalAmount: item.product.price * item.quantity,
  }));

  return {
    items,
    totalAmount: data.totalAmount,
  };
};
