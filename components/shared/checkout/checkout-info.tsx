"use client";
import React from "react";
import {
  CheckoutDeliveryDetails,
  CheckoutPersonalForm,
  CheckoutTotalAmount,
  CheckoutYourCart,
} from "@/components/shared";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from "./form/schemas/checkout-form-schema";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Api } from "@/services/api-client";

interface Props {
  className?: string;
}

export const CheckoutInfo: React.FC<Props> = () => {
  const [submitting, setSubmitting] = React.useState(false);
  const { data: session } = useSession();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      country: "",
      comment: "",
    },
  });

  React.useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(" ");

      form.setValue("firstName", firstName);
      form.setValue("lastName", lastName);
      form.setValue("email", data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
    try {
      setSubmitting(true);
      await createOrder(data);
      toast.success("Order created successfully, check your email");

      location.href = "/";
    } catch (error) {
      console.log("checkout-info =>", error);
      toast.error("Failed to add product to cart");
    } finally {
      setSubmitting(false);
    }
  };

  const { loading } = useCart();

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-10">
          <div className="flex flex-col gap-10 flex-1 mb-20">
            <CheckoutYourCart />
            <CheckoutPersonalForm
              className={cn({ "opacity-40 pointer-events-none": loading })}
            />
            <CheckoutDeliveryDetails
              className={cn({ "opacity-40 pointer-events-none": loading })}
            />
          </div>

          <CheckoutTotalAmount submitting={submitting} />
        </div>
      </form>
    </FormProvider>
  );
};
