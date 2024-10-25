import {
  Container,
  Filters,
  Pagination,
  ProductCard,
  Title,
} from "@/components/shared";
import findProducts, { GetSearchParams } from "@/lib/find-products";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const { products, totalPages } = await findProducts(searchParams);
  const currentPage = parseInt(searchParams.page || "1", 10);
  return (
    <Container className="my-8">
      <Title size="xl" text="Our products" className="font-extrabold" />
      <div className="flex gap-[60px] pt-8">
        <div className="w-[250px]">
          <Suspense>
            <Filters />
          </Suspense>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-3 gap-3">
            {products.map((bud) => (
              <ProductCard
                key={bud.id}
                id={bud.id}
                name={bud.name}
                price={bud.price}
                imageUrl={bud.imageUrl}
                type={bud.type.name}
                terpene={bud.terpene.name}
                thc={bud.thcLevel}
              />
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </Container>
  );
}
