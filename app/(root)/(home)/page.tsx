import { Container, Filters, Title } from "@/components/shared";

export default function Home() {
  return (
    <Container className="my-8">
      <Title size="xl" text="Our products" className="font-extrabold" />
      <div className="flex gap-[60px] pt-8">
        <div className="w-[250px]">
          <Filters />
        </div>
        <div className="flex-1">Products list</div>
      </div>
    </Container>
  );
}
