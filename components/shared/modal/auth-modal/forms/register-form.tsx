"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "@/components/shared/title";
import { FormInput } from "@/components/shared/checkout";
import { Button } from "@/components/ui";
import toast from "react-hot-toast";
import { formRegisterSchema, TFormRegisterValues } from "./schemas";
import { registerUser } from "@/app/actions";

interface Props {
  onClose: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success("Successfully registered");
      onClose?.();
    } catch (error) {
      console.log("register-form =>", error);
      toast.error("Failed to registered");
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Register" size="md" className="font-bold" />
            <p className="text-gray-400">
              Enter your email, full name and password
            </p>
          </div>
          <img
            src="/assets/images/phone-icon.png"
            alt="phone-icon"
            width={60}
            height={60}
          />
        </div>

        <FormInput type="email" name="email" label="E-Mail" required />
        <FormInput type="text" name="fullName" label="Full Name" required />
        <FormInput type="password" name="password" label="Password" required />
        <FormInput
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          required
        />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          {form.formState.isSubmitting ? "Loading..." : "Register"}
        </Button>
      </form>
    </FormProvider>
  );
};
