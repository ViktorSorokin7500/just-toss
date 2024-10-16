import { Container, Filters, ProductCard, Title } from "@/components/shared";
import data from "../../../lib/leafly_strain_data.json";

export default function Home() {
  return (
    <Container className="my-8">
      <Title size="xl" text="Our products" className="font-extrabold" />
      <div className="flex gap-[60px] pt-8">
        <div className="w-[250px]">
          <Filters />
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-3 gap-3">
            {data.map((bud) => (
              <ProductCard
                key={bud.id}
                id={bud.id}
                name={bud.name}
                price={bud.price}
                imageUrl={bud.img_url}
                type={bud.type}
                terpene={bud.most_common_terpene}
                thc={bud.thc_level}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
