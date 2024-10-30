import { z } from "zod";

export const checkoutFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().nonempty("Email is required").email("Invalid email"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  country: z.string().nonempty("Country is required"),
  state: z.string().nonempty("State is required"),
  city: z.string().nonempty("City is required"),
  comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
