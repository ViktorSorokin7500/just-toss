"use server";

import { CheckoutFormValues } from "@/components/shared/checkout/form/schemas/checkout-form-schema";
import { generateOrderEmail } from "@/lib/generate-order-email";
import { sendMail } from "@/lib/send-mail";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart) {
      throw new Error("Cart not found");
    }

    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    const products = userCart.items.map((item) => {
      return {
        id: item.productId,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        imageUrl: item.product.imageUrl,
      };
    });

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address:
          data.address +
          ", " +
          data.city +
          ", " +
          data.state +
          ", " +
          data.country,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: userCart.items,
      },
    });

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    await sendMail({
      to: data.email,
      subject: "Order placed successfully",
      body: generateOrderEmail(
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state,
          country: data.country,
          comment: data.comment,
          totalAmount: userCart.totalAmount,
          orderId: order.id,
        },
        products
      ),
    });
  } catch (error) {
    console.log("actions createOrder =>", error);
  }
}
