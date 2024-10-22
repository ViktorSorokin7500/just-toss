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
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
      {modal}
    </main>
  );
}
