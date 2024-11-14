"use client";
import React from "react";
import { User } from "@prisma/client";
import { FormProvider, useForm } from "react-hook-form";
import {
  formRegisterSchema,
  TFormRegisterValues,
} from "./modal/auth-modal/forms/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { Container } from "./container";
import { Title } from "./title";
import { FormInput } from "./checkout";
import { Button } from "../ui";
import { updateUserInfo } from "@/app/actions";

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data?.fullName,
      email: data?.email,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.log("profile-form =>", error);
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <Container className="my-10">
      <Title
        text={`Personal profile - #${data.id}`}
        size="xl"
        className="font-bold"
      />

      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-96 mt-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput name="email" label="E-mail" type="email" required />
          <FormInput name="fullName" label="Full Name" type="text" required />
          <FormInput
            name="password"
            label="Password"
            type="password"
            required
          />
          <FormInput
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            required
          />

          <Button
            disabled={form.formState.isSubmitting}
            className="text-base mt-10"
          >
            Save
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button"
          >
            Sign Out
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
