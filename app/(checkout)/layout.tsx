import { Container, Header } from "@/components/shared";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F4F1EE]">
      <Container>
        <Header hasSearch={false} hasCart={false} />
        {children}
      </Container>
    </main>
  );
}
