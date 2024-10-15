import { Header } from "@/components/shared";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Toss",
    template: "%s | Toss",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
    </main>
  );
}
